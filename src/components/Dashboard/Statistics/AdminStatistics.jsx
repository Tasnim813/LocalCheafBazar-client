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
import { motion } from 'framer-motion'

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

  const COLORS = ['#84cc16', '#f97316'] // lime & orange

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500">
        Platform Statistics
      </h2>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Total Users', value: totalUsers },
          { title: 'Total Payments', value: `$${totalPayments}` },
          { title: 'Orders Pending', value: ordersPending },
          { title: 'Orders Delivered', value: ordersDelivered },
        ].map((card, index) => (
          <motion.div
            key={index}
            className="p-4 bg-lime-50 shadow rounded text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <h3 className="text-lime-700">{card.title}</h3>
            <p className="text-2xl font-bold text-lime-900">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Orders Pie Chart */}
        <motion.div
          className="bg-lime-50 shadow rounded p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-2 text-lime-800">Orders Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={ordersData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
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
        </motion.div>

        {/* Payments Bar Chart */}
        <motion.div
          className="bg-lime-50 shadow rounded p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-2 text-lime-800">Payments</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={paymentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#84cc16" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AdminStatistics
