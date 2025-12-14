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
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col w-[500px] p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to PlantNet</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
                {...register('name', {
                  required: 'Name is required', maxLength: {
                    value: 20,
                    message: 'Name Cannot be Long'
                  }
                })}
              />
              {
                errors.name && (<p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>)
              }
            </div>
            {/* Image */}
            <div>
              <label
                htmlFor='image'
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                Profile Image
              </label>
              <input
                name='image'
                type='file'
                id='image'
                accept='image/*'
                className='block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-lime-50 file:text-lime-700
      hover:file:bg-lime-100
      bg-gray-100 border border-dashed border-lime-300 rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400
      py-2' {...register('image')}
              />
              <p className='mt-1 text-xs text-gray-400'>
                PNG, JPG or JPEG (max 2MB)
              </p>
            </div>
            {/* email */}
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'

                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0' {...register('email', {
                  required: 'Email is required', pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please Enter a valid Email Address'
                  }
                })}

              />
              {
                errors.email && (<p className='text-red-500 text-xs'>{errors.email.message}</p>)
              }
            </div>
             {/* Address*/}
             <div>
              <label htmlFor='text' className='block mb-2 text-sm'>
               Address
              </label>
              <input
                type='text'
               
                placeholder='Enter Your Address Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0' {...register('address', {
                  required: 'Address is required', 
                })}

              />
              {
                errors.address && (<p className='text-red-500 text-xs'>{errors.address.message}</p>)
              }
              
            </div>
            {/* password */}
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                        placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900' {...register('password', {
                  required: "password is required", minLength: {
                    value: 6, message: 'Password must be at least 6 character'
                  }
                })}
              />
              {
                errors.password && (<p className='text-red-500 text-xs'>{errors.password.message}</p>)
              }
            </div>
            {/* Confirm Password */}
            <div>
  <label className='text-sm mb-2'>Confirm Password</label>
  <input
    type='password'
    placeholder='*******'
    className='w-full px-3 py-2 border rounded-md border-gray-300'
    {...register('confirmPassword', {
      required: 'Confirm password is required',
      validate: (value) =>
        value === password || 'Password does not match',
    })}
  />

  {errors.confirmPassword && (
    <p className='text-red-500 text-xs'>
      {errors.confirmPassword.message}
    </p>
  )}
</div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-lime-500 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form> 
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-lime-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
