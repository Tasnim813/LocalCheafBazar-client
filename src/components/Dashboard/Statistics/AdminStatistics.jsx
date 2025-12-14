import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure()

  // Fetch statistics dynamically from backend
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-statistics')
      return res.data
    },
  })

  if (isLoading) return <p className="text-center mt-10">Loading...</p>

  const { totalUsers, totalPayments, ordersPending, ordersDelivered } = stats

  const ordersData = [
    { name: 'Pending', value: ordersPending },
    { name: 'Delivered', value: ordersDelivered },
  ]

  const paymentData = [{ name: 'Total Payments', amount: totalPayments }]

  const COLORS = ['#FF8042', '#0088FE']

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">Platform Statistics</h2>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white shadow rounded text-center">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <h3 className="text-gray-500">Total Payments</h3>
          <p className="text-2xl font-bold">${totalPayments}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <h3 className="text-gray-500">Orders Pending</h3>
          <p className="text-2xl font-bold">{ordersPending}</p>
        </div>
        <div className="p-4 bg-white shadow rounded text-center">
          <h3 className="text-gray-500">Orders Delivered</h3>
          <p className="text-2xl font-bold">{ordersDelivered}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Orders Pie Chart */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Orders Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={ordersData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {ordersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Payments Bar Chart */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Payments</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={paymentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default AdminStatistics
