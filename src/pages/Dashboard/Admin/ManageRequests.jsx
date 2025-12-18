import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure()

  const { data: requests = [], refetch, isLoading } = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/role-requests')
      return res.data
    },
  })

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/role-requests/approve/${id}`)
      Swal.fire('Approved', 'Request approved successfully', 'success')
      refetch()
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Failed to approve request', 'error')
    }
  }

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/role-requests/reject/${id}`)
      Swal.fire('Rejected', 'Request rejected successfully', 'info')
      refetch()
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Failed to reject request', 'error')
    }
  }

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <motion.div
      className="p-4 sm:p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500">
        Manage Role Requests
      </h2>

      {/* ================= Desktop / Tablet Table ================= */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse border text-center">
          <thead>
            <tr className="bg-lime-100 text-lime-800">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Request Type</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Request Time</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r, index) => (
              <motion.tr
                key={r._id}
                className="text-lime-900"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <td className="border px-4 py-2">{r.userName}</td>
                <td className="border px-4 py-2">{r.userEmail}</td>
                <td className="border px-4 py-2">{r.requestType}</td>
                <td
                  className={`border px-4 py-2 font-semibold ${
                    r.requestStatus === 'pending'
                      ? 'text-lime-700'
                      : r.requestStatus === 'approved'
                      ? 'text-blue-600'
                      : 'text-red-600'
                  }`}
                >
                  {r.requestStatus}
                </td>
                <td className="border px-4 py-2">
                  {new Date(r.requestTime).toLocaleString()}
                </td>
                <td className="border px-4 py-2 flex gap-2 justify-center">
                  <button
                    disabled={r.requestStatus !== 'pending'}
                    onClick={() => handleApprove(r._id)}
                    className={`px-3 py-1 rounded ${
                      r.requestStatus !== 'pending'
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    Accept
                  </button>
                  <button
                    disabled={r.requestStatus !== 'pending'}
                    onClick={() => handleReject(r._id)}
                    className={`px-3 py-1 rounded ${
                      r.requestStatus !== 'pending'
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    Reject
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Card Layout ================= */}
      <div className="md:hidden space-y-4">
        {requests.map((r, index) => (
          <motion.div
            key={r._id}
            className="border rounded-lg p-4 shadow-md bg-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
          >
            <p><span className="font-semibold">Name:</span> {r.userName}</p>
            <p><span className="font-semibold">Email:</span> {r.userEmail}</p>
            <p><span className="font-semibold">Type:</span> {r.requestType}</p>
            <p
              className={`font-semibold ${
                r.requestStatus === 'pending'
                  ? 'text-lime-700'
                  : r.requestStatus === 'approved'
                  ? 'text-blue-600'
                  : 'text-red-600'
              }`}
            >
              Status: {r.requestStatus}
            </p>
            <p className="text-sm text-gray-600">
              {new Date(r.requestTime).toLocaleString()}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                disabled={r.requestStatus !== 'pending'}
                onClick={() => handleApprove(r._id)}
                className={`flex-1 py-2 rounded ${
                  r.requestStatus !== 'pending'
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                Accept
              </button>
              <button
                disabled={r.requestStatus !== 'pending'}
                onClick={() => handleReject(r._id)}
                className={`flex-1 py-2 rounded ${
                  r.requestStatus !== 'pending'
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                Reject
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ManageRequests
