import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Plants from '../../components/Home/Plants';
import MealCart from '../Meals/MealCart';
import Banner from './Banner';
import Review from './Review';

const Home = () => {

  
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], isLoading, isError } = useQuery({
    queryKey: ['home-meals'],
    queryFn: async () => {
      const res = await axiosSecure.get('/home-meals'); // fetch 6 meals
      return res.data;
    },
  });

  console.log(meals )

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading meals</div>;

  return (
    <div>

      <Banner></Banner>
      <h2 className="text-2xl font-bold mb-4">Daily Meals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          meals.map(meal=><MealCart key={meal._id} meal={meal}></MealCart>)
        }
      </div>
      <Review></Review>
    </div>
  );
};

export default Home;
