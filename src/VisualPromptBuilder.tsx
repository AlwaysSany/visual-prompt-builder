import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Grid } from '@mui/material';
import AppContainer from '../components/AppContainer';
import HeaderBar from '../components/HeaderBar';
import TemplateList from '../components/TemplateList';
import PromptForm from '../components/PromptForm';
import PreviewPanel from '../components/PreviewPanel';

const VisualPromptBuilder = () => {
  // App-level state
  type FormData = {
    projectDomain: string;
    language: string;
    projectType: string;
    projectScale: string;
    framework: string;
    packageManager: string;
    configFiles: string[];
    featureDescription: string;
    targetUsers: string;
    keyFeatures: string;
  };

  const [formData, setFormData] = useState<FormData>({
    projectDomain: '',
    language: '',
    projectType: '',
    projectScale: '',
    framework: '',
    packageManager: '',
    configFiles: [],
    featureDescription: '',
    targetUsers: '',
    keyFeatures: ''
  });
  const [savedTemplates, setSavedTemplates] = useState<any[]>([]);
  const [templateName, setTemplateName] = useState('');
  const [activePanel, setActivePanel] = useState<'natural' | 'structured'>('natural');
  const [editingId, setEditingId] = useState<number | null>(null);
  // --- Template Persistence Helpers ---
  const TEMPLATES_KEY = 'promptBuilderTemplates';

  function loadTemplatesFromStorage() {
    try {
      const saved = localStorage.getItem(TEMPLATES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load templates:', e);
      return [];
    }
  }

  function saveTemplatesToStorage(templates: any[]) {
    try {
      localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
    } catch (e) {
      console.error('Failed to save templates:', e);
    }
  }

  // --- Load templates on mount ---
  useEffect(() => {
    setSavedTemplates(loadTemplatesFromStorage());
  }, []);

  // --- Template handlers ---
  const saveTemplate = () => {
    if (!templateName) {
      alert('Please enter a template name');
      return;
    }
    let updated;
    if (editingId !== null) {
      updated = savedTemplates.map(t =>
        t.id === editingId ? { ...t, name: templateName, data: formData } : t
      );
    } else {
      const template = {
        id: Date.now(),
        name: templateName,
        data: formData,
        createdAt: new Date().toISOString()
      };
      updated = [...savedTemplates, template];
    }
    setSavedTemplates(updated);
    saveTemplatesToStorage(updated);
    setTemplateName('');
    setEditingId(null);
    alert('Template saved successfully!');
  };

  const loadTemplate = (template: any) => {
    setFormData(template.data);
    setTemplateName('');
    setEditingId(null); // Not editing, just loading for use
  };


  // Called when Edit is pressed
  const handleEditTemplate = (template: any) => {
    setFormData(template.data);
    setTemplateName(template.name);
    setEditingId(template.id);
  };

  const deleteTemplate = (id: number) => {
    const updated = savedTemplates.filter(t => t.id !== id);
    setSavedTemplates(updated);
    saveTemplatesToStorage(updated);
  };

  // Prompt preview
  // Dynamic prompt sentence based on selections
  const generateDynamicPromptSentence = () => {
    const {
      projectDomain,
      language,
      projectType,
      projectScale,
      framework,
      packageManager,
      configFiles
    } = formData;
    let sentence = "";
    if (!projectDomain && !projectType && !language) {
      return "Fill out the form to generate a prompt.";
    }
    if (projectDomain) {
      sentence += `You are an expert ${projectDomain.toLowerCase()} developer`;
    }
    if (language) {
      sentence += ` specializing in ${language}`;
    }
    if (projectType) {
      sentence += `. Act as a ${projectType.toLowerCase()} build master`;
    }
    if (framework) {
      sentence += ` using the ${framework} framework`;
    }
    if (packageManager) {
      sentence += ` and managing packages with ${packageManager}`;
    }
    if (projectScale) {
      sentence += `. The project scale is ${projectScale.toLowerCase()}`;
    }
    if (configFiles && configFiles.length > 0) {
      sentence += `. Prepare configuration files: ${configFiles.join(', ')}`;
    }
    return sentence + ".";
  };

  const generateNaturalLanguagePrompt = () => {
    const parts = [];
    // Insert the dynamic sentence at the top
    parts.push(generateDynamicPromptSentence() + '\n');
    parts.push("# Project Specification\n");
    if (formData.featureDescription) {
      parts.push(`## Product Overview\n${formData.featureDescription}\n`);
    }
    if (formData.targetUsers) {
      parts.push(`## Target Users & Problem\n${formData.targetUsers}\n`);
    }
    if (formData.keyFeatures) {
      parts.push(`## Key Features & Success Metrics\n${formData.keyFeatures}\n`);
    }
    parts.push("## Technical Requirements\n");
    if (formData.projectDomain) parts.push(`- **Domain**: ${formData.projectDomain}`);
    if (formData.projectType) parts.push(`- **Type**: ${formData.projectType}`);
    if (formData.projectScale) parts.push(`- **Scale**: ${formData.projectScale}`);
    if (formData.language) parts.push(`- **Language**: ${formData.language}`);
    if (formData.framework) parts.push(`- **Framework**: ${formData.framework}`);
    if (formData.packageManager) parts.push(`- **Package Manager**: ${formData.packageManager}`);
    if (formData.configFiles.length > 0) {
      parts.push(`- **Configuration Files**: ${formData.configFiles.join(', ')}`);
    }
    // Add architecture recommendations based on scale
    if (formData.projectScale) {
      parts.push("\n## Architecture Recommendations\n");
      switch (formData.projectScale) {
        case 'Small':
          parts.push("- Monolithic architecture recommended\n- Single database\n- Simple deployment strategy");
          break;
        case 'Medium':
          parts.push("- Modular monolith or simple microservices\n- Consider database separation by domain\n- Container-based deployment");
          break;
        case 'Large':
          parts.push("- Microservices architecture\n- Event-driven communication\n- Multiple specialized databases\n- Orchestrated deployment");
          break;
        case 'Enterprise':
          parts.push("- Distributed microservices with service mesh\n- Event sourcing and CQRS patterns\n- Multi-region deployment\n- Comprehensive monitoring and observability");
          break;
      }
    }
    return parts.join('\n');
  };
  const generateStructuredData = () => {
    return {
      promptSummary: generateDynamicPromptSentence(),
      project: {
        domain: formData.projectDomain,
        type: formData.projectType,
        scale: formData.projectScale,
        description: formData.featureDescription
      },
      technical: {
        language: formData.language,
        framework: formData.framework,
        packageManager: formData.packageManager,
        configFiles: formData.configFiles
      },
      requirements: {
        targetUsers: formData.targetUsers,
        keyFeatures: formData.keyFeatures
      }
    };
  };

  const copyToClipboard = () => {
    const content = activePanel === 'natural'
      ? generateNaturalLanguagePrompt()
      : JSON.stringify(generateStructuredData(), null, 2);
    navigator.clipboard.writeText(content);
    alert('Copied to clipboard!');
  };
  const downloadPrompt = () => {
    const content = activePanel === 'natural'
      ? generateNaturalLanguagePrompt()
      : JSON.stringify(generateStructuredData(), null, 2);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt.${activePanel === 'natural' ? 'md' : 'json'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <CssBaseline />
      <AppContainer>
        <HeaderBar />
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <TemplateList
                savedTemplates={savedTemplates}
                loadTemplate={loadTemplate}
                deleteTemplate={deleteTemplate}
                templateName={templateName}
                setTemplateName={setTemplateName}
                saveTemplate={saveTemplate}
                onEdit={handleEditTemplate}
                isEditing={editingId !== null}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PromptForm
                formData={formData}
                setFormData={setFormData}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <PreviewPanel
                activePanel={activePanel}
                setActivePanel={setActivePanel}
                generateNaturalLanguagePrompt={generateNaturalLanguagePrompt}
                generateStructuredData={generateStructuredData}
                copyToClipboard={copyToClipboard}
                downloadPrompt={downloadPrompt}
                generateDynamicPromptSentence={generateDynamicPromptSentence}
              />
            </Grid>
          </Grid>
        </Container>
      </AppContainer>
    </>
  );
}

export default VisualPromptBuilder;