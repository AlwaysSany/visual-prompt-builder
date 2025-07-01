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
  // Load templates from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('promptBuilderTemplates');
    if (saved) {
      setSavedTemplates(JSON.parse(saved));
    }
  }, []);
  // Template handlers
  const saveTemplate = () => {
    if (!templateName) {
      alert('Please enter a template name');
      return;
    }
    const template = {
      id: Date.now(),
      name: templateName,
      data: formData,
      createdAt: new Date().toISOString()
    };
    const updated = [...savedTemplates, template];
    setSavedTemplates(updated);
    localStorage.setItem('promptBuilderTemplates', JSON.stringify(updated));
    setTemplateName('');
    alert('Template saved successfully!');
  };
  const loadTemplate = (template: any) => {
    setFormData(template.data);
  };
  const deleteTemplate = (id: number) => {
    const updated = savedTemplates.filter(t => t.id !== id);
    setSavedTemplates(updated);
    localStorage.setItem('promptBuilderTemplates', JSON.stringify(updated));
  };
  // Prompt preview
  const generateNaturalLanguagePrompt = () => {
    const parts = [];
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
              />
            </Grid>
          </Grid>
        </Container>
      </AppContainer>
    </>
  );
}

export default VisualPromptBuilder;