import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState(false)
    return (pedidos ?
        <div className='px-3 pt-5'>
            <h1 className='text-xl font-medium'>Favoritos</h1>
        </div> :
        <div className='px-3 pt-15'>
            <div className='flex flex-col items-center gap-3' >
                <FontAwesomeIcon icon={faCartShopping} className='text-5xl ' />
                <h1 className='text-xl text-center'>Nenhum pedido encontrado.</h1>
                <Link to={'/'} className='btn-food text-xl bg-primary text-white '>Ver restaurantes</Link>
            </div>
        </div>
    )
}
export default Pedidos