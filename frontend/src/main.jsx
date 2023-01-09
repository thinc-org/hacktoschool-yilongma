import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import Header from './Header'
// import HeaderV2 from './HeaderV2'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route excat path='/' element={<><Header/><App /></>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
