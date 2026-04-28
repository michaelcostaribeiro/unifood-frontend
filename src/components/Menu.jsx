import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faClipboardList, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
    return (
        <ul className='flex px-1 py-4 text-center fixed inset-x-0 z-99 bottom-0 [&>*]:flex-1 bg-white'>
            <li><NavLink to={'/'} className='menu-btn'><FontAwesomeIcon icon={faHouse} className='text-xl'/>Início</NavLink></li>
            <li><NavLink to={'/pedidos'} className='menu-btn'><FontAwesomeIcon icon={faClipboardList} className='text-xl' />Pedidos</NavLink></li>
            <li><NavLink to={'/favoritos'} className='menu-btn'><FontAwesomeIcon icon={faHeart} className='text-xl' />Favoritos</NavLink></li>
            <li><NavLink to={'/perfil'} className='menu-btn'><FontAwesomeIcon icon={faUser} className='text-xl' />Perfil</NavLink></li>
        </ul>
    )
}

export default Menu