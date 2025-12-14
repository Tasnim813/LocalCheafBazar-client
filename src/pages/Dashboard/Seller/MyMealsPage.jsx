import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import Swal from 'sweetalert2'
import { Link } from 'react-router'

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
  console.log(meals)

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
      refetch() // UI auto refresh
      Swal.fire('Deleted!', 'Meal deleted successfully.', 'success')
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete meal.', 'error')
    }
  }

  if (isLoading) return <p className="text-center">Loading...</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <div key={meal._id} className="border rounded-lg shadow p-4 flex flex-col">
          <img src={meal.foodImage
} alt={meal.mealName} className="h-48 w-full object-cover rounded" />

          <h2 className="text-xl font-semibold mt-2">{meal.mealName}</h2>
          <p className="text-sm text-gray-600">Chef: {meal.chefName}</p>
          <p className="mt-1"><strong>Price:</strong> ${meal.price}</p>
          <p><strong>Rating:</strong> {meal.rating || 'N/A'}</p>
          <p className="text-sm"><strong>Ingredients:</strong> {meal.ingredients?.join(', ')}</p>
          <p><strong>Delivery Time:</strong> {meal.
estimatedDeliveryTime
}</p>

          <div className="mt-auto flex gap-2 pt-4">
            <Link to={`/dashboard/update-meal/${meal._id}`} className="btn btn-sm btn-info flex-1">Update</Link>
            <button onClick={() => handleDelete(meal._id)} className="btn btn-sm btn-error flex-1">Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyMealsPage
