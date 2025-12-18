import { Link, useLocation, useNavigate } from 'react-router'
// import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import { saveOrUpdateUser, UploadImage } from '../../utillis'
// import axios from 'axios'

const SignUp = () => {
  const { createUser, updateUserProfile,  loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  // React hook form
  const { register, handleSubmit,watch, formState: { errors } } = useForm()
  console.log(errors)
  const password = watch('password')
  const onSubmit = async (data) => {
  const { name, image, email, password, address } = data
  const imagePic = image[0]

  try {
    const imageURL = await UploadImage(imagePic)

    // 1. Firebase user create
    const result = await createUser(email, password)

    // 2. Save user to DB (WITH address)
    await saveOrUpdateUser({
      name,
      email,
      image: imageURL,
      address,
    })

    // 3. Update firebase profile
    await updateUserProfile(name, imageURL)

    navigate(from, { replace: true })
    toast.success('Signup Successful')
  } catch (err) {
    console.log(err)
    toast.error(err?.message)
  }
}





  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-lime-50 to-orange-50'>
  <div className='flex flex-col w-[500px] p-6 rounded-xl sm:p-10 bg-white text-gray-800 shadow-lg'>

    <div className='mb-8 text-center'>
      <h1 className='my-3 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500'>
        Sign Up
      </h1>
      <p className='text-sm text-gray-500'>Welcome to LocalChefBazar</p>
    </div>

    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6'
    >
      <div className='space-y-4'>
        {/* Name */}
        <div>
          <label className='block mb-2 text-sm text-gray-700'>Name</label>
          <input
            type='text'
            placeholder='Enter Your Name Here'
            className='w-full px-3 py-2 border rounded-md border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-lime-400 focus:border-lime-400'
            {...register('name')}
          />
          {errors.name && (
            <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className='block mb-2 text-sm text-gray-700'>
            Profile Image
          </label>
          <input
            type='file'
            accept='image/*'
            className='block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-lime-50 file:text-lime-700
              hover:file:bg-lime-100
              bg-white border border-dashed border-lime-300 rounded-md
              focus:ring-2 focus:ring-lime-400 py-2'
            {...register('image')}
          />
          <p className='mt-1 text-xs text-gray-400'>
            PNG, JPG or JPEG (max 2MB)
          </p>
        </div>

        {/* Email */}
        <div>
          <label className='block mb-2 text-sm text-gray-700'>
            Email address
          </label>
          <input
            type='email'
            placeholder='Enter Your Email Here'
            className='w-full px-3 py-2 border rounded-md border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-lime-400 focus:border-lime-400'
            {...register('email')}
          />
          {errors.email && (
            <p className='text-red-500 text-xs'>{errors.email.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className='block mb-2 text-sm text-gray-700'>Address</label>
          <input
            type='text'
            placeholder='Enter Your Address Here'
            className='w-full px-3 py-2 border rounded-md border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-lime-400 focus:border-lime-400'
            {...register('address')}
          />
          {errors.address && (
            <p className='text-red-500 text-xs'>{errors.address.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className='block mb-2 text-sm text-gray-700'>Password</label>
          <input
            type='password'
            placeholder='*******'
            className='w-full px-3 py-2 border rounded-md border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-lime-400 focus:border-lime-400'
            {...register('password')}
          />
          {errors.password && (
            <p className='text-red-500 text-xs'>{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className='block mb-2 text-sm text-gray-700'>
            Confirm Password
          </label>
          <input
            type='password'
            placeholder='*******'
            className='w-full px-3 py-2 border rounded-md border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-lime-400 focus:border-lime-400'
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className='text-red-500 text-xs'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* Button */}
      <button
        type='submit'
        className='w-full py-3 rounded-md font-semibold text-white bg-gradient-to-r from-lime-500 to-orange-500 hover:from-lime-600 hover:to-orange-600 transition'
      >
        {loading ? (
          <TbFidgetSpinner className='animate-spin m-auto' />
        ) : (
          'Continue'
        )}
      </button>
    </form>

    <p className='px-6 mt-6 text-sm text-center text-gray-600'>
      Already have an account?{' '}
      <Link
        to='/login'
        className='font-medium bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500 hover:underline'
      >
        Login
      </Link>
    </p>
  </div>
</div>

  )
}

export default SignUp
