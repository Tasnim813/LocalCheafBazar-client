import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import { saveOrUpdateUser } from '../../utillis'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const { signIn, loading, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state || '/'

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />

  const onSubmit = async (data) => {
    const { email, password } = data

    try {
      // loading alert
      Swal.fire({
        title: 'Logging in...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      await signIn(email, password)

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back 🎉',
        timer: 2000,
        showConfirmButton: false,
      })

      navigate(from, { replace: true })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err?.message || 'Something went wrong',
      })
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-lime-50 to-orange-50'>
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className='flex flex-col w-[500px] p-6 rounded-xl sm:p-10 bg-white text-gray-800 shadow-lg'
  >
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className='mb-8 text-center'
    >
      <h1 className='my-3 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500'>
        Log In
      </h1>
      <p className='text-sm text-gray-500'>
        Sign in to access your account
      </p>
    </motion.div>

    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='space-y-4'>
        <div>
          <label className='block mb-2 text-sm text-gray-700'>
            Email address
          </label>
          <input
            type='email'
            placeholder='Enter Your Email Here'
            className='w-full px-3 py-2 border rounded-md border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400'
            {...register('email', { required: true })}
          />
        </div>

        <div>
          <label className='block mb-2 text-sm text-gray-700'>
            Password
          </label>
          <input
            type='password'
            placeholder='*******'
            className='w-full px-3 py-2 border rounded-md border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400'
            {...register('password', { required: true })}
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type='submit'
        className='w-full py-3 rounded-md font-semibold text-white bg-gradient-to-r from-lime-500 to-orange-500 hover:from-lime-600 hover:to-orange-600 transition'
      >
        {loading ? (
          <TbFidgetSpinner className='animate-spin m-auto' />
        ) : (
          'Continue'
        )}
      </motion.button>
    </form>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className='px-6 mt-6 text-sm text-center text-gray-600'
    >
      Don&apos;t have an account yet?{' '}
      <Link
        state={from}
        to='/signup'
        className='font-medium bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500 hover:underline'
      >
        Sign up
      </Link>
    </motion.p>
  </motion.div>
</div>

  )
}

export default Login
