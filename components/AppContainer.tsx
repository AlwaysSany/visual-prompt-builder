import React from 'react';

const AppContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ minHeight: '100vh', background: '#f4f6fa' }}>
    {children}
  </div>
);

export default AppContainer;
