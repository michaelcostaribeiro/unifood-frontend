import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faClock } from '@fortawesome/free-solid-svg-icons';

const RestaurantDetail = () => {
    const { id } = useParams()
    const [restaurant, setRestaurant] = useState()
    const [foods, setFoods] = useState()
    const [foodTypes, setFoodTypes] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [restaurantRes, foodsRes] = await Promise.all([
                    fetch(`https://azulciano57.pythonanywhere.com/api/restaurant/${id}`),
                    fetch(`https://azulciano57.pythonanywhere.com/api/foods/${id}`),]
                )
                const restaurantData = await restaurantRes.json();
                const foodsData = await foodsRes.json();


                setRestaurant(restaurantData)
                setFoods(foodsData.foods)

                let allTypes = []
                foodsData.foods.forEach((food)=>{
                    allTypes.push(...food.food_types)
                })
                const uniqueTypes = ['Todos', ...new Set(allTypes)]
                setFoodTypes([...uniqueTypes])
            } catch (error) {
                console.log(`error: ${error}`)
            }
        }
        fetchData()
    }, [])
    if (restaurant) {
        return (<>
            <header className='h-[40vh] relative' >
                <Link to='/' className='bg-white w-10 h-10 rounded-full absolute top-5 left-5 flex justify-center items-center shadow-xl z-50'><FontAwesomeIcon icon={faArrowLeft} /></Link>
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
                {foodTypes.map((type)=> {
                    return <button className='px-3 py-1 bg-blue-300 rounded-2xl text-sm'>{type}</button>
                })}
            </div>
            <div className='my-5 flex flex-col gap-5'>
                {foods.map((food) => {
                    return <div className='w-[90%] m-auto bg-white p-5 rounded-2xl shadow-sm flex flex-col gap-1'>
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