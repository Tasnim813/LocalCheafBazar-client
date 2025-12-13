import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const MyReview = () => {
    const {user}=useAuth()
    const { data: review = [] } = useQuery({
    queryKey: ['my-review', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axios.get(
        `http://localhost:3000/my-review/${user.email}`
      );
      return result.data;
    },
  });

    console.log(review)
    return (
        <div className="max-w-4xl mx-auto p-4">
    <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

    {review.length === 0 && (
      <p className="text-gray-500">You have not added any reviews yet.</p>
    )}

    {review.map(r => (
      <div
        key={r._id}
        className="border rounded-lg p-4 mb-4 shadow-sm bg-white"
      >
        {/* Food Info (optional if you add later) */}
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-lg">⭐ {r.rating} / 5</p>
          <small className="text-gray-500">
            {new Date(r.date).toLocaleDateString()}
          </small>
        </div>

        {/* Comment */}
        <p className="text-gray-700 mb-3">{r.comment}</p>

        {/* Action buttons (future use) */}
        <div className="flex gap-3">
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
            Edit
          </button>
          <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
    );
};

export default MyReview;