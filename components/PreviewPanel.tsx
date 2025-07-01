import React from 'react';
import { Box, Tabs, Tab, Typography, IconButton, Tooltip, Paper } from '@mui/material';
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
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>Prompt Preview</Typography>
      <Tabs
        value={activePanel}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ mb: 1 }}
      >
        <Tab label="Natural Language" value="natural" />
        <Tab label="Structured (JSON)" value="structured" />
      </Tabs>
      <Paper variant="outlined" sx={{ p: 2, minHeight: 260, maxHeight: 350, overflow: 'auto', mb: 1 }}>
        <Typography
          component="pre"
          variant="body2"
          sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}
        >
          {previewContent}
        </Typography>
      </Paper>
      <Box display="flex" gap={1}>
        <Tooltip title="Copy to clipboard">
          <IconButton onClick={copyToClipboard} color="primary">
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download prompt">
          <IconButton onClick={downloadPrompt} color="primary">
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default PreviewPanel;
