import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClipboardList as solidClipboard,
    faUser as solidUser,
    faHeart as solidHeart,
    faHouse as solidHouse
} from '@fortawesome/free-solid-svg-icons';
import {
    faUser as regularUser
    , faHeart as regularHeart
    , faHouse as regularHouse
} from '@fortawesome/free-regular-svg-icons';

const Menu = () => {
    return (
        <ul className='flex px-1 py-4 text-center font-semibold fixed inset-x-0 z-99 bottom-0 [&>*]:flex-1 bg-white'>
            {/* Inicio */}
            <li><NavLink to={'/'} className='menu-btn'>{({ isActive }) => (
                <>
                    <FontAwesomeIcon
                        icon={isActive ? solidHouse : regularHouse}
                        className='text-xl' />Início
                </>
            )}</NavLink></li>




            {/* Pedidos */}
            <li><NavLink to={'/pedidos'} className='menu-btn'>
                <FontAwesomeIcon icon={solidClipboard} className='text-xl' />Pedidos</NavLink>
            </li>

            {/* Favoritos */}
            <li><NavLink to={'/favoritos'} className='menu-btn'>{({ isActive }) => (
                <>
                    <FontAwesomeIcon
                        icon={isActive ? solidHeart : regularHeart}
                        className={`text-xl`} />Favoritos
                </>
            )}</NavLink></li>


            {/* Perfil */}
            <li><NavLink to={'/perfil'} className='menu-btn'>{({ isActive }) => (
                <>
                    <FontAwesomeIcon
                        icon={isActive ? solidUser : regularUser}
                        className='text-xl' />Início
                </>
            )}</NavLink></li>

        </ul>
    )
}

export default Menu