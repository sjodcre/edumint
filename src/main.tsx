import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register';
import AppCreateButton from './components/addApp';

registerSW();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <AppCreateButton/>
    <App />
  </React.StrictMode>,
)
