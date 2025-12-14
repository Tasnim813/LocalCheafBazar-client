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
      const res = await axiosSecure.get(`/meals/${id}`)
      return res.data
    },
    enabled: !!id,
  })

  if (isLoading) return <p>Loading...</p>

  const closeModal = () => setIsOpen(false)

  const { foodName, chefName, foodImage, price, rating, ingredients, estimatedDeliveryTime, chefExperience, chefId } = meal

  // Handle adding to favorites
  const handleFavorite = async () => {
    if (!user?.email) return toast.error('Please login first!')

    const favoriteData = {
      email: user.email,
      mealId: meal._id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
      addedTime: new Date(),
    }

    try {
      const result = await axiosSecure.post('/favorite', favoriteData)
      toast.success('Successfully added to favorites!')
      console.log('Favorite added:', result.data)
    } catch (error) {
      toast.error('Already added or error occurred!')
      console.error('Error adding favorite:', error)
    }
  }

  return (
    <Container>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 p-6">
        {/* Image Section */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img src={foodImage} alt={foodName} className="w-full h-full object-cover" />
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          <Heading title={foodName} subtitle={`Prepared by ${chefName}`} />

          <p className="text-gray-600">
            <span className="font-semibold">Chef ID:</span> {chefId}
          </p>

          <p className="text-gray-600">
            <span className="font-semibold">Chef Experience:</span> {chefExperience}
          </p>

          <hr />

          <p>
            <span className="font-semibold">Price:</span> ${price}
          </p>

          <p>
            <span className="font-semibold">Rating:</span> {rating} / 5 ⭐
          </p>

          <p>
            <span className="font-semibold">Estimated Delivery Time:</span> {estimatedDeliveryTime}
          </p>

          <div>
            <p className="font-semibold">Ingredients:</p>
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

      <div className="mt-6 flex justify-start">
        <FoodDetail meal={meal} />
        <button onClick={handleFavorite} className="btn btn-secondary ml-4">
          Add to Favorites
        </button>
      </div>
    </Container>
  )
}

export default MealDetails
