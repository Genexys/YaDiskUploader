import { createRoot } from 'react-dom/client';
import App from './App';
import AuthProvider from '@/context/authContext';

import './global.css';

const domNode = document.getElementById('root') as HTMLDivElement;

const root = createRoot(domNode);

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
