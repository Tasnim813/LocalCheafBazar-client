import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { useState } from 'react'
import BecomeSellerModal from '../../../Modal/BecomeSellerModal'
const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Orders' address='my-orders' />


      <MenuItem icon={BsFingerprint} label='Favorite Meal' address='favorite-meal' />

      <MenuItem icon={BsFingerprint} label='My Review' address='my-review' />

     

      

   
    </>
  )
}

export default CustomerMenu
