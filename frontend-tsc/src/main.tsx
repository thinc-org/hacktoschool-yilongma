import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
const Header = React.lazy(() => import('./components/Header/Header'));
const Home = React.lazy(() => import('./components/Homepage/Home'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const Login = React.lazy(() => import('./components/Auth/Login'));
const CoursesList = React.lazy(() => import('./components/CoursesList/CoursesList'));
const Course = React.lazy(() => import('./components/Course/Course'));
const Register = React.lazy(() => import('./components/Auth/Register'));
const AnnouncementBox = React.lazy(() => import('./components/Announcement/AnnouncementBox'));
const AnnouncementEditor = React.lazy(() => import('./components/Editor/AnnouncementEditor'));
const MaterialEditor = React.lazy(() => import('./components/Editor/MaterialEditor'));
const VideoBox = React.lazy(() => import('./components/Video/VideoBox'));
const VideoEditor = React.lazy(() => import('./components/Editor/VideoEditor'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));
const ProfileEditor = React.lazy(() => import('./components/Editor/ProfileEditor'))
const CourseEditor = React.lazy(() => import('./components/Editor/CourseEditor'));
const AssignmentBox = React.lazy(() => import('./components/Assignment/AssignmentBox'));
const Notification = React.lazy(() => import('./components/Notification/Notification'));

import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><Header /><Home /><Footer /></>} />
        <Route path='/login' element={<><Login /></>} />
        <Route path='/register' element={<><Register /></>} />
        <Route path='/courses' element={<><Header /><CoursesList /><Footer /></>} />
        <Route path='/courses/:id' element={<><Header /><Course /><Footer /></>} />
        <Route path='/courses/:id/edit' element={<><Header /><CourseEditor /><Footer /></>} />
        <Route path='/courses/:id/announcements/:announcementId' element={<><Header /><AnnouncementBox /><Footer /></>} />
        <Route path='/courses/:id/announcements/:announcementId/edit' element={<><Header /><AnnouncementEditor /><Footer /></>} />
        <Route path='/courses/:id/materials/:materialId/edit' element={<><Header /><MaterialEditor /><Footer /></>} />
        <Route path='/courses/:id/videos/:videoId' element={<><Header /><VideoBox /><Footer /></>} />
        <Route path='/courses/:id/videos/:videoId/edit' element={<><Header /><VideoEditor /><Footer /></>} />
        <Route path='/users/:userId' element={<><Header /><Profile /><Footer /></>} />
        <Route path='/users/:userId/edit' element={<><Header /><ProfileEditor /><Footer /></>} />
        <Route path='/courses/:id/assignments/:assignmentId' element={<><Header /><AssignmentBox /><Footer /></>} />
        <Route path='/notifications' element={<><Header /><Notification /><Footer /></>} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)