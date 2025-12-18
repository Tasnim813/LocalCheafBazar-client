import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DisplayCart from "./DisplayCart";
import Container from "../../components/Shared/Container";

const ReviewSection = ({ foodId, meal }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // fetch reviews
  useEffect(() => {
    axios
      .get(`https://localchefbazar-server-mauve.vercel.app/reviews/${foodId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, [foodId]);

  // submit review
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

    try {
      const res = await axios.post(
        "https://localchefbazar-server-mauve.vercel.app/reviews",
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
        Swal.fire("Success", "Review submitted successfully!", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  // add favorite
  const handleFavorite = async () => {
    if (!user?.email) {
      return Swal.fire("Error", "Please login first!", "error");
    }

    const favoriteData = {
      email: user.email,
      mealId: meal._id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
      addedTime: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/favorite", favoriteData);
      Swal.fire("Success", "Meal added to favorites!", "success");
    } catch (error) {
      console.error(error.response?.data || error.message);
      Swal.fire(
        "Error",
        error.response?.data?.msg || "Already added or error occurred!",
        "error"
      );
    }
  };

  return (
   
      <div className="mt-10 px-3 sm:px-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Reviews</h2>

        {/* Reviews Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
          "
        >
          {reviews.map((review) => (
            <DisplayCart key={review._id} review={review} />
          ))}
        </div>

        {/* Review Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4  mx-auto"
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="
              border border-gray-300 rounded-lg
              w-full p-4 text-gray-700
              focus:outline-none focus:ring-2
              focus:ring-blue-400
              transition
            "
            placeholder="Write your review"
            required
            rows={4}
          />

          <button
            type="submit"
            className="
              bg-blue-600 hover:bg-blue-700 text-white
              px-6 py-2 rounded-lg shadow-md
              transition transform hover:-translate-y-1
              w-full sm:w-[200px]
            "
          >
            Give Review
          </button>
        </form>

        {/* Favorite Button */}
        <div className=" mx-auto">
          <button
            onClick={handleFavorite}
            className="
              mt-4 bg-orange-500 hover:bg-orange-600 text-white
              px-6 py-2 rounded-lg shadow-md
              transition transform hover:-translate-y-1
              w-full sm:w-[200px]
            "
          >
            Add to Favorites
          </button>
        </div>
      </div>
    
  );
};

export default ReviewSection;
