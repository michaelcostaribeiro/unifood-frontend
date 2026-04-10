import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const RestaurantModal = ({ restaurant }) => {
    if (restaurant) {
        return (
            <>
                <Link className="relative h-50 flex flex-col rounded-3xl overflow-hidden bg-white pb-3 shadow-md cursor-pointer text-left" key={restaurant.id}
                    to={`restaurant/${restaurant.id}`}>
                    <p className='absolute bg-white px-2 py-1 rounded-xl top-3 left-3 text-xs font-semibold'>{restaurant.food_types}</p>
                    <img
                        src={restaurant.background_image_url}
                        className="h-[70%] w-full object-cover"
                        alt={`${restaurant.name} image`} />
                    <div className='py-2 px-3'>
                        <h2 className='font-bold mb-0.5 text-[.9rem] '>{restaurant.name}</h2>
                        <div className='flex gap-2 text-[.75rem] text-black-transparent-90'>
                            <p><FontAwesomeIcon icon={faStar} className='text-amber-400' /> {restaurant.score}</p>
                            <p><FontAwesomeIcon icon={faClock} /> {restaurant.avg_min_time}-{restaurant.avg_max_time} min</p>
                            <p>Mín. R$ {restaurant.min_order}</p>
                        </div>
                    </div>
                </Link>
            </>
        )
    }
}

export default RestaurantModal