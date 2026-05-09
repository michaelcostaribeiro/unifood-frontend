import { useContext, useEffect, useState } from 'react'
import icon from '../assets/favicon.png'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faHeart, faCircleQuestion, faGear, faCreditCard, faArrowRightFromBracket, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from '../contexts/LoginContext';
import { url } from '../../shared';

const Perfil = () => {
    const navigate = useNavigate('')
    const { loggedIn, setLoggedIn } = useContext(LoginContext);
    const [userInfo, setUserInfo] = useState();

    function navigateBack() {
        navigate('/login', {
            state: {
                previousUrl: '/perfil',
            },
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(loggedIn)

        if (!token || token === "undefined") {
            setLoggedIn(false)
            navigateBack()
            return;
        } else {
            const token = localStorage.getItem('token')
            async function getUserInfo() {
                try {
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
                    console.log(data)
                } catch (e) {
                    console.log(e.message)
                }
            }
            getUserInfo()
        }
    }, [])

    return (loggedIn ? (
        <div className='px-3 pt-5'>
            <div className='flex flex-col gap-5'>
                <h1 className='text-xl font-medium'>Perfil</h1>

                <div className='flex items-center gap-4'>
                    <img src={icon} alt="" className='w-15 h-15 rounded-full bg-black-transparent-25' />
                    <div>
                        {userInfo && <h2>{`${userInfo['first_name']} ${userInfo['last_name']}`}</h2>}
                        {userInfo && <p>{userInfo['email']}</p>}
                    </div>
                </div>
                <div className='flex justify-between  font-semibold'>
                    <p className='flex gap-1 items-center'>
                        <FontAwesomeIcon icon={faLocationDot} />UNIMAX - Indaiatuba
                    </p>
                    <button className='text-primary'>
                        Trocar unidade
                    </button>
                </div>
                <hr className='opacity-10' />
                <ul>
                    <li>
                        <Link to={'/pedidos'} className='profile-btn'><FontAwesomeIcon icon={faClipboardList} />Meus pedidos</Link>
                    </li>
                    <li>
                        <Link to={'/favoritos'} className='profile-btn'><FontAwesomeIcon icon={faHeart} />Favoritos</Link>
                    </li>
                    <li>
                        <Link to={'/checkout'} className='profile-btn'><FontAwesomeIcon icon={faCreditCard} />Formas de pagamento</Link>
                    </li>
                    <li>
                        <Link to={'/help'} className='profile-btn'><FontAwesomeIcon icon={faCircleQuestion} />Ajuda e suporte</Link>
                    </li>
                    <li>
                        <Link to={'/favoritos'} className='profile-btn'><FontAwesomeIcon icon={faGear} />Configurações</Link>
                    </li>

                </ul>
                <hr className='opacity-10' />
                <button className='profile-btn gap-2 border-1 cursor-pointer rounded-lg px-2 py-3 border-black-transparent-25' onClick={() => {
                    setLoggedIn(false)
                    localStorage.clear()
                    navigate('/login')
                }}><FontAwesomeIcon icon={faArrowRightFromBracket} />Sair</button>

            </div>
        </div>
    ) : 'hi')
}

export default Perfil