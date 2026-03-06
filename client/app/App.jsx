import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Home,
  Login,
  Signup,
  VerifyEmail,
  About
} from '@/pages/';
import MainLayout from '@/layout/MainLayout';

function App() {


  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
