import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'

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

  if (isLoading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="text-center">
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.role}</td>
              <td className="border px-4 py-2">{u.status}</td>
              <td className="border px-4 py-2">
                {(u.role === 'user' || u.role === 'chef') && (
                  <button
                    disabled={u.status === 'fraud'}
                    onClick={() => handleMakeFraud(u.email, u.status)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    {u.status === 'fraud' ? 'Fraud' : 'Make Fraud'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageUsers
