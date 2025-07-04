import React from 'react';
import { Box, Tabs, Tab, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';

interface PreviewPanelProps {
  activePanel: 'natural' | 'structured';
  setActivePanel: React.Dispatch<React.SetStateAction<'natural' | 'structured'>>;
  generateNaturalLanguagePrompt: () => string;
  generateStructuredData: () => object;
  copyToClipboard: () => void;
  downloadPrompt: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  activePanel,
  setActivePanel,
  generateNaturalLanguagePrompt,
  generateStructuredData,
  copyToClipboard,
  downloadPrompt,
}) => {
  const handleTabChange = (_: React.SyntheticEvent, newValue: 'natural' | 'structured') => {
    setActivePanel(newValue);
  };
  const previewContent = activePanel === 'natural'
    ? generateNaturalLanguagePrompt()
    : JSON.stringify(generateStructuredData(), null, 2);

  return (
    <Box sx={{
      background: '#232c43',
      borderRadius: 8,
      boxShadow: '0 8px 32px 0 rgba(36,48,74,0.18)',
      p: 3,
      mt: 2,
      minHeight: '70vh',
      height: '75vh',
      width: '100%',
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      border: '1.5px solid #283a5b',
      transition: 'box-shadow 0.2s',
      overflow: 'visible',
      marginRight: 0,
      position: 'relative',
    }}>
      <Tabs
        value={activePanel}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ mb: 1 }}
      >
        <Tab label="Natural Language" value="natural" />
        <Tab label="Structured (JSON)" value="structured" />
      </Tabs>
      <Paper variant="outlined" sx={{ p: 2, minHeight: 260, maxHeight: 350, overflow: 'auto', mb: 1, borderRadius: 2, background: '#232c43' }}>
        <Typography
          component="pre"
          variant="body2"
          sx={{ whiteSpace: 'pre-wrap', fontFamily: 'JetBrains Mono, monospace', fontSize: 15, color: '#e3f2fd', wordBreak: 'break-word' }}
        >
          {previewContent}
        </Typography>
      </Paper>
      <Box sx={{ 
        position: 'absolute', 
        bottom: 16, 
        right: 16,
        display: 'flex',
        gap: 1,
        background: 'rgba(35, 44, 67, 0.8)',
        borderRadius: '20px',
        p: 0.5,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <Tooltip title="Copy to clipboard" arrow>
          <IconButton 
            onClick={copyToClipboard}
            size="small"
            sx={{
              color: '#a0a0a0',
              '&:hover': {
                color: '#2e90fa',
                background: 'rgba(46, 144, 250, 0.1)'
              }
            }}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download prompt" arrow>
          <IconButton 
            onClick={downloadPrompt}
            size="small"
            sx={{
              color: '#a0a0a0',
              '&:hover': {
                color: '#7f5cff',
                background: 'rgba(127, 92, 255, 0.1)'
              }
            }}
          >
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default PreviewPanel;
