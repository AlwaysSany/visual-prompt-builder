import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';

const HeaderBar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box 
      sx={{ 
        py: 4,
        px: 2,
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(25, 25, 35, 0.9) 0%, rgba(25, 25, 35, 0.5) 100%)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: isHovered ? '80%' : '60%',
          height: '3px',
          background: 'linear-gradient(90deg, #2e90fa 0%, #7f5cff 100%)',
          borderRadius: '3px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          letterSpacing: '-1px',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          background: 'linear-gradient(90deg, #2e90fa 0%, #7f5cff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block',
          m: 0,
          lineHeight: 1.1,
          fontSize: { xs: '2rem', sm: '2.5rem' },
          position: 'relative',
          padding: '0 20px',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#2e90fa',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#7f5cff',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
          textShadow: isHovered 
            ? '0 0 15px rgba(46, 144, 250, 0.4)' 
            : '0 0 5px rgba(46, 144, 250, 0.2)',
        }}
      >
        Visual Prompt Builder
      </Typography>
      <Typography 
        variant="subtitle2" 
        sx={{
          mt: 1,
          color: '#a0a0a0',
          fontSize: '0.8rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          opacity: isHovered ? 1 : 0.7,
          transition: 'all 0.3s ease',
        }}
      >
        Plan • Build • Prompt
      </Typography>
    </Box>
  );
};

export default HeaderBar;
