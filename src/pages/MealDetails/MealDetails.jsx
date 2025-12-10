import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import PurchaseModal from '../../components/Modal/PurchaseModal'
import { useState } from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const MealDetails = () => {
  let [isOpen, setIsOpen] = useState(false)
  const { id } = useParams()
  console.log(id)
  const { data: meal = [] } = useQuery({
    queryKey: ['meal', id],
    queryFn: async () => {
      const result = await axios.get(`http://localhost:3000/meal/${id}`)
      return result.data;
    }
  })
  console.log(meal)
  const closeModal = () => {
    setIsOpen(false)
  }

  const { FoodName, ChefName, FoodImage, Price, Rating, Ingredients, EstimatedDeliveryTime, ChefId, DeliveryArea,ChefExperience } = meal


  return (
    <Container>


      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 p-6">

        {/* Image Section */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={FoodImage}
            alt={FoodName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="space-y-4">

          <Heading title={FoodName} subtitle={`Prepared by ${ChefName}`} />

          <p className="text-gray-600">
            <span className="font-semibold">Chef ID:</span> {ChefId}
          </p>

          <p className="text-gray-600">
        <span className="font-semibold">Chef Experience:</span> {ChefExperience}
      </p>

          <hr />

          <p>
            <span className="font-semibold">Price:</span> ${Price}
          </p>

          <p>
            <span className="font-semibold">Rating:</span> {Rating} / 5 ⭐
          </p>

          <p>
            <span className="font-semibold">Delivery Area:</span> {DeliveryArea}
          </p>

          <p>
            <span className="font-semibold">Estimated Delivery Time:</span>{' '}
            {EstimatedDeliveryTime}
          </p>

          <div>
            <p className="font-semibold">Ingredients:</p>
            <ul className="list-disc ml-6 text-gray-600">
              {Ingredients?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Order Button */}
          <Button
            label="Order Now"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <PurchaseModal isOpen={isOpen} closeModal={closeModal} />
    </Container>
  )
}

export default MealDetails
