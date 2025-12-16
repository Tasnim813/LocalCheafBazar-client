import React, { useState } from 'react'
import Swal from 'sweetalert2'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useRole from '../../../hooks/useRole'
import useStatus from '../../../hooks/useStatus'
 import { motion } from 'framer-motion';
const Profile = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [requesting, setRequesting] = useState(false)

  // Get role & status using hooks
  const [role] = useRole()
  const [status] = useStatus()

  // Fetch user profile
  const { data: profile = {} } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: async () => {
      const result = await axios.get(`http://localhost:3000/users/${user?.email}`)
      return result.data
    },
    enabled: !!user?.email
  })

  // Handle role request
  const handleRequest = async (type) => {
    if (!profile.email) return
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

  const { name, email, image, address, chefId } = profile

  return (
   

<div className="max-w-md mx-auto mt-10">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className="p-6 bg-lime-50 shadow-xl rounded-xl"
  >
    <div className="flex flex-col items-center">
      <motion.img
        src={image || user?.photoURL}
        alt={name}
        className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-lime-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
      <motion.h2
        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {name}
      </motion.h2>
      <motion.p
        className="text-lime-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {email}
      </motion.p>
      <motion.p
        className="text-lime-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        📍 {address}
      </motion.p>

      <motion.div
        className="mt-3 space-y-1 text-lime-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p><strong>Role:</strong> {role}</p>
        <p><strong>Status:</strong> {status}</p>
        {role === 'chef' && <p><strong>Chef ID:</strong> {chefId}</p>}
      </motion.div>

      <div className="flex gap-4 mt-6">
        {/* Be a Chef Button */}
        {role !== 'chef' && role !== 'admin' && status !== 'fraud' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={requesting}
            onClick={() => handleRequest('chef')}
            className="px-4 py-2 bg-gradient-to-r from-lime-500 to-orange-500 text-white rounded-lg hover:from-lime-600 hover:to-orange-600 transition"
          >
            Be a Chef
          </motion.button>
        )}

        {/* Be an Admin Button */}
        {role !== 'admin' && status !== 'fraud' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={requesting}
            onClick={() => handleRequest('admin')}
            className="px-4 py-2 bg-gradient-to-r from-lime-500 to-orange-500 text-white rounded-lg hover:from-lime-600 hover:to-orange-600 transition"
          >
            Be an Admin
          </motion.button>
        )}
      </div>
    </div>
  </motion.div>
</div>


  )
}

export default Profile
