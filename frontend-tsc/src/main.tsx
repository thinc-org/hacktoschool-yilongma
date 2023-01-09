import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import App from './App'
import Header from './components/Header/Header'
import HeaderV2 from './components/Header/HeaderV2'
import HeaderV3 from './components/Header/HeaderV3'
import Home from './components/Homepage/Home'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<><HeaderV3/><Home/></>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)

