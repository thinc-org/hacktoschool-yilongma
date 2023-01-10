import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import HeaderV3 from './components/Header/HeaderV3'
import Home from './components/Homepage/Home'
import Login from './components/Auth/Login'
import Register from './components/Register/Register'
import CoursesList from './components/CoursesList/CoursesList'
import Course from './components/Course/Course'
import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<><HeaderV3/><Home/></>} />
          <Route path='/login' element={<><Login/></>} />
          <Route path='/register' element={<><Register/></>} />
          <Route path='/courses' element={<><HeaderV3/><CoursesList/></>} />
<<<<<<< HEAD
          <Route path='/courses/:id' element={<><HeaderV3/><Course/></>} />
||||||| 0708cda
=======
          <Route path='*' element={<Navigate to="/" />} />
>>>>>>> 6d01cf3b8cf85867e5d595174dbfa240caba3f93
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)