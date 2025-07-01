import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const HeaderBar: React.FC = () => (
  <AppBar position="static" color="default" elevation={1}>
    <Toolbar>
      <Typography variant="h5" color="primary" sx={{ flexGrow: 1, fontWeight: 700 }}>
        Visual Prompt Builder
      </Typography>
      {/* Actions will go here */}
    </Toolbar>
  </AppBar>
);

export default HeaderBar;
