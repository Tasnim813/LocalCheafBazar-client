import { useQuery } from '@tanstack/react-query'
// import CustomerOrderDataRow from '../../../components/Dashboard/TableRows/CustomerOrderDataRow'
import axios from 'axios'
import useAuth from '../../../hooks/useAuth'
import MyOrderCart from '../../../components/Dashboard/TableRows/MyOrderCart'

const MyOrders = () => {
  const {user}=useAuth()
  const {data: orders=[]}=useQuery({
    queryKey:['orders'],
    queryFn:async()=>{
      const result=await axios(`http://localhost:3000/my-order/${user?.email}`)
      return result.data
    }
  })
  console.log(orders)
  return (
    <>
      <div className='container mx-auto px-4 sm:px-8 grid grid-cols-3'>
      
                {
                  orders.map(order=> <MyOrderCart key={order._id} order={order} /> )
                }
                 
               
      </div>
    </>
  )
}

export default MyOrders
