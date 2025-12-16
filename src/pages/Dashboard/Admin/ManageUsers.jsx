import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure()

  // Fetch all users
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users')
      return res.data
    },
  })

  // Handle Make Fraud
  const handleMakeFraud = async (email, status) => {
    if (status === 'fraud') return
    try {
      await axiosSecure.patch(`/users/status-update/${email}`, { status: 'fraud' })
      Swal.fire('Success', 'User marked as fraud', 'success')
      refetch()
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Failed to update status', 'error')
    }
  }

  if (isLoading) return <p className="text-center mt-10 text-lime-600">Loading...</p>

  return (
    <motion.div
      className="p-6 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500">
        Manage Users
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse border text-center">
          <thead>
            <tr className="bg-lime-100 text-lime-800">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <motion.tr
                key={u._id}
                className="text-lime-900"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <td className="border px-4 py-2">{u.name}</td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2">{u.role}</td>
                <td className={`border px-4 py-2 font-semibold ${u.status === 'fraud' ? 'text-red-600' : 'text-lime-700'}`}>
                  {u.status}
                </td>
                <td className="border px-4 py-2">
                  {(u.role === 'user' || u.role === 'chef') && (
                    <button
                      disabled={u.status === 'fraud'}
                      onClick={() => handleMakeFraud(u.email, u.status)}
                      className={`px-3 py-1 rounded ${
                        u.status === 'fraud'
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                    >
                      {u.status === 'fraud' ? 'Fraud' : 'Make Fraud'}
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default ManageUsers
