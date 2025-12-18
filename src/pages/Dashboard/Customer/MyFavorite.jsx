import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const MyFavorite = () => {
    const { user } = useAuth();
    const { data: favorite = [], refetch,isLoading } = useQuery({
        queryKey: ['favorite', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const result = await axios.get(`https://localchefbazar-server-mauve.vercel.app/favorite/${user.email}`);
            return result.data;
        },
        enabled: !!user?.email,
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });
        if (!confirm.isConfirmed) return;

        try {
            await axios.delete(`https://localchefbazar-server-mauve.vercel.app/favorite/${id}`);
            refetch();
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

    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
     <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="p-4 bg-gradient-to-r from-lime-50 to-orange-50 rounded-2xl shadow-lg"
>
  <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500">
    My Favorite Meals
  </h2>

  {/* ================= DESKTOP TABLE ================= */}
  <div className="hidden md:block">
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gradient-to-r from-lime-200 to-orange-200 text-gray-800">
          <th className="p-2 border">Meal Name</th>
          <th className="p-2 border">Chef Name</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Date Added</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>

      <tbody>
        {favorite.map(fav => (
          <tr key={fav._id} className="text-center hover:bg-lime-50 transition">
            <td className="p-2 border">{fav.mealName}</td>
            <td className="p-2 border">{fav.chefName}</td>
            <td className="p-2 border">{fav.price || '-'}</td>
            <td className="p-2 border">
              {new Date(fav.addedTime).toLocaleString()}
            </td>
            <td className="p-2 border">
              <button
                onClick={() => handleDelete(fav._id)}
                className="px-3 py-1 bg-gradient-to-r from-lime-500 to-orange-500 text-white rounded hover:from-orange-500 hover:to-lime-500 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* ================= MOBILE CARD VIEW ================= */}
  <div className="md:hidden space-y-4">
    {favorite.map(fav => (
      <motion.div
        key={fav._id}
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl p-4 shadow-md border border-lime-200"
      >
        <h3 className="text-lg font-semibold text-gray-800">
          {fav.mealName}
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          👨‍🍳 <span className="font-medium">{fav.chefName}</span>
        </p>

        <p className="text-sm text-gray-600">
          💰 Price: {fav.price || '-'}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          📅 {new Date(fav.addedTime).toLocaleDateString()}
        </p>

        <button
          onClick={() => handleDelete(fav._id)}
          className="mt-3 w-full py-2 bg-gradient-to-r from-lime-500 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-lime-500 transition"
        >
          Delete
        </button>
      </motion.div>
    ))}

    {favorite.length === 0 && (
      <p className="text-center text-gray-500">
        No favorite meals yet.
      </p>
    )}
  </div>
</motion.div>

    );
};

export default MyFavorite;
