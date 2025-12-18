import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from '../../../hooks/useAuth'
import MyOrderCart from '../../../components/Dashboard/TableRows/MyOrderCart'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const MyOrders = () => {
  const axiosSecure = useAxiosSecure() // JWT-enabled axios
  const { user } = useAuth()

  // Fetch user's orders securely
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      if (!user?.email) return []
      const res = await axiosSecure.get(`/my-order/${user.email}`)
      return res.data
    },
    enabled: !!user?.email, // only fetch if email exists
  })

  if (isLoading) 
    return <LoadingSpinner></LoadingSpinner>

  return (
    <div className='container mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {orders.length > 0 ? (
        orders.map(order => (
          <MyOrderCart
            key={order._id}
            order={order}
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition duration-300"
          />
        ))
      ) : (
        <p className='col-span-3 text-center text-gray-500 mt-10'>No orders found.</p>
      )}
    </div>
  )
}

export default MyOrders
