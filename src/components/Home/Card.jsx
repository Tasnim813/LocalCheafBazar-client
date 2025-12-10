import { Link } from 'react-router'

const Card = ({meal}) => {

  const{ _id,foodName,
    ChefName,
    ChefId,
    FoodImage,
    Price,
    Rating,
    DeliveryArea}=meal ||{}
  return (
   
     <Link
      to={`/meal-details/${_id}`}
      className='col-span-1 cursor-pointer group shadow-lg   rounded-xl  hover:shadow-xl transition'
    >
     
       <div className="card h-[350px] mt-5  bg-base-200 w-96 shadow-sm">
  <figure className='h-[50]  rounded-xl  object-contain ' >
    <img className='rounded-xl '
      src={FoodImage}
      alt={foodName} />
  </figure>
  <div className="card-body">
      {/* Content */}
      <div className=' '>
        <h2 className='text-lg font-semibold text-gray-800'>
          {foodName}
        </h2>

        <p className='text-sm text-gray-600'>
          👨‍🍳 {ChefName}
        </p>

        <p className='text-xs text-gray-500'>
          Chef ID: {ChefId}
        </p>

        <p className='text-sm text-gray-600'>
          📍 {DeliveryArea}
        </p>

        <div className='flex justify-between items-center pt-2'>
          <span className='font-bold text-lime-600'>
            ${Price}
          </span>

          <span className='text-sm text-yellow-500'>
            ⭐ {Rating}
          </span>
        </div>

        <button className='mt-3 w-full bg-lime-500 text-white py-2 rounded-md text-sm font-medium hover:bg-lime-600'>
          See Details
        </button>
      </div>
  </div>
</div>
   
    </Link>
  )
}

export default Card
