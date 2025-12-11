import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Plants from '../../components/Home/Plants';
import MealCart from './MealCart';

const Meals = () => {
    const { data: meals = [] } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const result = await axios(`http://localhost:3000/meals`)
            return result.data;
        }
    })
    console.log(meals)

    return (
        <div>
            All meals here
           <div className='grid grid-cols-4'>
             {
                meals.map(meal => <MealCart meal={meal}></MealCart> )
            }
            </div>
        </div>
    );
};

export default Meals;