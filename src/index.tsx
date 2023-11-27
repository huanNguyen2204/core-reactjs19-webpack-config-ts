import React from 'react';
import { createRoot } from 'react-dom/client';
import Start from '@/Start';

const root = createRoot(document.getElementById('root') as HTMLElement);

const App = () => {
  return (
    <>
      <h1>Welcome</h1>
      <Start />
    </>
  );
};
root.render(<App />);
