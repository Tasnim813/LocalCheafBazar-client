import React, { useState } from 'react'
import Swal from 'sweetalert2'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const Profile = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [requesting, setRequesting] = useState(false)

  // Fetch user profile
const {data: profile=[]}=useQuery({
  queryKey:['profile'],
  queryFn:async()=>{
    const result=await axios.get(`http://localhost:3000/users/${user?.email}`)
    return result.data
  }
})
  // Handle role request
  const handleRequest = async (type) => {
    if (!profile.email) return; // safety check
    setRequesting(true)
    try {
      const res = await axiosSecure.post('/role-requests', {
        userName: profile.name,
        userEmail: profile.email,
        requestType: type,
        requestStatus: 'pending',
        requestTime: new Date().toISOString()
      })
      Swal.fire('Request Sent!', res.data.message || 'Request has been sent!', 'success')
    } catch (err) {
      Swal.fire('Error!', err.response?.data?.error || 'Failed to send request', 'error')
    } finally {
      setRequesting(false)
    }
  }

  // if (isLoading) return <p className="text-center mt-10">Loading...</p>
  // if (isError) return <p className="text-center mt-10 text-red-500">Error fetching profile</p>

  const { name, email, image, address, role, status, chefId } = profile

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <div className="flex flex-col items-center">
        <img src={image || user?.photoURL} alt={name} className="w-28 h-28 rounded-full object-cover mb-4" />
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-gray-600">{email}</p>
        <p className="text-gray-600">📍 {address}</p>

        <div className="mt-3 space-y-1 text-gray-700">
          <p><strong>Role:</strong> {role}</p>
          <p><strong>Status:</strong> {status}</p>
          {role === 'chef' && <p><strong>Chef ID:</strong> {chefId}</p>}
        </div>

        <div className="flex gap-4 mt-6">
          {role !== 'chef' && role !== 'admin' && (
            <button
              disabled={requesting}
              onClick={() => handleRequest('chef')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Be a Chef
            </button>
          )}
          {role !== 'admin' && (
            <button
              disabled={requesting}
              onClick={() => handleRequest('admin')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Be an Admin
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
