import React, { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Paper } from '@mui/material';

function App() {
    const [templates, setTemplates] = useState([]); // saved templates
    const [currentTemplate, setCurrentTemplate] = useState({ name: '', content: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleSave = () => {
        if (editingIndex !== null) {
            // Update existing template
            const updated = [...templates];
            updated[editingIndex] = { ...currentTemplate };
            setTemplates(updated);
            setEditingIndex(null);
        } else {
            // Add new template
            setTemplates([...templates, { ...currentTemplate }]);
        }
        setCurrentTemplate({ name: '', content: '' });
        setDialogOpen(false);
    };

    const handleEdit = (index) => {
        setCurrentTemplate({ ...templates[index] });
        setEditingIndex(index);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEditingIndex(null);
        setCurrentTemplate({ name: '', content: '' });
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: '40px auto' }}>
            <Typography variant="h4" gutterBottom>
                Visual Prompt Builder
            </Typography>
            <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                New Template
            </Button>
            <List sx={{ mt: 2 }}>
                {templates.map((tpl, idx) => (
                    <ListItem
                        key={idx}
                        secondaryAction={
                            <Button variant="outlined" onClick={() => handleEdit(idx)}>
                                Edit
                            </Button>
                        }
                        sx={{
                            '&:hover': { backgroundColor: '#f5f5f5', transition: 'background 0.3s' }
                        }}
                    >
                        <ListItemText primary={tpl.name} secondary={tpl.content} />
                    </ListItem>
                ))}
            </List>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{editingIndex !== null ? 'Edit Template' : 'New Template'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Template Name"
                        fullWidth
                        value={currentTemplate.name}
                        onChange={e => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Template Content"
                        fullWidth
                        multiline
                        minRows={3}
                        value={currentTemplate.content}
                        onChange={e => setCurrentTemplate({ ...currentTemplate, content: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>
                        {editingIndex !== null ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default App;