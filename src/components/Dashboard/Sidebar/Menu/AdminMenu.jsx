import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'
import { ImCart } from "react-icons/im";
const AdminMenu = () => {
  return (
    <>
    <MenuItem
                icon={BsGraphUp}
                label='Statistics'
                address='static-page'
              />
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={ImCart} label='Manage Request' address='manage-request' />
    </>
  )
}

export default AdminMenu
