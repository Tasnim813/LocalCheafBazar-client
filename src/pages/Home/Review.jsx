import { motion } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const Review = () => {
    const { data: reviews = [], isLoading, isError } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const result = await axios.get('http://localhost:3000/review');
            return result.data;
        }
    });

    if (isLoading) return <p className="text-center text-red-600">Loading...</p>;
    if (isError) return <p className="text-center text-red-600">Failed to load reviews</p>;

    // Duplicate array for infinite scrolling
    const duplicatedReviews = [...reviews, ...reviews];

    return (
      <section className="relative py-8 overflow-hidden bg-orange-50">
    <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">User Reviews</h2>

    <div className="w-full overflow-hidden">
        <motion.div
            className="flex gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
            {duplicatedReviews.map((review, idx) => (
                <motion.div
                    key={idx}
                    className="min-w-[250px] bg-white p-4 rounded-lg shadow-md flex-shrink-0 hover:shadow-lg transition-shadow border border-orange-200"
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-orange-700">{review.reviewerName}</h3>
                        <img
                            className="w-10 h-10 rounded-full border-2 border-orange-300"
                            src={review.reviewerImage}
                            alt={review.reviewerName}
                        />
                    </div>
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                    <p className="text-sm text-orange-500 mt-1">Rating: {review.rating}/5</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(review.date).toLocaleDateString()}</p>
                </motion.div>
            ))}
        </motion.div>
    </div>
</section>


    );
};

export default Review;
