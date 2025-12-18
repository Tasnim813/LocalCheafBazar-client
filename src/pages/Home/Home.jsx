import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Plants from '../../components/Home/Plants';
import MealCart from '../Meals/MealCart';
import Banner from './Banner';
import Review from './Review';
import HowItWorks from './HowItWorks';
import Container from '../../components/Shared/Container';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

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

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <div>Error loading meals</div>;

  return (
    <div>

      <Banner></Banner>
 <Container>
       <h2 className="text-3xl mt-5 font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-orange-500 text-center">
  Daily Meals 
</h2>

<p className="mb-4 text-gray-700 text-center ">
  Explore the most delicious meals handpicked by ChefBazar chefs. Freshly prepared, <br /> high-quality ingredients, and delivered fast!
</p>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {meals.map((meal) => (
    <MealCart
      key={meal._id}
      meal={meal}
      className="transition transform hover:scale-105 hover:shadow-lg rounded-xl border border-gray-100"
    />
  ))}
</div>
 </Container>

      <Review></Review>
      <HowItWorks></HowItWorks>
    </div>
  );
};

export default Home;
