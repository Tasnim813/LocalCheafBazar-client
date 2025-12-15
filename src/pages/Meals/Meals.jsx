import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import MealCart from './MealCart';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Meals = () => {
    const axiosSecure = useAxiosSecure(); // JWT-enabled axios
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // এখন প্রতি page এ 8 meals দেখাবে

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['meals', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals?page=${currentPage}&limit=${itemsPerPage}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    if (isLoading) return <p>Loading...</p>;

    const sortedMeals = [...(data?.meals || [])].sort((a, b) => {
        if (sortOrder === 'asc') return a.price - b.price;
        return b.price - a.price;
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Meals</h1>

            {/* Sort Buttons */}
            <div className="flex gap-2 mb-4">
                <button
                    className={`px-3 py-1 rounded ${sortOrder === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSortOrder('asc')}
                >
                    Price: Low to High
                </button>
                <button
                    className={`px-3 py-1 rounded ${sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setSortOrder('desc')}
                >
                    Price: High to Low
                </button>
            </div>

            {/* Meals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedMeals.map(meal => (
                    <MealCart key={meal._id} meal={meal} />
                ))}
            </div>

            {/* Pagination Buttons */}
            <div className="flex gap-2 justify-center mt-4">
                {Array.from({ length: data?.totalPages || 0 }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Meals;
