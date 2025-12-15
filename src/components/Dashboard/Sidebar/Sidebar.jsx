import { useState } from 'react'

import useAuth from '../../../hooks/useAuth'


// Icons
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'

// Menus
import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import SellerMenu from './Menu/SellerMenu'
import CustomerMenu from './Menu/CustomerMenu'
import useRole from '../../../hooks/useRole'
import { Link } from 'react-router'

const PRIMARY_GRADIENT = 'linear-gradient(90deg, #F97316, #FB923C)'

const Sidebar = () => {
  const [role, isRoleLoading] = useRole()
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)

  return (
    <>
      {/* Mobile Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between items-center md:hidden'>
        <Link
          to='/'
          className='flex items-center gap-2 p-4 text-2xl font-bold'
          style={{
            background: PRIMARY_GRADIENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <img
            className='w-10 h-10 bg-none'
            src='https://i.ibb.co/ymfctdJV/chef-restaurant5078-logowik-com.webp'
            alt='logo'
          />
          <p>LocalChefBazar</p>
        </Link>

        <button
          onClick={() => setActive(!isActive)}
          className='p-4 focus:outline-none'
        >
          <AiOutlineBars className='h-6 w-6' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-100 px-3 py-4 transform transition-transform duration-300
        ${isActive ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0`}
      >
        <div className='flex flex-col h-full justify-between'>
          {/* Top */}
          <div>
            <div className='hidden md:flex justify-center  rounded-lg  shadow'>
              <Link
                to='/'
                className='flex items-center gap-2 text-2xl font-bold'
                style={{
                  background: PRIMARY_GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <img
                  className='w-10 h-10 bg-none'
                  src='https://i.ibb.co/ymfctdJV/chef-restaurant5078-logowik-com.webp'
                  alt='logo'
                />
                LocalChefBazar
              </Link>
            </div>

            {/* Profile */}
            <div className='mt-4'>
              <MenuItem
                icon={FcSettings}
                label='Profile'
                address='/dashboard'
              />
            </div>

            {/* Role Menus */}
            {!isRoleLoading && (
              <nav className='mt-2 space-y-1'>
                {role === 'customer' && <CustomerMenu />}
                {role === 'chef' && <SellerMenu />}
                {role === 'admin' && <AdminMenu />}
              </nav>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={logOut}
            className='flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-300 rounded-md transition'
          >
            <GrLogout className='w-5' />
            <span className='font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
