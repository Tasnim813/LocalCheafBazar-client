import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { motion } from "framer-motion"

const MyOrderCart = ({ order }) => {
  const axiosSecure = useAxiosSecure() // JWT-enabled axios
  const { user } = useAuth()
  const {
    _id,
    mealName,
    orderStatus,
    price,
    quantity,
    orderTime,
    chefName,
    chefId,
    paymentStatus,
  } = order || {}

  const handlePayment = async () => {
    if (!mealName || !price || !quantity || !user?.email) {
      return alert("Missing payment info!")
    }

    const totalPrice = Number(price) * Number(quantity)
    const paymentInfo = {
      orderId: _id,
      mealName,
      price: totalPrice,
      quantity: Number(quantity),
      customer: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
    }

    try {
      const { data } = await axiosSecure.post("/create-checkout-session", paymentInfo)
      window.location.href = data.url
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message)
      alert("Payment failed. Check console.")
    }
  }

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border rounded-2xl shadow-xl p-6 mb-6 bg-gradient-to-r from-lime-100 to-orange-100 hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105"
    >
      <div className="flex items-start space-x-6">
        <div className="flex-1">
          <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500 mb-2">
            🍽 {mealName}
          </h3>
          <p className="text-gray-700 mb-1">👨‍🍳 Chef: {chefName}</p>
          <p className="text-gray-700 mb-1">ID: {chefId}</p>
          <p className="mb-1">
            Order Status:{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor[orderStatus] || "bg-gray-200 text-gray-800"}`}
            >
              {orderStatus}
            </span>
          </p>
          <p className="text-gray-700 mb-1">💲 Price: ${price}</p>
          <p className="text-gray-700 mb-1">🔢 Quantity: {quantity}</p>
          <p className="text-gray-700 mb-1">🕒 Delivery Time: {orderTime}</p>
          <p className="mb-3">
            Payment Status:{" "}
            {paymentStatus === "paid" ? (
              <span className="text-green-600 font-bold">Paid ✅</span>
            ) : (
              <button
                onClick={handlePayment}
                className="px-5 py-2 bg-gradient-to-r from-lime-500 to-orange-500 text-white font-semibold rounded-xl hover:from-orange-500 hover:to-lime-500 transition-all duration-300 shadow-md"
              >
                Pay Now
              </button>
            )}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default MyOrderCart
