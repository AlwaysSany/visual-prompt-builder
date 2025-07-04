import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VisualPromptBuilder from './VisualPromptBuilder';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    fontWeightRegular: 500,
    fontWeightBold: 700,
    h3: {
      fontWeight: 800,
      letterSpacing: '-1.5px',
      color: '#fff',
    },
    h6: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
      color: '#fff',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#4fc3f7',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1976d2',
      contrastText: '#fff',
    },
    background: {
      default: '#1a2236',
      paper: '#232c43',
    },
    text: {
      primary: '#e3f2fd',
      secondary: '#90caf9',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: 'rgba(36, 48, 74, 0.85)',
          borderRadius: 10,
          border: '1.5px solid #283a5b',
          color: '#e3f2fd',
        },
        notchedOutline: {
          borderColor: '#283a5b',
        },
        input: {
          color: '#e3f2fd',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          background: 'rgba(36, 48, 74, 0.85)',
          borderRadius: 10,
          color: '#e3f2fd',
        },
        icon: {
          color: '#4fc3f7',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: '#232c43',
          color: '#e3f2fd',
          borderRadius: 10,
          boxShadow: '0 4px 24px 0 rgba(36,48,74,0.25)',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#90caf9',
          fontWeight: 600,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
          textTransform: 'none',
          background: '#1976d2',
          color: '#fff',
          transition: 'background 0.2s, box-shadow 0.2s',
          boxShadow: '0 2px 8px 0 #1976d211',
          '&:hover': {
            background: '#1565c0',
            boxShadow: '0 4px 16px 0 #1976d222',
          },
        },
      },
    },
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <VisualPromptBuilder />
  </ThemeProvider>
);

export default App;
