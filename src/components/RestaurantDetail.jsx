import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import { url } from '../../shared';

const RestaurantDetail = () => {
    const { id } = useParams()
    const [restaurant, setRestaurant] = useState()
    const [foods, setFoods] = useState()
    const [foodTypes, setFoodTypes] = useState()

    const [isFavorite, setIsFavorite] = useState()

    const favoritesEndpoint = 'api/favorites/'
    const favoriteEndpoint = `api/favorite/${id}`
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [restaurantRes, foodsRes] = await Promise.all([
                    fetch(`${url}api/restaurant/${id}`),
                    fetch(`${url}api/foods/${id}`),]
                )
                const restaurantData = await restaurantRes.json();
                const foodsData = await foodsRes.json();

                setRestaurant(restaurantData)
                setFoods(foodsData.foods)

                let allTypes = []
                foodsData.foods.forEach((food) => {
                    allTypes.push(...food.food_types)
                })
                const uniqueTypes = ['Todos', ...new Set(allTypes)]
                setFoodTypes([...uniqueTypes])


                const favData = await getFavorite();
                console.log(favData)
                if (favData[0]){
                    console.log('favoritado')
                    setIsFavorite(true)
                }else{
                    console.log('não favoritado')
                    setIsFavorite(false)
                }
            } catch (error) {
                console.log(`error: ${error}`)
            }
        }
        fetchData()
    }, [])
    async function getFavorite() {
        try {


            const response = await fetch(`${url}${favoriteEndpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
            if (!response.ok) {
                console.log(`Server returned ${response.status} for ${favoriteEndpoint}`)
                return false
            }
            const data = await response.json();
            return data
        }
        catch (e) {
            console.log('Something went wrong: ', e.message);
            return false

        }
    }

    async function setFavorite(e) {
        e.preventDefault()
        const response = await fetch(`${url}${favoritesEndpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                'restaurant': restaurant.id
            })
        })
        const data = await response.json();
        setIsFavorite(!isFavorite)
        console.log(data)
    }

    if (restaurant) {
        return (<>
            <header className='h-[40vh] relative' >
                <Link to='/' className='bg-white w-10 h-10 rounded-full absolute top-5 left-5 flex justify-center items-center shadow-xl z-50'><FontAwesomeIcon icon={faArrowLeft} /></Link>
                <button
                    to='/'
                    className='bg-white w-10 h-10 rounded-full absolute top-5 right-5 flex justify-center items-center shadow-xl z-50 '
                    onClick={(e) => setFavorite(e)}>
                    <FontAwesomeIcon icon={faStar} className={`transition-colors ${isFavorite ? 'svg-active' : 'svg-off' + ' transition'}`} />
                </button>
                <img src={`${restaurant.background_image_url}`} className='h-full w-full object-cover' alt="" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/50 to-transparent"></div>


                <div className='absolute bottom-5 left-5 text-white z-50'>
                    <h1 className='font-semibold text-xl'>{restaurant.name}</h1>
                    <div className='flex gap-2 text-[.75rem]'>
                        <p><FontAwesomeIcon icon={faStar} className='text-amber-400' /> {restaurant.score}</p>
                        <p><FontAwesomeIcon icon={faClock} /> {restaurant.avg_min_time}-{restaurant.avg_max_time} min</p>
                        <p>Mín. R$ {restaurant.min_order}</p>
                    </div>
                </div>
            </header>
            <div className='flex gap-2 overflow-x-scroll hideScroll p-3 shadow-sm'>
                {foodTypes.map((type) => {
                    return <button className='px-3 py-1 bg-secondary text-white rounded-2xl text-sm' key={type}>{type}</button>
                })}
            </div>
            <div className='my-5 flex flex-col gap-5'>
                {foods.map((food) => {
                    return <div className='w-[90%] m-auto bg-white p-5 rounded-2xl shadow-sm flex flex-col gap-1' key={food.id}>
                        <h2 className='font-bold'>{food.name}</h2>
                        <p className='text-sm opacity-50'>{food.description}</p>
                        <div className='flex justify-between items-center mt-1.5'>
                            <p className='text-red-500 font-bold'>R$ {food.price}</p>
                            <div>
                                <button className='w-7 h-7 bg-red-500 text-white rounded-full'>+</button>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </>

        )
    } else {
        return <div><h1>Restaurante não encontrado!</h1></div>
    }
}

export default RestaurantDetail