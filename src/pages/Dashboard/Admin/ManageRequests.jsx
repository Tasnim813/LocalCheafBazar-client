import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure()

  // Fetch all role requests
  const { data: requests = [], refetch, isLoading } = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/role-requests')
      return res.data
    },
  })

  // Approve request
  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/role-requests/approve/${id}`)
      Swal.fire('Approved', 'Request approved successfully', 'success')
      refetch()
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Failed to approve request', 'error')
    }
  }

  // Reject request
  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/role-requests/reject/${id}`)
      Swal.fire('Rejected', 'Request rejected successfully', 'info')
      refetch()
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Failed to reject request', 'error')
    }
  }

  if (isLoading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Role Requests</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Request Type</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Request Time</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r._id} className="text-center">
              <td className="border px-4 py-2">{r.userName}</td>
              <td className="border px-4 py-2">{r.userEmail}</td>
              <td className="border px-4 py-2">{r.requestType}</td>
              <td className="border px-4 py-2">{r.requestStatus}</td>
              <td className="border px-4 py-2">{new Date(r.requestTime).toLocaleString()}</td>
              <td className="border px-4 py-2 flex gap-2 justify-center">
                <button
                  disabled={r.requestStatus !== 'pending'}
                  onClick={() => handleApprove(r._id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                >
                  Accept
                </button>
                <button
                  disabled={r.requestStatus !== 'pending'}
                  onClick={() => handleReject(r._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageRequests
