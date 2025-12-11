import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import { UploadImage } from '../../utillis'
import { toast } from 'react-hot-toast'
import Heading from '../Shared/Heading'
import Button from '../Shared/Button/Button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'


const CreateMealForm = () => {
  const { user } = useAuth()
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const {mutateAsync}=useMutation({
  mutationFn: async payload=>
    await axios.post('http://localhost:3000/meals',payload),
  onSuccess:data =>{
    console.log(data)
    
  },
  onError:error=>{
    console.log(error)
  },
  onMutate:payload=>{
    console.log('I will post this data',payload)
  }
})


  const onSubmit = async (data) => {
     const { foodName, chefName, foodImage,price, rating,ingredients, estimatedDeliveryTime,chefExperience,chefId } = data
    const imageFile = foodImage[0]
    try {
      // const imageFile = data.foodImage[0]
      const imageURL = await UploadImage(imageFile)

      const mealData = {
        foodName,
        chefName,
        foodImage: imageURL,
        price: Number(price),
        rating:0,
        ingredients: data.ingredients.split(','),
        estimatedDeliveryTime,
        chefExperience,
        chefId,
        userEmail: user?.email,
        createdAt: new Date(),
      }

      console.log('meldata here',mealData)
     await mutateAsync(mealData)

      toast.success('Meal created successfully!')
      reset()
    
    } catch (err) {
      console.error(err)
      toast.error('Failed to create meal')
    }
  }

  return (
  
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <Heading title="Create New Meal" subtitle="Add a new meal to the platform" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">

          {/* Food Name */}
          <div>
            <label className="font-semibold">Food Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter food name"
              {...register('foodName', {
                  required: 'foodName is required'
                })}
            />
            {
              errors.foodName && <p className='text-red-500'>{errors.foodName.message}</p> 
            }
          </div>

          {/* Chef Name */}
          <div>
            <label className="font-semibold">Chef Name</label>
            <input
              type="text"
              {...register("chefName", { required: 'chefName is required' })}
              className="input input-bordered w-full"
              placeholder="Chef name"
            />
            {
              errors.chefName && <p>{errors.chefName.message}</p>

            }
          </div>

          {/* Food Image (Upload URL for now) */}
         {/* Image */}
           <div className='p-4 w-full m-auto rounded-lg'>
  <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
    <div className='flex flex-col w-max mx-auto text-center'>
      <label>
        <input
          className='text-sm cursor-pointer w-36 hidden'
          type='file'
          accept='image/*'
         
                 
          {...register('foodImage', { required: "Image is required" })}
        />
        <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-600'>
          Upload
        </div>
        {errors.foodImage && (<p className="text-red-500">{errors.foodImage.message}</p>)}
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
                    required: 'price is required',
                    min: { value: 0, message: 'Price must be Positive' }

                  })}
            />
            {
                  errors.price && (<p className="text-red-500">{errors.price.message}</p>)
                }
          </div>

          {/* Ingredients */}
          <div>
            <label className="font-semibold">Ingredients</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Comma separated ingredients"
              {...register("ingredients", { required: 'ingredients is required'})}
            />
          </div>

          {/* Estimated Delivery Time */}
          <div>
            <label className="font-semibold">Estimated Delivery Time</label>
            <input
              type="text"          
              className="input input-bordered w-full"
              placeholder="e.g. 30 minutes"
              {...register("estimatedDeliveryTime", { required: true })}
            />
          </div>

          {/* Chef Experience */}
          <div>
            <label className="font-semibold">Chef’s Experience</label>
            <input
              type="text"
              {...register("chefExperience", { required: true })}
              className="input input-bordered w-full"
              placeholder="e.g. 5 years experience"
            />
          </div>

          {/* Chef ID */}
          <div>
            <label className="font-semibold">Chef ID</label>
            <input
              type="text"
              {...register("chefId", { required: true })}
              className="input input-bordered w-full"
              placeholder="Assigned Chef ID"
            />
          </div>

          {/* User Email (Read Only) */}
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
          <Button label="Create Meal" type="submit" />
        </form>
      </div>
  )
}

export default CreateMealForm
