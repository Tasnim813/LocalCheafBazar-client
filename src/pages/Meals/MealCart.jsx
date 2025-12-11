import React from 'react';
import { Link } from 'react-router';


const MealCart = ({meal}) => {
    console.log(meal)
    const{_id}=meal
    return (
        <div>
             <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden m-4">
            {/* Food Image */}
            <img 
                src={meal.foodImage} 
                alt={meal.foodName} 
                className="w-full h-48 object-cover"
            />

            <div className="p-4">
                {/* Food Name */}
                <h2 className="text-lg font-bold">{meal.foodName}</h2>

                {/* Chef Info */}
                <p className="text-gray-600">Chef: {meal.chefName}</p>
                <p className="text-gray-600">Chef ID: {meal.chefId}</p>

                {/* Price & Rating */}
                <p className="text-gray-800 font-semibold mt-2">Price: ${meal.price}</p>
                <p className="text-yellow-500">Rating: {meal.rating || 0} ⭐</p>

                {/* Delivery Area (dummy, can replace with meal.deliveryArea) */}
                <p className="text-gray-500 mt-1">Delivery Area: {meal.deliveryArea || 'All Dhaka'}</p>

                {/* See Details Button */}
                < Link   to={`/meal-details/${_id}`}
                  
                    className="btn  w-full bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition"
                >
                    See Details
                </Link>
            </div>
        </div>
        </div>
    );
};

export default MealCart;