import React from 'react';
import { List, ListItem, ListItemText, IconButton, TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
  onEdit: (template: Template) => void;
  isEditing: boolean;
}

const TemplateList: React.FC<TemplateListProps> = ({
  savedTemplates,
  loadTemplate,
  deleteTemplate,
  templateName,
  setTemplateName,
  saveTemplate,
  onEdit,
  isEditing,
}) => {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };
  const handleConfirmDelete = () => {
    if (deleteId !== null) deleteTemplate(deleteId);
    setConfirmOpen(false);
    setDeleteId(null);
  };
  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>Prompt Templates</Typography>
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
                <IconButton edge="end" aria-label="edit" onClick={() => onEdit(tpl)} size="small" sx={{ ml: 0.5 }}>
                  <span role="img" aria-label="edit">✏️</span>
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(tpl.id)} size="small">
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
          label={isEditing ? "Edit Template Name" : "New Template Name"}
          value={templateName}
          onChange={e => setTemplateName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={saveTemplate} sx={{ minWidth: 90 }}>
          {isEditing ? "Update" : "Save"}
        </Button>
      </Box>
    {/* Delete confirmation dialog */}
    <Dialog open={confirmOpen} onClose={handleCancelDelete}>
      <DialogTitle>Delete Template?</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this template? This action cannot be undone.
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDelete}>Cancel</Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
      </DialogActions>
    </Dialog>
  </Box>
  );
};

export default TemplateList;
