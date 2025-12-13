import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const ReviewSection = ({ foodId }) => {
    const {user}=useAuth()
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/reviews/${foodId}`)
      .then(res => setReviews(res.data));
  }, [foodId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      foodId,
      reviewerName: user?.displayName,
      reviewerImage: user?.photoURL,
      rating,
      comment,
      reviewerEmail: user.email,
    };

    const res = await axios.post(
      "http://localhost:3000/reviews",
      reviewData
    );

    if (res.data?.insertedId) {
      setReviews([
        {
          ...reviewData,
          _id: res.data.insertedId,
          date: new Date(),
        },
        ...reviews,
      ]);
      setComment("");
      alert("Review submitted successfully!");
    }
  };

  return (
    <div className="mt-10 ">
      <h2 className="text-2xl font-bold mb-4 text-center">Reviews</h2>

    <div className="grid grid-cols-3 gap-5">
          {reviews.map(review => (
        <div key={review._id} className="border p-4 mb-3 rounded">
          <div className="flex items-center gap-3">
            <img
              src={review.reviewerImage}
              className="w-10 h-10 rounded-full"
            />
            <h4 className="font-semibold">{review.reviewerName}</h4>
          </div>

          <p>⭐ {review.rating}</p>
          <p>{review.comment}</p>

          <small>
            {new Date(review.date).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="border w-full p-2"
          placeholder="Write your review"
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
          Give Review
        </button>
      </form>
    </div>
  );
};

export default ReviewSection;
