import React from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'

const MealCart = ({ meal }) => {
  const { _id } = meal

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden m-4 border border-gray-100"
    >
      {/* Food Image */}
      <motion.img
        src={meal.foodImage}
        alt={meal.foodName}
        className="w-full h-48 object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />

      <div className="p-4">
        {/* Food Name */}
        <h2 className="text-lg font-bold text-lime-600">
          {meal.foodName}
        </h2>

        {/* Chef Info */}
        <p className="text-gray-700">Chef: {meal.chefName}</p>
        <p className="text-gray-700">Chef ID: {meal.chefId}</p>

        {/* Price & Rating */}
        <p className="text-gray-900 font-semibold mt-2">
          Price: ${meal.price}
        </p>
        <p className="text-orange-400">
          Rating: {meal.rating || 0} ⭐
        </p>

        {/* Delivery Area */}
        <p className="text-gray-500 mt-1">
          Delivery Area: {meal.deliveryArea || 'All Dhaka'}
        </p>

        {/* See Details Button */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <Link
            to={`/meal-details/${_id}`}
            className="btn w-full bg-gradient-to-r from-lime-500 to-orange-500 text-white font-semibold py-2  rounded hover:from-lime-600 hover:to-orange-600 transition"
          >
            See Details
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MealCart
