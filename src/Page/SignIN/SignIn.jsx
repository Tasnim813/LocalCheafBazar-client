import React from 'react';
import useAuth from '../../hook/useAuth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

const SignIn = () => {
    const {signIn}=useAuth()
    const {register,handleSubmit,formState: {errors}}=useForm()
    const navigate=useNavigate()
    const handleLogin=async data=>{
        const {email,password}=data
        try{
            const result=await signIn(email,password)
            console.log(result)
            navigate('/')


        }catch(err){
            console.log(err)
        }

    }
        return (
        <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
         
        </div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
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
                data-temp-mail-org='0' {...register('email',{required: 'email is required' })}
              />
              {
                errors.email  && (<p className='text-red-500'>{errors.email.message}</p>)
                
              }
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
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900' {...register('password',{required:'password is required' })}
              />
              {
                errors.password && (<p className='text-red-500'>{errors.password.message}</p>)
              }
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-lime-500 w-full rounded-md py-3 text-white'
            >
              Login
            </button>
          </div>
        </form> 
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            
            to='/register'
            className='hover:underline hover:text-lime-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
    );
};

export default SignIn;