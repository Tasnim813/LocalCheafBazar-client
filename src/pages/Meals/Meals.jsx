import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import MealCart from './MealCart';

const Meals = () => {
    const [sortOrder, setSortOrder] = useState('asc'); // default ascending

    const { data: meals = [], refetch } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:3000/meals`);
            return result.data;
        }
    });

    // Sorting function
    const sortedMeals = [...meals].sort((a, b) => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sortedMeals.map(meal => (
                    <MealCart key={meal._id} meal={meal} />
                ))}
            </div>
        </div>
    );
};

export default Meals;
