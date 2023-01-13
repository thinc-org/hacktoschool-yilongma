import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
const Home = React.lazy(() => import('./components/Homepage/Home'));
import Footer from './components/Footer/Footer'
import Login from './components/Auth/Login'
import CoursesList from './components/CoursesList/CoursesList'
import Course from './components/Course/Course'
import './index.css'
import Register from './components/Auth/Register'
import AnnouncementBox from './components/Announcement/AnnouncementBox'
import AnnouncementEditor from './components/Editor/AnnouncementEditor'
import MaterialEditor from './components/Editor/MaterialEditor'
import VideoBox from './components/Video/VideoBox';
import VideoEditor from './components/Editor/VideoEditor';
import Profile from './components/Profile/Profile';
import ProfileEditor from './components/Editor/ProfileEditor';
import CourseEditor from './components/Editor/CourseEditor';
import AssignmentBox from './components/Assignment/AssignmentBox';
import Notification from './components/Notification/Notification';

import Payment from './components/Payment'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Header/><Home/><Footer/></>} />
          <Route path='/login' element={<><Login/></>} />
          <Route path='/register' element={<><Register/></>} />
          <Route path='/courses' element={<><Header/><CoursesList/><Footer/></>} />
          <Route path='/courses/:id' element={<><Header/><Course/><Footer/></>} />
          <Route path='/courses/:id/edit' element={<><Header/><CourseEditor/><Footer/></>} />
          <Route path='/courses/:id/announcements/:announcementId' element={<><Header/><AnnouncementBox/><Footer/></>} />
          <Route path='/courses/:id/announcements/:announcementId/edit' element={<><Header/><AnnouncementEditor/><Footer/></>} />
          <Route path='/courses/:id/materials/:materialId/edit' element={<><Header/><MaterialEditor/><Footer/></>} />
          <Route path='/courses/:id/videos/:videoId' element={<><Header/><VideoBox/><Footer/></>} />
          <Route path='/courses/:id/videos/:videoId/edit' element={<><Header/><VideoEditor/><Footer/></>} />
          <Route path='/users/:userId' element={<><Header/><Profile/><Footer/></>} />
          <Route path='/users/:userId/edit' element={<><Header/><ProfileEditor/><Footer/></>} />
          <Route path='/courses/:id/assignments/:assignmentId' element={<><Header/><AssignmentBox/><Footer/></>} />
          <Route path='/notifications/:userId' element={<><Header/><Notification/><Footer/></>} />
          <Route path='/payment' element={<><Payment/></>} />
          {/* <Route path='*' element={<Navigate to="/" />} /> */}

        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)