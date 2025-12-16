import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import Swal from 'sweetalert2'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const PurchaseOrder = ({ closeModal, isOpen, meal }) => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const { register, handleSubmit, watch } = useForm()

  const quantity = watch('quantity') || 1
  const totalPrice = quantity * (meal?.price || 0)

  const { mutateAsync } = useMutation({
    mutationFn: async (orderData) => {
      const res = await axiosSecure.post('/order', orderData)
      return res.data
    }
  })

  const onSubmit = async () => {
    if (!user?.email) {
      return Swal.fire('Error', 'Please login first', 'error')
    }

    Swal.fire({
      title: `Your total price is $${totalPrice}`,
      text: 'Do you want to confirm the order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#84cc16', // lime
      cancelButtonColor: '#f97316', // orange
      confirmButtonText: 'Yes, Confirm Order',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const orderData = {
          mealName: meal?.foodName,
          price: totalPrice,
          quantity,
          chefName: meal?.chefName,
          chefId: meal?.chef?.uid || meal?.chefId,
          paymentStatus: 'pending',
          userEmail: user?.email,
          userAddress: watch('userAddress'),
          orderStatus: 'pending',
          orderTime: new Date().toISOString(),
          seller: {
            name: user?.displayName,
            email: user?.email
          }
        }

        try {
          await mutateAsync(orderData)
          Swal.fire('Order placed successfully!', '', 'success')
          closeModal()
        } catch (err) {
          Swal.fire('Error', 'Failed to place order', 'error')
          console.error(err)
        }
      }
    })
  }

  return (
    <Dialog open={isOpen} as='div' className='relative z-10 focus:outline-none' onClose={closeModal}>
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel className='w-full max-w-md bg-white p-6 rounded-2xl shadow-xl border border-lime-100'>

            <DialogTitle className='text-lg font-semibold text-center text-lime-600'>
              Confirm Your Order
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-3'>

              <p className='text-sm text-gray-700'>
                <span className='font-semibold text-orange-500'>Meal:</span> {meal?.foodName}
              </p>

              <p className='text-sm text-gray-700'>
                <span className='font-semibold text-orange-500'>Price:</span> ${meal?.price}
              </p>

              <p className='text-sm text-gray-700'>
                <span className='font-semibold text-orange-500'>Chef ID:</span> {meal?.chefId}
              </p>

              <p className='text-sm text-gray-700'>
                <span className='font-semibold text-orange-500'>User Email:</span> {user?.email}
              </p>

              <div>
                <label className='text-sm font-medium text-lime-600'>Quantity</label>
                <input
                  type='number'
                  min='1'
                  defaultValue={1}
                  {...register("quantity")}
                  className='w-full border border-lime-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400'
                />
              </div>

              <div>
                <label className='text-sm font-medium text-lime-600'>Delivery Address</label>
                <input
                  type='text'
                  placeholder='Enter your address'
                  {...register("userAddress", { required: true })}
                  className='w-full border border-lime-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400'
                />
              </div>

              <div className='flex justify-between pt-4'>
                <button
                  type='submit'
                  className='bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition'
                >
                  Confirm Order
                </button>

                <button
                  type='button'
                  onClick={closeModal}
                  className='bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition'
                >
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
