import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import HeaderV3 from './components/Header/HeaderV3'
import Home from './components/Homepage/Home'
import Footer from './components/Footer/Footer'
import Login from './components/Auth/Login'
import CoursesList from './components/CoursesList/CoursesList'
import Course from './components/Course/Course'
import './index.css'
import Register from './components/Auth/Register'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<><HeaderV3/><Home/><Footer/></>} />
          <Route path='/login' element={<><Login/></>} />
          <Route path='/register' element={<><Register/></>} />
          <Route path='/courses' element={<><HeaderV3/><CoursesList/><Footer/></>} />
          <Route path='/courses/:id' element={<><HeaderV3/><Course/><Footer/></>} />
          {/* <Route path='*' element={<Navigate to="/" />} /> */}

        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)