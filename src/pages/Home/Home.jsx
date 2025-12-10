import { useLoaderData } from 'react-router'
import Plants from '../../components/Home/Plants'

const Home = () => {
  const meals=useLoaderData()
  console.log(meals)
  return (
    <div className='grid grid-cols-3'>
      {
        meals.map(meal=><Plants  key={meal._id} meal={meal} />)
      }
      
      {/* More components */}
    </div>
  )
}

export default Home
