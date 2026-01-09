import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'

const App = () => {
  return (
    <div>
      <Routes>
      <Route path='/'element={<Home/>}/>
       <Route path='/register'element={<Register/>}/>
       <Route path='/login'element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
