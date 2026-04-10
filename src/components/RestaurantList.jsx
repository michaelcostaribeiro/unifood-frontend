
import RestaurantModal from './RestaurantModal';

const RestaurantList = ({ restaurants }) => {
  return (
    <div className='flex flex-col gap-3'>
      {restaurants ? restaurants.map((restaurant) => {
        return <RestaurantModal key={restaurant.id} restaurant={restaurant}/>
      }) : ''}
    </div>

  )
}

export default RestaurantList