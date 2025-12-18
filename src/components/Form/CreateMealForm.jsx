import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import { UploadImage } from '../../utillis'
import { toast } from 'react-hot-toast'
import Heading from '../Shared/Heading'
import Button from '../Shared/Button/Button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { motion } from 'framer-motion'
import LoadingSpinner from '../Shared/LoadingSpinner'

const CreateMealForm = () => {
  const { user,Loading } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm()

  const { mutateAsync } = useMutation({
    mutationFn: async (payload) => await axios.post('https://localchefbazar-server-mauve.vercel.app/meals', payload),
    onMutate: (payload) => console.log('Posting data:', payload),
    onSuccess: (data) => console.log('Meal created:', data),
    onError: (error) => console.error(error),
  })

  const onSubmit = async (data) => {
    try {
      const { foodName, chefName, foodImage, price, ingredients, estimatedDeliveryTime, chefExperience } = data
      const imageFile = foodImage[0]
      const imageURL = await UploadImage(imageFile)
      const mealData = {
        foodName,
        chefName,
        foodImage: imageURL,
        price: Number(price),
        rating: 0,
        ingredients: ingredients.split(',').map((item) => item.trim()),
        estimatedDeliveryTime,
        chefExperience,
        chefId: user?.uid,
        userEmail: user?.email,
        createdAt: new Date(),
      }
      await mutateAsync(mealData)
      toast.success('Meal created successfully!')
      reset()
    } catch (err) {
      console.error(err)
      toast.error('Failed to create meal')
    }
  }

  if(Loading){
    <LoadingSpinner></LoadingSpinner>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-lime-50 to-orange-50 rounded-xl shadow-lg"
    >
      <Heading
        title="Create New Meal"
        subtitle="Add a new meal to the platform"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">

        {/* Food Name */}
        <div>
          <label className="font-semibold">Food Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter food name"
            {...register('foodName', { required: 'Food Name is required' })}
          />
          {errors.foodName && <p className="text-red-500">{errors.foodName.message}</p>}
        </div>

        {/* Chef Name */}
        <div>
          <label className="font-semibold">Chef Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Chef Name"
            defaultValue={user?.displayName || ''}
            {...register('chefName', { required: 'Chef Name is required' })}
          />
          {errors.chefName && <p className="text-red-500">{errors.chefName.message}</p>}
        </div>

        {/* Food Image */}
        <div className="p-4 w-full m-auto rounded-lg">
          <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
            <div className="flex flex-col w-max mx-auto text-center">
              <label>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register('foodImage', { required: 'Image is required' })}
                />
                <div className="bg-gradient-to-r from-lime-500 to-orange-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:from-orange-500 hover:to-lime-500 transition-all duration-300">
                  Upload
                </div>
                {errors.foodImage && <p className="text-red-500">{errors.foodImage.message}</p>}
              </label>
            </div>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold">Price ($)</label>
          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full"
            placeholder="Price"
            {...register('price', {
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' },
            })}
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        {/* Ingredients */}
        <div>
          <label className="font-semibold">Ingredients</label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Comma separated ingredients"
            {...register('ingredients', { required: 'Ingredients are required' })}
          />
          {errors.ingredients && <p className="text-red-500">{errors.ingredients.message}</p>}
        </div>

        {/* Estimated Delivery Time */}
        <div>
          <label className="font-semibold">Estimated Delivery Time</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g. 30 minutes"
            {...register('estimatedDeliveryTime', { required: 'Estimated Delivery Time is required' })}
          />
          {errors.estimatedDeliveryTime && <p className="text-red-500">{errors.estimatedDeliveryTime.message}</p>}
        </div>

        {/* Chef Experience */}
        <div>
          <label className="font-semibold">Chef’s Experience</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g. 5 years experience"
            {...register('chefExperience', { required: 'Chef Experience is required' })}
          />
          {errors.chefExperience && <p className="text-red-500">{errors.chefExperience.message}</p>}
        </div>

        {/* User Email */}
        <div>
          <label className="font-semibold">User Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Submit */}
        <Button
          label="Create Meal"
          type="submit"
          className="bg-gradient-to-r from-lime-500 to-orange-500 hover:from-orange-500 hover:to-lime-500 text-white"
        />
      </form>
    </motion.div>
  )
}

export default CreateMealForm
