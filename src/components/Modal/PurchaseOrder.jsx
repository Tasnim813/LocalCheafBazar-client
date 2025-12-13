import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import Swal from 'sweetalert2'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'


const PurchaseOrder = ({ closeModal, isOpen, meal }) => {
  const { user } = useAuth()

  const { register, handleSubmit, watch } = useForm()

  const quantity = watch('quantity') || 1
  const totalPrice = quantity * meal?.price

 
  const { mutateAsync } = useMutation({
    mutationFn: async (orderData) => {
      const res = await axios.post("http://localhost:3000/order", orderData)
      return res.data
    }
  })

  // ===== SUBMIT =====
  const onSubmit = async () => {
    Swal.fire({
      title: `Your total price is $${totalPrice}`,
      text: 'Do you want to confirm the order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Confirm Order',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {

        // const orderData = {
        //   mealName: meal?.foodName,
        //   price: totalPrice,
        //   quantity: quantity,
        //   chefName:meal?.chefName,
        //   chefId: meal?.chefId,
        //   paymentStatus: 'pending',
        //   userEmail: user?.email,
        //   userAddress: watch('userAddress'),
        //   orderStatus: 'pending',
        //   orderTime: new Date().toISOString(),
        //   seller:{
        //     name:user?.displayName,
        //     email:user?.email

        //   }
        
        // }
        const orderData = {
  mealName: meal?.foodName,
  price: totalPrice,
  quantity: quantity,
  chefName: meal?.chefName,
  chefId: meal?.chef?.uid || meal?.chefId,  // <-- UID পাঠাচ্ছি
  paymentStatus: 'pending',
  userEmail: user?.email,
  userAddress: watch('userAddress'),
  orderStatus: 'pending',
  orderTime: new Date().toISOString(),
  seller:{
    name: user?.displayName,
    email: user?.email
  }
}

        console.log("Saving order:", orderData)

        // SAVE TO DATABASE
        await mutateAsync(orderData)
      

        Swal.fire('Order placed successfully!', '', 'success')
        closeModal()
      }
    })
  }

  return (
    <Dialog open={isOpen} as='div' className='relative z-10 focus:outline-none' onClose={closeModal}>
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel className='w-full max-w-md bg-white p-6 rounded-2xl shadow-xl'>

            <DialogTitle className='text-lg font-semibold text-center text-gray-900'>
              Confirm Your Order
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-3'>

              <p className='text-sm text-gray-600'><strong>Meal:</strong> {meal?.foodName}</p>
              <p className='text-sm text-gray-600'><strong>Price:</strong> ${meal?.price}</p>
              <p className='text-sm text-gray-600'><strong>Chef ID:</strong> {meal?.chefId}</p>
              <p className='text-sm text-gray-600'><strong>User Email:</strong> {user?.email}</p>

              <div>
                <label className='text-sm font-medium'>Quantity</label>
                <input type='number' min='1' defaultValue={1} {...register("quantity")}
                  className='w-full border p-2 rounded-md' />
              </div>

              <div>
                <label className='text-sm font-medium'>Delivery Address</label>
                <input type='text' placeholder='Enter your address'
                  {...register("userAddress", { required: true })}
                  className='w-full border p-2 rounded-md' />
              </div>

              <div className='flex justify-between pt-4'>
                <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600'>
                  Confirm Order
                </button>
                <button type='button' onClick={closeModal}
                  className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'>
                  Cancel
                </button>
              </div>

            </form>

          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default PurchaseOrder
