import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import Layout from './pages/Layout.jsx';
import Preview from './pages/Preview';
import Login from './pages/Login.jsx';
import { useDispatch } from 'react-redux';
import api from './app/configs/api.js';
import { login, setLoading } from './app/features/authSlice';
import {Toaster} from 'react-hot-toast'

const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const { data } = await api.get('/api/users/data', {
          headers: { Authorization: token },
        });
        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
    <Toaster/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>
        <Route path='/view/:resumeId' element={<Preview />} />
      </Routes>
    </>
  );
};

export default App;
