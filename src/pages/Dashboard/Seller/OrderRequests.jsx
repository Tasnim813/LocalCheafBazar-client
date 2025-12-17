import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";

const OrderRequests = () => {
  const { user } = useAuth();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["chefOrders", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axios.get(
        `https://localchefbazar-server-mauve.vercel.app/chef-orders/${user.uid}`
      );
      return res.data;
    },
  });
  console.log("requst", orders);

  const updateStatus = async (id, status) => {
    await axios.patch(
      `https://localchefbazar-server-mauve.vercel.app/order-status/${id}`,
      { orderStatus: status }
    );
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">Order Requests</h2>

      {orders.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No orders yet.</p>
      )}

      {orders.map((order) => {
        const isPending = order.orderStatus === "pending";
        const isAccepted = order.orderStatus === "accepted";

        return (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border rounded-lg p-4 mb-4 shadow bg-gradient-to-r from-lime-50 to-orange-50 hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-purple-700">{order.mealName}</h3>

            <p className="mt-1">
              <strong>Price:</strong> {order.price}৳
            </p>
            <p>
              <strong>Quantity:</strong> {order.quantity}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  order.orderStatus === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.orderStatus === "accepted"
                    ? "bg-green-100 text-green-800"
                    : order.orderStatus === "delivered"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.orderStatus}
              </span>
            </p>
            <p>
              <strong>User Email:</strong> {order.userEmail}
            </p>
            <p>
              <strong>Address:</strong> {order.userAddress}
            </p>
            <p>
              <strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}
            </p>
            <p>
              <strong>Payment:</strong> {order.paymentStatus}
            </p>

            <div className="flex gap-3 mt-3">
              <button
                disabled={!isPending}
                onClick={() => updateStatus(order._id, "cancelled")}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Cancel
              </button>

              <button
                disabled={!isPending || order.paymentStatus !== "paid"}
                onClick={() => updateStatus(order._id, "accepted")}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Accept
              </button>

              <button
                disabled={!isAccepted}
                onClick={() => updateStatus(order._id, "delivered")}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Deliver
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OrderRequests;
