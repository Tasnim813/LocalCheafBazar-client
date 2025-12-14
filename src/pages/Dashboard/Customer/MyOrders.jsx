import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from '../../../hooks/useAuth'
import MyOrderCart from '../../../components/Dashboard/TableRows/MyOrderCart'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

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

  if (isLoading) return <p>Loading...</p>

  return (
    <div className='container mx-auto px-4 sm:px-8 grid grid-cols-3 gap-4'>
      {orders.length > 0 ? (
        orders.map(order => <MyOrderCart key={order._id} order={order} />)
      ) : (
        <p className='col-span-3 text-center'>No orders found.</p>
      )}
    </div>
  )
}

export default MyOrders
