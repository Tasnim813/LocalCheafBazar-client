import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const MyFavorite = () => {
    const { user } = useAuth();
    const { data: favorite = [], refetch } = useQuery({
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
                            <td className="p-2 border">{new Date(fav.addedTime).toLocaleString()}</td>
                            <td className="p-2 border">
                                <button
                                    className="px-3 py-1 bg-gradient-to-r from-lime-500 to-orange-500 text-white rounded hover:from-orange-500 hover:to-lime-500 transition-all duration-300"
                                    onClick={() => handleDelete(fav._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {favorite.length === 0 && (
                        <tr>
                            <td colSpan="5" className="p-2 text-center text-gray-500">
                                No favorite meals yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </motion.div>
    );
};

export default MyFavorite;
