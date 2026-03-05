import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Home,
  Login,
  Signup,
  VerifyEmail
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
          <Route path="/about" element={<h1>About Page</h1>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
