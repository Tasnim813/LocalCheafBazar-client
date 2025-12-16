import React from 'react';

const DisplayCart = ({review}) => {
    return (
        <div
        key={review._id}
        className="border border-orange-300 w-full p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition"
      >
        <div className="flex items-center gap-3">
          <img
            src={review.reviewerImage}
            className="w-10 h-10 rounded-full border-2 border-lime-500"
            alt={review.reviewerName}
          />
          <h4 className="font-semibold text-gray-900">
            {review.reviewerName}
          </h4>
        </div>

        <p className="text-lime-600 font-semibold mt-1">
          ⭐ {review.rating}
        </p>

        <p className="text-gray-800 mt-1">
          {review.comment}
        </p>

        <small className="text-gray-600">
          {new Date(review.date).toLocaleDateString()}
        </small>
      </div>
    );
};

export default DisplayCart;