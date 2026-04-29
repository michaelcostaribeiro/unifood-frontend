import React from 'react'
import icon from '../assets/favicon.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faHeart, faCircleQuestion, faGear, faCreditCard, faArrowRightFromBracket, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Perfil = () => {
    return (
        <div className='px-3 pt-5'>
            <div className='flex flex-col gap-5'>
                <h1 className='text-xl font-medium'>Perfil</h1>
                <div className='flex items-center gap-4'>
                    <img src={icon} alt="" className='w-15 h-15 rounded-full bg-black-transparent-25' />
                    <div>
                        <h2>Luana Silva</h2>
                        <p>luana.silva@aluno.com</p>
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
                        <Link to={'/favoritos'} className='profile-btn'><FontAwesomeIcon icon={faGear}/>Configurações</Link>
                    </li>
                
                </ul>
                <hr className='opacity-10' />
                <button className='profile-btn gap-2 border-1 rounded-lg px-2 py-3 border-black-transparent-25'><FontAwesomeIcon icon={faArrowRightFromBracket}/>Sair</button>

            </div>
        </div>
    )
}

export default Perfil