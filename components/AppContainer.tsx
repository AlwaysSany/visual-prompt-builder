import React from 'react';

const AppContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      minHeight: '100vh',
      minWidth: '100vw',
      background: 'linear-gradient(135deg, #7f5cff 0%, #f1c40f 100%)',
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      padding: 0,
      margin: 0,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    {children}
    <footer
      style={{
        width: '100%',
        textAlign: 'center',
        padding: '24px 0 12px 0',
        color: '#fff',
        fontWeight: 500,
        fontSize: 16,
        letterSpacing: 1,
        background: 'transparent',
        opacity: 0.95,
      }}
    >
      © {new Date().getFullYear()} Always Sany. All rights reserved.
    </footer>
  </div>
);

export default AppContainer;
