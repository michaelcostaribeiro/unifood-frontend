import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { url } from '../../shared';
import RestaurantList from '../components/RestaurantList';
import { useNavigate } from 'react-router-dom';

const Favoritos = () => {
    const [restaurantesFavoritos, setRestaurantesFavoritos] = useState(false)
    const [restaurants, setRestaurants] = useState()

    const navigate = useNavigate();


    useEffect(()=>{
        if(!localStorage.token){
            navigate('/login')
        }
        const favoritesEndpoint = 'api/favorites/'

        async function getFavorites(){
            try{
                const response = await fetch(`${url}${favoritesEndpoint}`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${localStorage.token}`
                    }
                })
                const data = await response.json();
                if(data[0]){
                    setRestaurantesFavoritos(true)
                    setRestaurants(data)
                }else{
                    setRestaurantesFavoritos(false)
                    setRestaurants(null)
                }
            }catch(e){
                console.log(`Something went wrong: ${e.message}`)
            }
        }
        getFavorites();
    },[])

    return (restaurantesFavoritos ?
        <div className='px-3 pt-5'>
            <h1 className='text-xl font-medium pb-5'>Favoritos</h1>
            <RestaurantList  restaurants={restaurants}/>
        </div> :
        <div className='px-3 pt-15'>
            <div className='flex flex-col items-center gap-3' >
                <FontAwesomeIcon icon={faStar} className='text-5xl ' />
                <h1 className='text-xl text-center'>Nenhum restaurante favorito encontrado.</h1>
            </div>
        </div>
    )
}

export default Favoritos