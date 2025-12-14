import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'
const AdminMenu = () => {
  return (
    <>
    <MenuItem
                icon={BsGraphUp}
                label='Statistics'
                address='/dashboard'
              />
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={FaUserCog} label='Manage Request' address='manage-request' />
    </>
  )
}

export default AdminMenu
