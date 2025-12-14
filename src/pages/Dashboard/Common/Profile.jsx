import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
  const { user } = useAuth();
  const [requesting, setRequesting] = useState({ chef: false, admin: false });
  const [requestSent, setRequestSent] = useState({ chef: false, admin: false });

  // Fetch all users
  const { data: allUsers = [] } = useQuery({
    queryKey: ['Profile'],
    queryFn: async () => {
      const result = await axios.get('http://localhost:3000/users');
      return result.data;
    }
  });

  // Filter current logged-in user
  const currentUserProfile = allUsers.find(p => p.email === user.email) || {};

  // Send Chef/Admin request
  const handleRequest = async (type) => {
    setRequesting(prev => ({ ...prev, [type]: true }));

    const requestData = {
      _id: currentUserProfile._id || "",
      userName: currentUserProfile.name || user.displayName,
      userEmail: currentUserProfile.email || user.email,
      requestType: type,
      requestStatus: "pending",
      requestTime: new Date().toISOString()
    };

    try {
      const res = await axios.post("http://localhost:3000/role-requests", requestData);
      Swal.fire("Request Sent!", res.data.message || `Your ${type} request has been sent!`, "success");
      setRequestSent(prev => ({ ...prev, [type]: true }));
    } catch (err) {
      console.error("Send request error:", err);
      Swal.fire("Error!", err.response?.data?.error || "Failed to send request", "error");
    } finally {
      setRequesting(prev => ({ ...prev, [type]: false }));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        {/* User Image */}
        <img 
          src={currentUserProfile.image || user.photoURL || '/default-avatar.png'} 
          alt={currentUserProfile.name || user.displayName || 'User'} 
          className="w-24 h-24 rounded-full object-cover mb-4" 
        />

        {/* User Info */}
        <h2 className="text-xl font-semibold">{currentUserProfile.name || user.displayName}</h2>
        <p className="text-gray-600">{currentUserProfile.email || user.email}</p>
        <p className="text-gray-600">{currentUserProfile.address || "No address added"}</p>
        <p className="text-gray-600"><strong>Role:</strong> {currentUserProfile.role || "user"}</p>
        <p className="text-gray-600"><strong>Status:</strong> {currentUserProfile.status || "active"}</p>
        {currentUserProfile.role === "chef" && (
          <p className="text-gray-600"><strong>Chef ID:</strong> {currentUserProfile.chefId || "Not assigned yet"}</p>
        )}

        {/* Request Buttons */}
        <div className="flex gap-4 mt-4">
          {/* Be a Chef button */}
          {currentUserProfile.role !== "chef" && currentUserProfile.role !== "admin" && (
            <button 
              onClick={() => handleRequest('chef')}
              disabled={requesting.chef || requestSent.chef}
              className={`px-4 py-2 rounded text-white transition 
                ${requestSent.chef ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {requestSent.chef ? 'Request Sent!' : requesting.chef ? 'Sending...' : 'Be a Chef'}
            </button>
          )}

          {/* Be an Admin button */}
          {currentUserProfile.role !== "admin" && (
            <button 
              onClick={() => handleRequest('admin')}
              disabled={requesting.admin || requestSent.admin}
              className={`px-4 py-2 rounded text-white transition 
                ${requestSent.admin ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {requestSent.admin ? 'Request Sent!' : requesting.admin ? 'Sending...' : 'Be an Admin'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
