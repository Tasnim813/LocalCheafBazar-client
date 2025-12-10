import Card from './Card'
import Container from '../Shared/Container'

const Plants = ({meal}) => {
  return (
    <Container>
      <div className=''>
        <Card meal={meal} />
        
      </div>
    </Container>
  )
}

export default Plants
