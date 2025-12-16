import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import PurchaseOrder from '../../components/Modal/PurchaseOrder'
import { useState } from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import FoodDetail from './FoodDetail'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import axios from 'axios'

const MealDetails = () => {
  const axiosSecure = useAxiosSecure() // JWT-enabled axios
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const { id } = useParams()

  // Fetch meal securely using JWT
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ['meal', id],
    queryFn: async () => {
      if (!id) return {}
      const res = await axios.get(`http://localhost:3000/meals/${id}`)
      return res.data
    },
    enabled: !!id,
  })
  console.log(meal)

  if (isLoading) return <p>Loading...</p>

  const closeModal = () => setIsOpen(false)

  const { foodName, chefName, foodImage, price, rating, ingredients, estimatedDeliveryTime, chefExperience, chefId } = meal

  // Handle adding to favorites
 
  return (
    <Container>
   <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 ">

  {/* Image Section */}
  <div className="rounded-2xl overflow-hidden shadow-md border border-lime-100">
    <img
      src={foodImage}
      alt={foodName}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Info Section */}
  <div className="space-y-4">

    {/* Heading */}
    <Heading
      title={foodName}
      subtitle={`Prepared by ${chefName}`}
    />

    <p className="text-gray-700">
      <span className="font-semibold text-lime-600">Chef ID:</span> {chefId}
    </p>

    <p className="text-gray-700">
      <span className="font-semibold text-lime-600">
        Chef Experience:
      </span>{" "}
      {chefExperience}
    </p>

    <hr className="border-lime-200" />

    <p className="text-gray-800">
      <span className="font-semibold text-orange-500">Price:</span> ${price}
    </p>

    <p className="text-gray-800">
      <span className="font-semibold text-orange-500">Rating:</span>{" "}
      {rating} / 5 ⭐
    </p>

    <p className="text-gray-700">
      <span className="font-semibold text-lime-600">
        Estimated Delivery Time:
      </span>{" "}
      {estimatedDeliveryTime}
    </p>

    <div>
      <p className="font-semibold text-lime-600">
        Ingredients:
      </p>
      <ul className="list-disc ml-6 text-gray-600">
        {ingredients?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    {/* Order Button */}
    <Button label="Order Now" onClick={() => setIsOpen(true)} />

  </div>
</div>



      <PurchaseOrder meal={meal} isOpen={isOpen} closeModal={closeModal} />

      <div className="mt-6  ">
        <FoodDetail meal={meal} />
        
      </div>
    </Container>
  )
}

export default MealDetails
