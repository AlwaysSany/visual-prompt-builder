import React from 'react';
import { List, ListItem, ListItemText, IconButton, TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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
  cloneTemplate: (template: Template) => void;
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
  cloneTemplate,
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
    <Box sx={{
      background: '#232c43',
      borderRadius: 8,
      boxShadow: '0 8px 32px 0 rgba(36,48,74,0.18)',
      p: 3,
      mt: 2,
      minHeight: '70vh',
      height: '75vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      border: '1.5px solid #283a5b',
      transition: 'box-shadow 0.2s',
    }}>
      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 20, color: '#2e90fa', letterSpacing: 1, mb: 1 }}>Prompt Templates</Typography>
      <List dense sx={{ width: '100%', maxHeight: '60vh', overflowY: 'auto', pr: 1 }}>
        {savedTemplates.length === 0 && (
          <ListItem>
            <ListItemText primary="No templates saved." />
          </ListItem>
        )}
        {savedTemplates.map((tpl) => (
          <ListItem
            key={tpl.id}
            alignItems="flex-start"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
              py: 1,
              px: 0,
            }}
            secondaryAction={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <IconButton edge="end" aria-label="load" onClick={() => loadTemplate(tpl)} size="small" sx={{ borderRadius: 2, '&:hover': { background: '#e0e7ff' } }}>
                  <FolderOpenIcon />
                </IconButton>
                <IconButton edge="end" aria-label="edit" onClick={() => onEdit(tpl)} size="small" sx={{ ml: 0.5, borderRadius: 2, '&:hover': { background: '#f1c40f22' } }}>
                  <span role="img" aria-label="edit">✏️</span>
                </IconButton>
                <IconButton edge="end" aria-label="clone" onClick={() => cloneTemplate(tpl)} size="small" sx={{ ml: 0.5, borderRadius: 2, '&:hover': { background: '#e0e7ff' } }}>
                  <ContentCopyIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(tpl.id)} size="small" sx={{ borderRadius: 2, '&:hover': { background: '#ffeaea' } }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 16, color: '#e3f2fd' }}>{tpl.name}</Typography>
              <Typography variant="caption" sx={{ color: '#b0bec5' }}>{new Date(tpl.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              })}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box mt={2} display="flex" gap={1} alignItems="center">
        <TextField
          size="small"
          label={isEditing ? "Edit Template Name" : "New Template Name"}
          value={templateName}
          onChange={e => setTemplateName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={saveTemplate} sx={{ minWidth: 90, borderRadius: 2, fontWeight: 700, background: 'linear-gradient(90deg, #7f5cff 60%)', color: '#fff', boxShadow: '0 2px 8px 0 #7f5cff22', '&:hover': { background: '#7f5cff' } }}>
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
