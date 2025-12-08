import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import useAuth from '../../hook/useAuth';
const SignUp = () => {
      const{creatuser}=useAuth()
    const {register,handleSubmit,watch,formState:{errors}}=useForm()
  
    const password = watch("password");
    const handleRegister=async (data)=>{
        const{email,password}=data
      try{
        const result= await creatuser(email,password)
        console.log(result)

      }catch(err){
        console.log(err)
      }
    }

    return (
         <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col w-[400px] p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className=' text-center'>
          <h1 className=' text-4xl font-bold'>Sign Up</h1>
          
        </div>
        <form onSubmit={handleSubmit(handleRegister)}
          
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
               id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
             {...register("name",{
                required:'Name is required'
             })}   
              />
              {
                errors.name && (<p className='text-red-500'>{errors.name.message}</p>)
              }
              
            </div>
            {/* email */}
             <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
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
                errors.email && (<p className='text-red-500'>{errors.email.message}</p>)
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
      py-2' {...register('image',{
        required:'Image is required'
      })}
              />
              {
                errors.image && (<p className='text-red-500'>{errors.image.message}</p>)
              }
             
              <p className='mt-1 text-xs text-gray-400'>
                PNG, JPG or JPEG (max 2MB)
              </p>

            </div>
           
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
           
                 <input
                type='password'
                name='password'
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900' {...register('password', {
                  required: "password is required", minLength: {
                    value: 6, message: 'Password must be at least 6 character'
                  }
                })}
              />
              {
                errors.password && (<p className='text-red-500'>{errors.password.message}</p>)
              }
              {/* Confirm Password */}
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                 Confirm Password
                </label>
              </div>  
  <input 
    type="password" placeholder='*******'   className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
    {...register("confirmPassword", {
      required: "Please confirm your password",
      validate: value =>
        value === password  || "Passwords do not match"
    })}
  />

  {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
           
              
           
             
            </div>
        
          </div>

          <div>
            <button
              type='submit'
              className='bg-lime-500 w-full rounded-md py-3 text-white'
            >
             Submit
            </button>
          </div>
        </form>
    
         
        
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account? <Link
            to='/login' 
          >Login  </Link>
         
        </p>
      </div>
    </div>
    );
};

export default SignUp;