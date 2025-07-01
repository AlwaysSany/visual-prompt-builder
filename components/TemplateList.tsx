import React from 'react';
import { List, ListItem, ListItemText, IconButton, TextField, Button, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

type Template = {
  id: number;
  name: string;
  data: any;
  createdAt: string;
};

interface TemplateListProps {
  savedTemplates: Template[];
  loadTemplate: (template: Template) => void;
  deleteTemplate: (id: number) => void;
  templateName: string;
  setTemplateName: React.Dispatch<React.SetStateAction<string>>;
  saveTemplate: () => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
  savedTemplates,
  loadTemplate,
  deleteTemplate,
  templateName,
  setTemplateName,
  saveTemplate,
}) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>Templates</Typography>
      <List dense>
        {savedTemplates.length === 0 && (
          <ListItem>
            <ListItemText primary="No templates saved." />
          </ListItem>
        )}
        {savedTemplates.map((tpl) => (
          <ListItem
            key={tpl.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="load" onClick={() => loadTemplate(tpl)} size="small">
                  <FolderOpenIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTemplate(tpl.id)} size="small">
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={tpl.name}
              secondary={new Date(tpl.createdAt).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
      <Box mt={2} display="flex" gap={1}>
        <TextField
          size="small"
          label="New Template Name"
          value={templateName}
          onChange={e => setTemplateName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={saveTemplate} sx={{ minWidth: 90 }}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default TemplateList;
