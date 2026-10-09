import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


const savedLanguage = localStorage.getItem("code-language");

if (savedLanguage === "ar") {
  document.documentElement.lang = "ar";
  document.documentElement.dir = "rtl";
} else {
  document.documentElement.lang = "en";
  document.documentElement.dir = "ltr";
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
