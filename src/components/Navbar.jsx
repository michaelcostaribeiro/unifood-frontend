import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationDot, faBell } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png'
import icon from '../assets/favicon.png'
import { useContext, useEffect, useState } from "react";
import { url } from "../../shared";
import { LoginContext } from "../contexts/LoginContext";

const Navbar = () => {
    const [userInfo, setUserInfo] = useState()
    const { loggedIn, setLoggedIn } = useContext(LoginContext);
    useEffect(()=>{
        const token = localStorage['token']
        if (!token || token === "undefined") {
            setUserInfo(null)
        }else{
            async function getUserInfo () {
                const userEndpoint = 'api/user/' 
                const response = await fetch(url+userEndpoint,{
                    method:'GET',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                setUserInfo(data)
            }
            getUserInfo()
        }

    },[localStorage.getItem('token')])
  return (
    <header className="p-3 pt-5 ">
        <nav className="flex flex-col gap-5">
            <div>
                  <div className="flex justify-between">
                      <div className="text-xl">
                          <p className="font-medium">{userInfo ? `${userInfo['first_name']}👋` :'Ainda não possui uma conta?'}</p>
                              <p className=" flex gap-2 items-center text-base"><img src={icon} alt="" className="w-7 bg-white rounded-full" />Cantina Unifood</p>
                      </div>

                      <div className="flex items-center">
                          <Link to='/' className=" rounded-full h-9 w-9 flex items-center justify-center" ><FontAwesomeIcon icon={faBell}  /></Link>
                      </div>
                  </div>
            </div>
            <div>
                  <div className="border-1 border-black-transparent-25 p-2 text-black-transparent rounded-2xl flex items-center  focus-within:ring-2 ring-black-transparent-25">

                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input type="text" name="search" id="search" className="p-1 flex-1 focus:outline-0" placeholder="Buscar restaurante ou prato..."  />
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Navbar