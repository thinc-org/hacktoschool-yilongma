import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import App from './App'
import Header from './Header'
import HeaderV2 from './HeaderV2'
import HeaderV3 from './HeaderV3'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<><HeaderV3/><App/></>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)

