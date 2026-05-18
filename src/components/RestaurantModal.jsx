import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const RestaurantModal = ({ restaurant }) => {
    if (restaurant) {
        return (
            <>
                <Link className="relative h-30 flex rounded-3xl overflow-hidden bg-white shadow-md cursor-pointer text-left" key={restaurant.id}
                    to={`/restaurant/${restaurant.id}`}>
                    {/* <p className='absolute bg-white px-2 py-1 rounded-xl top-3 left-3 text-xs font-semibold'>{restaurant.food_types}</p> */}
                    <div className='min-w-1/2 w-1/2'>
                        <img
                            src={restaurant.background_image_url}
                            className="h-full w-full object-cover rounded-xl"
                            alt={`${restaurant.name} image`} />
                    </div>
                    <div className='py-2 px-3 flex flex-col w-full'>
                        <div className='flex-1 flex items-center flex-col justify-center'>
                            <h2 className='font-semibold mb-0.5 text-xl '>{restaurant.name}</h2>
                            <p className='text-xs'>Ver cardápio completo</p>
                        </div>
                        <div className='flex items-center justify-between text-[.75rem] text-black-transparent-90'>
                            <p><FontAwesomeIcon icon={faStar} className='text-secondary' /> {restaurant.score}</p>
                            <p> {restaurant.avg_min_time}-{restaurant.avg_max_time} min</p>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </div>
                    </div>
                </Link>
            </>
        )
    }
}

export default RestaurantModal