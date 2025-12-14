import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router'

const UpdateMeal = () => {
  const { id } = useParams()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const [mealData, setMealData] = useState({
    mealName: '',
    price: '',
    rating: '',
    ingredients: '',
    deliveryTime: '',
    image: '',
  })
  const [loading, setLoading] = useState(true)

  // 🔹 Fetch meal data by ID
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await axiosSecure.get(`/meals/${id}`)
        const data = res.data
        setMealData({
          mealName: data.mealName || '',
          price: data.price || '',
          rating: data.rating || '',
          ingredients: data.ingredients?.join(', ') || '',
          deliveryTime: data.deliveryTime || '',
          image: data.image || '',
        })
      } catch (error) {
        console.error('Failed to fetch meal:', error)
        Swal.fire('Error', 'Failed to fetch meal data', 'error')
      } finally {
        setLoading(false)
      }
    }

    fetchMeal()
  }, [id, axiosSecure])

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setMealData((prev) => ({ ...prev, [name]: value }))
  }

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedMeal = {
        ...mealData,
        ingredients: mealData.ingredients.split(',').map((i) => i.trim()),
      }

      await axiosSecure.patch(`/meals/${id}`, updatedMeal)
      Swal.fire('Success', 'Meal updated successfully!', 'success')
      navigate('/dashboard/my-meals') // redirect after update
    } catch (error) {
      console.error('Failed to update meal:', error)
      Swal.fire('Error', 'Failed to update meal', 'error')
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Meal</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="mealName"
          value={mealData.mealName}
          onChange={handleChange}
          placeholder="Meal Name"
          required
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="price"
          value={mealData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="rating"
          value={mealData.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="ingredients"
          value={mealData.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (comma separated)"
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="deliveryTime"
          value={mealData.deliveryTime}
          onChange={handleChange}
          placeholder="Estimated Delivery Time"
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="image"
          value={mealData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary mt-2">
          Update Meal
        </button>
      </form>
    </div>
  )
}

export default UpdateMeal
