import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';
//import { ChatProvider } from './context/ChatProvider.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
            <div className='dark:bg-slate-700 dark:text-white h-screen transition-all pt-[1px]'>
              <App />
            </div>
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
);
