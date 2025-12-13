import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyFavorite = () => {
    const {user}=useAuth()
     const { data: favorite = [], refetch } = useQuery({
  queryKey: ['favorite', user?.email], 
  queryFn: async () => {
    if (!user?.email) return []; 
    const result = await axios.get(`http://localhost:3000/favorite/${user.email}`);
    return result.data; 
  },
  enabled: !!user?.email, 
});


const handleDelete = async (id) => {
  // 1️⃣ Show confirmation before delete
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  if (!confirm.isConfirmed) return; // যদি cancel করে, তাহলে return

  try {
    // 2️⃣ Send DELETE request to backend
    const res = await axios.delete(`http://localhost:3000/favorite/${id}`);

    // 3️⃣ Refetch favorite meals
    refetch();

    // 4️⃣ Success messages
    Swal.fire({
      title: "Deleted!",
      text: "Your meal has been removed from favorites.",
      icon: "success"
    });
   

  } catch (err) {
    console.error(err);
    toast.error('Failed to delete favorite meal.');
  }
};   
    
     console.log(favorite)
    return (
          <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Favorite Meals</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Meal Name</th>
            <th className="p-2 border">Chef Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Date Added</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {favorite.map(fav => (
            <tr key={fav._id}>
              <td className="p-2 border">{fav.mealName}</td>
              <td className="p-2 border">{fav.chefName}</td>
              <td className="p-2 border">{fav.price || '-'}</td>
              <td className="p-2 border">{new Date(fav.addedTime).toLocaleString()}</td>
              <td className="p-2 border">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(fav._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {favorite.length === 0 && (
            <tr>
              <td colSpan="5" className="p-2 text-center">No favorite meals yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    );
};

export default MyFavorite;