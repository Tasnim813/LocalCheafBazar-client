import React from 'react';
import ReviewSection from './ReviewSection';

const FoodDetail = ({meal}) => {
    return (
         <div>
      <h1>{meal.name}</h1>

      {/* Review Section */}
      <ReviewSection foodId={meal._id} />
    </div>
    );
};

export default FoodDetail;

