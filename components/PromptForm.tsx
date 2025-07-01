import React, { useState } from 'react';
import {
  Box, Typography, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

const projectDomains = ['Frontend', 'Backend', 'Full-Stack'];
const languages = {
  Frontend: ['JavaScript', 'TypeScript', 'Dart', 'Swift', 'Kotlin', 'Other'],
  Backend: ['Python', 'Java', 'JavaScript', 'TypeScript', 'Rust', 'Go', 'C#', 'PHP', 'Other'],
  'Full-Stack': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Other']
};
const frameworks = {
  JavaScript: ['React', 'Vue', 'Angular', 'Express', 'Next.js', 'Nuxt.js', 'Other'],
  TypeScript: ['React', 'Vue', 'Angular', 'Express', 'Next.js', 'NestJS', 'Other'],
  Python: ['FastAPI', 'Flask', 'Django', 'Streamlit', 'Other'],
  Java: ['Spring Boot', 'Spring MVC', 'Quarkus', 'Other'],
  Rust: ['Actix', 'Rocket', 'Warp', 'Other'],
  Go: ['Gin', 'Echo', 'Fiber', 'Other'],
  'C#': ['.NET Core', 'ASP.NET', 'Blazor', 'Other'],
  PHP: ['Laravel', 'Symfony', 'CodeIgniter', 'Other'],
  Dart: ['Flutter', 'Other'],
  Swift: ['SwiftUI', 'UIKit', 'Other'],
  Kotlin: ['Android SDK', 'Ktor', 'Other'],
  Other: ['Other']
};
const packageManagers = {
  JavaScript: ['npm', 'yarn', 'pnpm', 'Other'],
  TypeScript: ['npm', 'yarn', 'pnpm', 'Other'],
  Python: ['pip', 'uv', 'poetry', 'Other'],
  Java: ['Maven', 'Gradle', 'Other'],
  Rust: ['Cargo', 'Other'],
  Go: ['Go Modules', 'Other'],
  'C#': ['NuGet', 'Other'],
  PHP: ['Composer', 'Other'],
  Dart: ['pub', 'Other'],
  Swift: ['Swift Package Manager', 'Other'],
  Kotlin: ['Gradle', 'Maven', 'Other'],
  Other: ['Other']
};
const projectTypes = ['Web App', 'Mobile App', 'Desktop App', 'API Service', 'Library/Package', 'Other'];
const projectScales = ['Small', 'Medium', 'Large', 'Enterprise', 'Other'];
const configFileOptions = ['Dockerfile', 'docker-compose.yml', 'README.md', '.gitignore', 'CI/CD Config', '.env', 'Makefile', 'Helm chart', 'Terraform', 'Other'];

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

interface PromptFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const PromptForm: React.FC<PromptFormProps> = ({ formData, setFormData }) => {
  // Dialog state for 'Other' inputs
  const [otherDialog, setOtherDialog] = useState<{open: boolean, field: keyof FormData, parent?: string}>({open: false, field: '' as keyof FormData});
  const [otherValue, setOtherValue] = useState('');

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      if (field === 'projectDomain') {
        newData.language = '';
        newData.framework = '';
        newData.packageManager = '';
      } else if (field === 'language') {
        newData.framework = '';
        newData.packageManager = '';
      }
      return newData;
    });
  };
  const handleCheckboxChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field])
        ? (prev[field] as string[]).includes(value)
          ? (prev[field] as string[]).filter((item: string) => item !== value)
          : [...(prev[field] as string[]), value]
        : prev[field]
    }));
  };
  // Handle "Other" option selection
  const handleOtherSelect = (field: keyof FormData, parent?: string) => {
    setOtherDialog({ open: true, field, parent });
    setOtherValue('');
  };
  const handleOtherDialogClose = (save = false) => {
    if (save && otherValue.trim()) {
      if (otherDialog.field === 'configFiles') {
        handleCheckboxChange('configFiles', otherValue.trim());
      } else {
        handleInputChange(otherDialog.field, otherValue.trim());
      }
    }
    setOtherDialog({ open: false, field: '' as keyof FormData });
    setOtherValue('');
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>Project Scope</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Project Domain</InputLabel>
            <Select
              value={formData.projectDomain}
              label="Project Domain"
              onChange={e => handleInputChange('projectDomain', e.target.value)}
            >
              <MenuItem value=""><em>Select domain...</em></MenuItem>
              {projectDomains.map(domain => (
                <MenuItem key={domain} value={domain}>{domain}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth disabled={!formData.projectDomain}>
            <InputLabel>Language</InputLabel>
            <Select
              value={formData.language}
              label="Language"
              onChange={e => {
                if (e.target.value === 'Other') handleOtherSelect('language');
                else handleInputChange('language', e.target.value);
              }}
            >
              <MenuItem value=""><em>Select language...</em></MenuItem>
              {formData.projectDomain && languages[formData.projectDomain]?.map(lang => (
                <MenuItem key={lang} value={lang}>{lang}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Project Type</InputLabel>
            <Select
              value={formData.projectType}
              label="Project Type"
              onChange={e => {
                if (e.target.value === 'Other') handleOtherSelect('projectType');
                else handleInputChange('projectType', e.target.value);
              }}
            >
              <MenuItem value=""><em>Select type...</em></MenuItem>
              {projectTypes.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Project Scale</InputLabel>
            <Select
              value={formData.projectScale}
              label="Project Scale"
              onChange={e => {
                if (e.target.value === 'Other') handleOtherSelect('projectScale');
                else handleInputChange('projectScale', e.target.value);
              }}
            >
              <MenuItem value=""><em>Select scale...</em></MenuItem>
              {projectScales.map(scale => (
                <MenuItem key={scale} value={scale}>{scale}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" mb={2}>Framework & Tools</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled={!formData.language}>
              <InputLabel>Framework</InputLabel>
              <Select
                value={formData.framework}
                label="Framework"
                onChange={e => {
                  if (e.target.value === 'Other') handleOtherSelect('framework', formData.language);
                  else handleInputChange('framework', e.target.value);
                }}
              >
                <MenuItem value=""><em>Select framework...</em></MenuItem>
                {formData.language && frameworks[formData.language]?.map(fw => (
                  <MenuItem key={fw} value={fw}>{fw}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth disabled={!formData.language}>
              <InputLabel>Package Manager</InputLabel>
              <Select
                value={formData.packageManager}
                label="Package Manager"
                onChange={e => {
                  if (e.target.value === 'Other') handleOtherSelect('packageManager', formData.language);
                  else handleInputChange('packageManager', e.target.value);
                }}
              >
                <MenuItem value=""><em>Select package manager...</em></MenuItem>
                {formData.language && packageManagers[formData.language]?.map(pm => (
                  <MenuItem key={pm} value={pm}>{pm}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" mb={2}>DevOps Configuration</Typography>
        <FormControl fullWidth>
          <InputLabel>Configuration Files</InputLabel>
          <Select
            multiple
            value={formData.configFiles}
            onChange={e => {
              const value = e.target.value;
              if (Array.isArray(value) && value.includes('Other')) {
                handleOtherSelect('configFiles');
              } else {
                setFormData(prev => ({ ...prev, configFiles: value }));
              }
            }}
            input={<OutlinedInput label="Configuration Files" />}
            renderValue={selected => (selected as string[]).join(', ')}
          >
            {configFileOptions.map(option => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={formData.configFiles.includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" mb={2}>Product Details</Typography>
        <TextField
          label="Feature Description"
          fullWidth
          multiline
          minRows={2}
          value={formData.featureDescription}
          onChange={e => handleInputChange('featureDescription', e.target.value)}
          margin="normal"
        />
        <TextField
          label="Target Users & Problem"
          fullWidth
          multiline
          minRows={2}
          value={formData.targetUsers}
          onChange={e => handleInputChange('targetUsers', e.target.value)}
          margin="normal"
        />
        <TextField
          label="Key Features & Success Metrics"
          fullWidth
          multiline
          minRows={2}
          value={formData.keyFeatures}
          onChange={e => handleInputChange('keyFeatures', e.target.value)}
          margin="normal"
        />
      </Box>

      {/* Other Input Dialog */}
      <Dialog open={otherDialog.open} onClose={() => handleOtherDialogClose(false)}>
        <DialogTitle>Enter custom value</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Custom value"
            fullWidth
            value={otherValue}
            onChange={e => setOtherValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOtherDialogClose(false)}>Cancel</Button>
          <Button onClick={() => handleOtherDialogClose(true)} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PromptForm;
