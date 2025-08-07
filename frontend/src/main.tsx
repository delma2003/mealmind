// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';


// ✅ Inject Tailwind-style CSS at runtime via CDN
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css";
document.head.appendChild(styleLink);

const unocssScript = document.createElement("script");
unocssScript.src = "https://cdn.jsdelivr.net/npm/@unocss/runtime";
document.head.appendChild(unocssScript);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
