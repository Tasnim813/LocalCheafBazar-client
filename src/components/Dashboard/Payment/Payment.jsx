import React, { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router';
import { IoBagCheckOutline } from 'react-icons/io5';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {
    const axiosSecure=useAxiosSecure()
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    // useRef flag ensures axios.post runs only once
    const hasPosted = useRef(false);

    useEffect(() => {
        if (sessionId && !hasPosted.current) {
            hasPosted.current = true;
            axios.post(`https://localchefbazar-server-mauve.vercel.app/payment-success`, { sessionId })
                .then(res => console.log(res.data))
                .catch(err => console.error(err));
        }
    }, [sessionId]);


    useEffect(() => {
    if (sessionId && !hasPosted.current) {
        hasPosted.current = true;
        axiosSecure.post('/payment-success', { sessionId })  // <- axios → axiosSecure
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    }
}, [sessionId, axiosSecure]);


    return (
    <div className="min-h-[70vh] flex mt-[-50px] items-center justify-center bg-lime-50">
  <div className="bg-white border border-lime-200 p-10 rounded-2xl shadow-xl text-center max-w-md">

    {/* Icon */}
    <div className="flex justify-center mb-4">
      <div className="bg-orange-100 p-4 rounded-full">
        <IoBagCheckOutline className="w-14 h-14 text-orange-500" />
      </div>
    </div>

    {/* Title */}
    <h1 className="text-3xl font-bold text-lime-900 mb-2">
      Payment Successful!
    </h1>

    {/* Description */}
    <p className="text-gray-600 mb-6">
      Thank you for your purchase. Your order is being prepared with care.
    </p>

    {/* Button */}
    <Link
      to="/dashboard/my-orders"
      className="inline-block bg-lime-600 text-white font-semibold py-2 px-6 rounded-full 
                 hover:bg-lime-700 transition duration-300 shadow-md"
    >
      Go to My Orders
    </Link>

    {/* Accent line */}
    <div className="mt-6 h-1 w-20 mx-auto bg-orange-400 rounded-full"></div>

  </div>
</div>


    );
};

export default Payment;
