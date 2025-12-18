import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AiOutlineMenu } from 'react-icons/ai';
import Container from '../Container';
import useAuth from '../../../hooks/useAuth';
import avatarImg from '../../../assets/images/placeholder.jpg';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const links = (
    <>
      <NavLink
        to='/'
        className={({ isActive }) =>
          `mr-4 font-medium ${
            isActive
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500'
              : 'text-gray-800'
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to='/meals'
        className={({ isActive }) =>
          `mr-4 font-medium ${
            isActive
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500'
              : 'text-gray-800'
          }`
        }
      >
        Meals
      </NavLink>
      {user && (
        <NavLink
          to='/dashboard'
          className={({ isActive }) =>
            `mr-4 font-medium ${
              isActive
                ? 'bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500'
                : 'text-gray-800'
            }`
          }
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <Container>
        <div className='navbar bg-base-100'>
          {/* Navbar Start */}
          <div className='navbar-start'>
            {/* Mobile Dropdown */}
            <div className='dropdown'>
              <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
                <AiOutlineMenu className='h-5 w-5' />
              </div>
              <ul
                tabIndex={-1}
                className='menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow'
              >
                <li>{links}</li>
                {!user && (
                  <>
                    <li>
                      <Link
                        to='/login'
                        className='px-4 py-2 rounded-md bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500'
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/signup'
                        className='px-4 py-2 rounded-md bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500'
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
                {user && (
                  <li>
                    <div
                      onClick={logOut}
                      className='cursor-pointer px-4 py-2 rounded-md bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500'
                    >
                      Logout
                    </div>
                  </li>
                )}
              </ul>
            </div>

            {/* Logo */}
            <Link
              to='/'
              className='text-2xl md:text-3xl font-bold flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500'
            >
              <img
                className='w-10 h-10'
                src='https://i.ibb.co.com/ymfctdJV/chef-restaurant5078-logowik-com.webp'
                alt='Logo'
              />
              <span className='hidden md:block' >LocalChefBazar</span>
            </Link>
          </div>

          {/* Navbar Center (Desktop Links) */}
          <div className='navbar-center hidden lg:flex'>
            <div className='flex items-center space-x-4'>{links}</div>
          </div>

          {/* Navbar End */}
          <div className='navbar-end relative'>
            {user ? (
              <div
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center gap-2 p-2 border border-gray-200 rounded-full cursor-pointer hover:shadow-md transition'
              >
                <img
                  src={user.photoURL || avatarImg}
                  alt='profile'
                  className='w-8 h-8 rounded-full'
                  referrerPolicy='no-referrer'
                />
                <AiOutlineMenu className='md:hidden' />
              </div>
            ) : (
              <div className='hidden md:flex gap-2'>
                <Link
                  to='/login'
                  className='px-4 py-2 border border-lime-500 rounded-md text-lime-500 hover:bg-gradient-to-r hover:from-lime-500 hover:to-orange-500 hover:text-white transition'
                >
                  Login
                </Link>
                <Link
                  to='/signup'
                  className='px-4 py-2 border border-lime-500 rounded-md text-lime-500 hover:bg-gradient-to-r hover:from-lime-500 hover:to-orange-500 hover:text-white transition'
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Dropdown Menu for logged in user */}
            {isOpen && user && (
              <div className='absolute right-0 top-12 w-40 bg-white shadow-md rounded-xl overflow-hidden z-50'>
                <Link
                  to='/dashboard'
                  className='block px-4 py-2 hover:bg-neutral-100 transition bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500'
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <div
                  onClick={logOut}
                  className='block px-4 py-2 hover:bg-neutral-100 transition cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500'
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
