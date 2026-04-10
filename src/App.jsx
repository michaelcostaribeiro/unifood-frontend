import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import RestaurantDetail from './components/RestaurantDetail'



function App() {
  

  return (
    <>
    
    <main className='bg-gray-100'>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/restaurant/:id' element={<RestaurantDetail/>} />
      </Routes>
    </main>
    </>
  )
}

export default App
