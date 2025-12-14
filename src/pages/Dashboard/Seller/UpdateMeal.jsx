import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import Swal from 'sweetalert2'
import { UploadImage } from '../../../utillis'

const UpdateMeal = () => {
  const { id } = useParams()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [previewImage, setPreviewImage] = useState('')

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm()

  // 🔹 Fetch single meal
  const { data: meal, isLoading } = useQuery({
    queryKey: ['meal', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`)
      return res.data
    },
    enabled: !!id,
  })

  // 🔹 Prefill form whenever meal changes
  useEffect(() => {
    if (meal) {
      const defaultValues = {
        mealName: meal.foodName,
        price: meal.price,
        rating: meal.rating,
        ingredients: meal.ingredients.join(', '),
        deliveryTime: meal.estimatedDeliveryTime,
        image: meal.foodImage
      }
      reset(defaultValues) // <-- Use reset to properly prefill form
      setPreviewImage(meal.foodImage)
    }
  }, [meal, reset])

  // 🔹 Preview new image (only if File)
  const foodImageFile = watch('foodImage')




  useEffect(() => {
  if (meal) {
    const defaultValues = {
      mealName: meal.foodName || '',
      price: meal.price || '',
      rating: meal.rating || '',
      ingredients: meal.ingredients ? meal.ingredients.join(', ') : '',
      deliveryTime: meal.estimatedDeliveryTime || '',
      image: meal.foodImage || ''
    }
    reset(defaultValues) // <-- এটা form কে prefill করবে
    setPreviewImage(meal.foodImage || '')
  }
}, [meal, reset])


  // 🔹 Mutation for updating meal
  const mutation = useMutation({
    mutationFn: async (updatedMeal) => axiosSecure.patch(`/meals/${id}`, updatedMeal),
    onSuccess: () => {
      Swal.fire('Success', 'Meal updated successfully!', 'success')

      if(user?.email) queryClient.invalidateQueries(['my-meals', user.email])
      queryClient.invalidateQueries(['meal', id])

      navigate('/dashboard/my-meals')
    },
    onError: (err) => {
      console.error(err)
      Swal.fire('Error', 'Failed to update meal', 'error')
    },
  })

  const onSubmit = async (data) => {
    try {
      let imageUrl = meal.foodImage

      if (data.foodImage && data.foodImage.length > 0 && data.foodImage[0] instanceof File) {
        imageUrl = await UploadImage(data.foodImage[0])
      }

      const updatedMeal = {
        foodName: data.mealName,
        price: Number(data.price),
        rating: data.rating || 0,
        ingredients: data.ingredients.split(',').map(i => i.trim()),
        estimatedDeliveryTime: data.deliveryTime,
        foodImage: imageUrl,
        userEmail: meal.userEmail,
        chefName: meal.chefName,
        chefId: meal.chefId,
        chefExperience: meal.chefExperience,
        createdAt: meal.createdAt
      }

      mutation.mutate(updatedMeal)
    } catch (err) {
      console.error(err)
      Swal.fire('Error', 'Failed to update meal', 'error')
    }
  }

  if (isLoading) return <p className="text-center">Loading...</p>

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Meal</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          {...register('mealName', { required: 'Meal Name is required' })}
          placeholder="Meal Name"
          className="input input-bordered w-full"
        />
        {errors.mealName && <p className="text-red-500">{errors.mealName.message}</p>}

        <input
          type="number"
          {...register('price', { required: 'Price is required' })}
          placeholder="Price"
          className="input input-bordered w-full"
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}

        <input
          type="text"
          {...register('rating')}
          placeholder="Rating"
          className="input input-bordered w-full"
        />

        <input
          type="text"
          {...register('ingredients', { required: 'Ingredients are required' })}
          placeholder="Ingredients (comma separated)"
          className="input input-bordered w-full"
        />
        {errors.ingredients && <p className="text-red-500">{errors.ingredients.message}</p>}

        <input
          type="text"
          {...register('deliveryTime', { required: 'Delivery Time is required' })}
          placeholder="Estimated Delivery Time"
          className="input input-bordered w-full"
        />
        {errors.deliveryTime && <p className="text-red-500">{errors.deliveryTime.message}</p>}

        {/* Image Upload */}
        <div className="p-4 w-full m-auto rounded-lg">
          <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
            <div className="flex flex-col w-max mx-auto text-center">
              <label>
                <input type="file" accept="image/*" className="hidden" {...register('foodImage')} />
                <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-600">
                  Upload New Image
                </div>
              </label>
            </div>
          </div>

          {/* Preview Image */}
          {previewImage && (
            <img
              src={previewImage}
              alt="Meal Preview"
              className="mt-2 w-40 h-40 object-cover rounded"
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-2">Update Meal</button>
      </form>
    </div>
  )
}

export default UpdateMeal
