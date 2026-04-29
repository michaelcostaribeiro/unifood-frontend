import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import RestaurantDetail from './components/RestaurantDetail'
import Menu from './components/Menu'
import Perfil from './pages/Perfil'
import Login from './pages/Login'
import Register from './pages/Register'



function App() {
  

  return (
    <>
    
    <main className='bg-gray-100 max-w-100 mb-20'>
      <Menu/>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/restaurant/:id' element={<RestaurantDetail/>} />
          <Route path='/perfil' element={<Perfil/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          
      </Routes>
    </main>
    </>
  )
}

export default App
