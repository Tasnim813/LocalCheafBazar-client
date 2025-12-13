import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";


const OrderRequests = () => {
    const {user}=useAuth()
 

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["chefOrders", user?.uid],
    enabled: !!user?.uid,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/chef-orders/${user.uid}`
      );
      return res.data;
    },
  });
  console.log('requst',orders)

  const updateStatus = async (id, status) => {
    await axios.patch(
      `http://localhost:3000/order-status/${id}`,
      { orderStatus: status }
    );
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Requests</h2>

      {orders.map((order) => {
        const isPending = order.orderStatus === "pending";
        const isAccepted = order.orderStatus === "accepted";

        return (
          <div
            key={order._id}
            className="border rounded-lg p-4 mb-4 shadow bg-white"
          >
            <h3 className="text-lg font-semibold">{order.mealName}</h3>

            <p>Price: {order.price}৳</p>
            <p>Quantity: {order.quantity}</p>
            <p>Status: <b>{order.orderStatus}</b></p>
            <p>User Email: {order.userEmail}</p>
            <p>Address: {order.userAddress}</p>
            <p>Order Time: {new Date(order.orderTime).toLocaleString()}</p>
            <p>Payment: {order.paymentStatus}</p>

            <div className="flex gap-3 mt-3">
              <button
                disabled={!isPending}
                onClick={() => updateStatus(order._id, "cancelled")}
                className="btn btn-error"
              >
                Cancel
              </button>

              <button
                disabled={!isPending || order.paymentStatus !== "paid"}
                onClick={() => updateStatus(order._id, "accepted")}
                className="btn btn-success"
              >
                Accept
              </button>

              <button
                disabled={!isAccepted}
                onClick={() => updateStatus(order._id, "delivered")}
                className="btn btn-primary"
              >
                Deliver
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderRequests;
