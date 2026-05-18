import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationDot, faBell, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png'
import icon from '../assets/favicon.png'
import { useContext, useEffect, useState } from "react";
import { url } from "../../shared";
import { LoginContext } from "../contexts/LoginContext";

const Navbar = () => {
    const [userInfo, setUserInfo] = useState()
    const { loggedIn, setLoggedIn } = useContext(LoginContext);
    useEffect(() => {
        const token = localStorage['token']
        if (!token || token === "undefined") {
            setUserInfo(null)
        } else {
            async function getUserInfo() {
                const userEndpoint = 'api/user/'
                const response = await fetch(url + userEndpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                setUserInfo(data)
            }
            getUserInfo()
        }

    }, [localStorage.getItem('token')])
    return (
        <header className="p-3 pt-5 text-secondary">
            <nav className="flex flex-col gap-5">
                <div>
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <Link to='/' className=" rounded-full flex items-center justify-center" ><FontAwesomeIcon icon={faArrowLeft} /></Link>
                        </div>

                        <div className="flex items-center">
                            <Link to='/' className=" rounded-full flex items-center justify-center" ><FontAwesomeIcon icon={faBell} /></Link>
                        </div>
                    </div>
                </div>
                <div className="w-22/24 mx-auto">
                    <div className="border-1 border-secondary p-2 rounded-2xl flex items-center  focus-within:ring-2 ring-secondary">

                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input 
                        type="text" 
                        name="search" 
                        id="search" 
                            className="p-1 flex-1 focus:outline-0 font-semibold placeholder-secondary/100" 
                        placeholder="Buscar restaurante ou prato..." />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar