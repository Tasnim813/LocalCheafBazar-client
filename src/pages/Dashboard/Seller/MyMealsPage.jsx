import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import Swal from 'sweetalert2'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const MyMealsPage = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: meals = [], refetch, isLoading } = useQuery({
    queryKey: ['my-meals', user?.email],
    enabled: !!user?.email && !!user?.accessToken,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-meals/${user.email}`)
      return res.data
    },
  })

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This meal will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    })

    if (!result.isConfirmed) return

    try {
      await axiosSecure.delete(`/meals/${id}`)
      refetch()
      Swal.fire('Deleted!', 'Meal deleted successfully.', 'success')
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete meal.', 'error')
    }
  }

  if (isLoading)
    return <LoadingSpinner></LoadingSpinner>

  if (meals.length === 0)
    return <p className="text-center text-lg text-gray-500 mt-10">You have no meals yet. 🍽</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {meals.map((meal) => (
        <motion.div
          key={meal._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border rounded-lg shadow p-4 flex flex-col bg-gradient-to-r from-lime-50 to-orange-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <img
            src={meal.foodImage}
            alt={meal.mealName}
            className="h-48 w-full object-cover rounded mb-3"
          />

          <h2 className="text-xl font-semibold mb-1 text-purple-700">{meal.mealName}</h2>
          <p className="text-sm text-gray-600 mb-1">Chef: {meal.chefName}</p>
          <p className="mb-1">
            <strong>Price:</strong>{' '}
            <span className="text-green-600 font-semibold">${meal.price}</span>
          </p>
          <p className="mb-1">
            <strong>Rating:</strong>{' '}
            <span className="text-yellow-600">{meal.rating || 'N/A'}</span>
          </p>
          <p className="text-sm mb-1">
            <strong>Ingredients:</strong> {meal.ingredients?.join(', ')}
          </p>
          <p className="mb-3">
            <strong>Delivery Time:</strong> {meal.estimatedDeliveryTime}
          </p>

          <div className="mt-auto flex gap-2 pt-4">
            <Link
              to={`/dashboard/update-meal/${meal._id}`}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-lime-500 to-orange-500 text-white rounded hover:from-orange-500 hover:to-lime-500 text-center transition-all duration-300"
            >
              Update
            </Link>
            <button
              onClick={() => handleDelete(meal._id)}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded hover:from-pink-500 hover:to-red-500 transition-all duration-300"
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default MyMealsPage
