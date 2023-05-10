import React, { useEffect } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { useAuth } from './hooks/useAuth';
import Error from './pages/Error/Error';
import Create from './pages/Create/Create';


const Router = () => {
  const navigate  = useNavigate()
  const {isAuth} = useAuth()

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [])

  return (
    <div>
      <Routes>
        <Route path='login' element={<Login/>} />
        
        {isAuth? (
          <>
          <Route path='*' element={<Error/>} />
          <Route path='/' element={<Home/>} />
          <Route path='create' element={<Create/>} />
          </>
        ): (navigate('/login'))}
      </Routes>
    </div>
  )
}

export default Router