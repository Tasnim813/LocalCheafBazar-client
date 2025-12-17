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
        <div>
            <div className='flex flex-col items-center justify-center'>
                <div className='bg-white p-10 rounded-lg shadow-lg text-center'>
                    <IoBagCheckOutline className='w-16 h-16 text-green-500 mx-auto mb-4' />
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                        Payment Successful!
                    </h1>
                    <p className='text-gray-600 mb-6'>
                        Thank you for your purchase. Your order is being processed.
                    </p>
                    <Link
                        to='/dashboard/my-orders'
                        className='inline-block bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300'
                    >
                        Go to My Orders
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Payment;
