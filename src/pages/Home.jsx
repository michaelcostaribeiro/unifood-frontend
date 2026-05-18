import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import FoodNav from '../components/FoodNav';
import RestaurantList from '../components/RestaurantList';
import Navbar from '../components/Navbar';
import { url } from '../../shared';
import foodinho from '../assets/lilfood.png'

const Home = () => {
  const [restaurants, setRestaurants] = useState()
  const [allRestaurants, setAllRestaurants] = useState()
  const [foodTypes, setFoodTypes] = useState()
  const [selectedType, setSelectedType] = useState('Todos')

  useEffect(() => {

    const fetchData = async () => {
      try {
        const [restaurantRes, typesRes] = await Promise.all([fetch(`${url}api/restaurants/`),
        fetch(`${url}api/types`),
        ]);
        const restaurantsData = await restaurantRes.json();
        const typesData = await typesRes.json();

        setAllRestaurants(restaurantsData.restaurants)
        setRestaurants(restaurantsData.restaurants)
        setFoodTypes(typesData.foodTypes)

      } catch (error) {
        console.log(`something went wrong: ${error}`)
      }
    }
    fetchData()

  }, [])
  useEffect(() => {
    if (selectedType === 'Todos') {
      setRestaurants(allRestaurants);
      return;
    }
    const filtered = allRestaurants.filter((rest) => {
      return rest.food_types === selectedType;
    });
    setRestaurants(filtered);
  }, [selectedType])
  return (<>
    <Navbar />

    <div className="px-3 ">
      <section className="bg-gradient-to-b from-secondary-light to-secondary text-white py-5 h-50 px-3 rounded-3xl my-3 shadow-lg relative w-22/24 mx-auto">
        <div className='flex h-full'>
          <div className='flex flex-col justify-between h-full w-3/6 py-4'>
            <h2 className='text-xl/6 font-bold '>Peça antes do seu intervalo!</h2>
            <p className='text-sm/4 tracking-wide' >Evite filas e garanta a sua refeição antes do horário de intervalo </p>
          </div>
          <div className='w-2/6'></div>
        </div>
        <div className='w-43 h-full absolute right-0 top-0 flex items-center'>
          <img src={foodinho} alt="" className='w-full' />
        </div>
      </section>

      {foodTypes ? <FoodNav foodTypes={foodTypes}
        selectedType={selectedType}
        setSelectedType={setSelectedType} /> : ''}

      {restaurants ? <>
        <div className='flex justify-between items-center text-ternary'>
          <h1 className='font-bold my-3'>Restaurantes perto de você</h1>
          <p className='text-xs opacity-50'>{restaurants.length} opções</p>
        </div>
        <RestaurantList restaurants={restaurants} />
      </>
        : ''}
    </div>
  </>
  )
}

export default Home