import axios from "axios"
import useAuth from "../../../hooks/useAuth"


const MyOrderCart = ({order}) => {
  const {user}=useAuth()
  const {_id,mealName,orderStatus,price,quantity,orderTime,chefName,chefId,paymentStatus}=order ||{}
  // const handlePayment=async()=>{
    
  //   const paymentInfo={
  //     orderId:_id,
  //     mealName,
  //     price,
  //     quantity,
  //     paymentStatus,
  //     orderStatus,
  //     orderTime,
  //     customer:{
  //       name:user?.displayName,
  //       email:user?.email,
  //       image:user?.photoURL

  //     }
  //   }
  //   const {data}= await axios.post(`http://localhost:3000/create-checkout-session`,paymentInfo)
  //   console.log(data.url)
  //   window.location.href=data.url

  // }
  const handlePayment = async () => {
  if (!mealName || !price || !quantity || !user?.email) {
    return alert("Missing payment info!");
  }
const totalPrice = Number(price) * Number(quantity);
  const paymentInfo = {
    orderId: _id,
    mealName,
    price: totalPrice,       // ensure number
    quantity: Number(quantity), // ensure number
    customer: {
      name: user.displayName,
      email: user.email,
      image: user.photoURL
    }
  };

  try {
    const { data } = await axios.post(
      "http://localhost:3000/create-checkout-session",
      paymentInfo
    );
    console.log("Stripe URL:", data.url);
    window.location.href = data.url;
  } catch (err) {
    console.error("Payment error:", err.response?.data || err.message);
    alert("Payment failed. Check console.");
  }
};

  
  


  return (
        <div className="border rounded-xl shadow-lg p-6 mb-6 bg-white hover:shadow-2xl transition-shadow duration-300">
      {/* Order Info */}
      <div className="flex items-center space-x-6">
        

        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-1">Food Name: {mealName}</h3>
          <p className="text-gray-600 mb-1">Chef Name: {chefName}</p>
          <p className="text-gray-600 mb-1">Chef ID: {chefId}</p>
          <p className="text-gray-600 mb-1">
            Order Status:{" "}
            <span className={`px-2 py-1 rounded-full text-sm font-semibold ${
              orderStatus === "pending"
                ? "bg-yellow-200 text-yellow-800"
                : orderStatus === "accepted"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}>
              {orderStatus}
            </span>
          </p>
          <p className="text-gray-600 mb-1">Price: ${price}</p>
          <p className="text-gray-600 mb-1">Quantity: {quantity}</p>
          <p className="text-gray-600 mb-1">Delivery Time: {orderTime}</p>
          <p className="text-gray-600 mb-3">Payment Status: {paymentStatus}</p>

          {/* <button onClick={handlePayment} className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
            Pay

          </button> */}
              <p className="text-gray-600 mb-3">
            Payment Status:{" "}
            {paymentStatus === "paid" ? (
              <span className="text-green-600 font-bold">Paid</span>
            ) : (
              <button
                onClick={handlePayment}
                className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                Pay
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MyOrderCart
