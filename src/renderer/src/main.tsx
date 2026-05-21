import './assets/css/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Login'
import { HashRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<h1>Home</h1>} />
      </Routes>
    </HashRouter>
  </StrictMode>
)
