import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import { UploadImage } from '../../utillis'
import { toast } from 'react-hot-toast'


const CreateMealForm = () => {
  const { user } = useAuth()
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const imageFile = data.foodImage[0]
      const imageURL = await UploadImage(imageFile)

      const mealData = {
        foodName: data.foodName,
        chefName: data.chefName,
        foodImage: imageURL,
        price: Number(data.price),
        rating: 0,
        ingredients: data.ingredients.split(','),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefId: data.chefId,
        userEmail: user?.email,
        createdAt: new Date(),
      }

      console.log(mealData)
      // 👉 POST request here (axios/fetch)

      toast.success('Meal created successfully!')
      reset()
    } catch (err) {
      console.error(err)
      toast.error('Failed to create meal')
    }
  }

  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex justify-center items-center bg-gray-50'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-4xl bg-white p-8 rounded-xl shadow'
      >
        <h2 className='text-2xl font-bold mb-6 text-gray-700'>
          Create New Meal
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Food Name */}
          <div>
            <label className='text-sm text-gray-600'>Food Name</label>
            <input
              className='input'
              {...register('foodName', { required: 'Food name is required' })}
            />
            {errors.foodName && (
              <p className='text-xs text-red-500'>
                {errors.foodName.message}
              </p>
            )}
          </div>

          {/* Chef Name */}
          <div>
            <label className='text-sm text-gray-600'>Chef Name</label>
            <input
              className='input'
              {...register('chefName', { required: 'Chef name is required' })}
            />
          </div>

          {/* Price */}
          <div>
            <label className='text-sm text-gray-600'>Price</label>
            <input
              type='number'
              className='input'
              {...register('price', { required: true })}
            />
          </div>

          {/* Estimated Delivery Time */}
          <div>
            <label className='text-sm text-gray-600'>
              Estimated Delivery Time
            </label>
            <input
              className='input'
              placeholder='30 minutes'
              {...register('estimatedDeliveryTime', { required: true })}
            />
          </div>

          {/* Ingredients */}
          <div className='lg:col-span-2'>
            <label className='text-sm text-gray-600'>
              Ingredients (comma separated)
            </label>
            <textarea
              className='input h-28'
              placeholder='Chicken, Rice, Spices'
              {...register('ingredients', { required: true })}
            />
          </div>

          {/* Chef Experience */}
          <div>
            <label className='text-sm text-gray-600'>Chef Experience</label>
            <input
              className='input'
              placeholder='5 years experience'
              {...register('chefExperience', { required: true })}
            />
          </div>

          {/* Chef ID */}
          <div>
            <label className='text-sm text-gray-600'>Chef ID</label>
            <input
              className='input bg-gray-100'
              readOnly
              {...register('chefId')}
            />
          </div>

          {/* User Email */}
          <div className='lg:col-span-2'>
            <label className='text-sm text-gray-600'>User Email</label>
            <input
              className='input bg-gray-100'
              readOnly
              value={user?.email}
            />
          </div>

          {/* Image Upload */}
          <div className='lg:col-span-2'>
            <label className='text-sm text-gray-600'>Food Image</label>
            <input
              type='file'
              accept='image/*'
              {...register('foodImage', { required: true })}
            />
          </div>
        </div>

        <button
          type='submit'
          className='mt-6 w-full bg-lime-500 text-white py-3 rounded-md font-semibold'
        >
          Create Meal
        </button>
      </form>
    </div>
  )
}

export default CreateMealForm
