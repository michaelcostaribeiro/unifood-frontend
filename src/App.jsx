import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import RestaurantDetail from './components/RestaurantDetail'
import Menu from './components/Menu'
import Perfil from './pages/Perfil'
import Login from './pages/Login'
import Register from './pages/Register'
import { LoginContext } from './contexts/LoginContext'
import { url } from '../shared'



function App() {
  useEffect(() => {
    const refreshTokenEndpoint = 'api/token/refresh/'
    const second = 1000
    const minute = 60 * second
    async function refreshToken() {
      if (!localStorage.getItem('refresh')) return;
      try {
        const response = await fetch(url + refreshTokenEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            refresh: localStorage.getItem('refresh')
          })
        })
        if (response.ok){
          const result = await response.json();
          localStorage.setItem('token', result.access)
          localStorage.setItem('refresh', result.refresh)
          setLoggedIn(true);
        }else{
          console.warn("Refresh token expired or invalid");
          localStorage.clear();
          setLoggedIn(false);
        }
      } catch (e) {
        console.log(e.message)
      }
    }
    refreshToken();
    const intervalId = setInterval(refreshToken, minute*5)
    return () => clearInterval(intervalId);
  }, []);

  const [loggedIn, setLoggedIn] = useState(localStorage.token ? true : false);

  return (
    <>
      <main className='bg-gray-100 max-w-100 mb-20'>
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
          <Menu />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/restaurant/:id' element={<RestaurantDetail />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

          </Routes>
        </LoginContext.Provider>
      </main>
    </>
  )
}

export default App
