import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import FoodNav from '../components/FoodNav';
import RestaurantList from '../components/RestaurantList';
import Navbar from '../components/Navbar';

const Home = () => {
  const [restaurants, setRestaurants] = useState()
  const [allRestaurants, setAllRestaurants] = useState()
  const [foodTypes, setFoodTypes] = useState()
  const [selectedType, setSelectedType] = useState('Todos')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantRes, typesRes] = await Promise.all([fetch('https://azulciano57.pythonanywhere.com/api/restaurants/'),
          fetch('https://azulciano57.pythonanywhere.com/api/types'),
        ]);
        const restaurantsData = await restaurantRes.json();
        const typesData = await typesRes.json();

        setAllRestaurants(restaurantsData.restaurants)
        setRestaurants(restaurantsData.restaurants)
        setFoodTypes(typesData.foodTypes)
        console.log(typesData.foodTypes)

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
      console.log(rest.food_types)
      return rest.food_types === selectedType;
    });
    setRestaurants(filtered);
  }, [selectedType])
  return (<>
    <Navbar />

    <div className="px-3 ">
      <section className="bg-secondary text-white p-5 rounded-3xl my-3 shadow-lg ">
        <p className="text-xs opacity-80">🕐 Pausa em breve?</p>
        <h2 className="text-lg font-bold">Peça antes de sair!</h2>
        <p className="opacity-80 text-xs mb-3">Evite filas e garanta sua refeição no horário da pausa.</p>
        <ul className="flex gap-4 text-xs ">
          <li><FontAwesomeIcon icon={faClock} /> Pronto na pausa</li>
          <li><FontAwesomeIcon icon={faStar} /> Sem fila</li>
          <li><FontAwesomeIcon icon={faUtensils} /> +5 opções</li>
        </ul>
      </section>

      {foodTypes ? <FoodNav foodTypes={foodTypes}
        selectedType={selectedType}
        setSelectedType={setSelectedType} /> : ''}

      {restaurants ? <>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold my-3'>Todos os restaurantes</h1>
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