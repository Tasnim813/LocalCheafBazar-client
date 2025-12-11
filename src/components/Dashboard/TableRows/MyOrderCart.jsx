

const MyOrderCart = ({order}) => {

  console.log(order)
const {mealName,orderStatus,price,quantity,orderTime,chefName,chefId,paymentStatus}=order ||{}
  return (
    <div className="border rounded-lg shadow-md p-4 mb-4 bg-white">
      {/* Order Info */}
      <div className="flex items-center space-x-4">
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Food Name:{mealName}</h3>
          <p>Chef Name:{chefName}</p>
          <p>ChefId:{chefId}</p>
          <p>Order Status:{orderStatus} </p>
          <p>Price: ${price}</p>
          <p>Quantity: {quantity}</p>
          <p>Delivery Time: {orderTime}</p>
         <p>paymentStatus:{paymentStatus}</p>
         <button className="btn btn-primary">Pay</button>
         
        </div>
        
      </div>

      
    

    </div>
  )
}

export default MyOrderCart
