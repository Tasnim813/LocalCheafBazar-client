import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'

const CustomerMenu = () => {
  
  return (
    <>
      <MenuItem icon={BsFingerprint} label='My Orders' address='my-orders' />


      <MenuItem icon={BsFingerprint} label='Favorite Meal' address='favorite-meal' />

      <MenuItem icon={BsFingerprint} label='My Review' address='my-review' />

     

      

   
    </>
  )
}

export default CustomerMenu
