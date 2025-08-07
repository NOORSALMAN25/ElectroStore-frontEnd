import { useNavigate } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div>
        <h2>hello </h2>
        <button onClick={() => navigate('/signup')}>
          Click Here To Get Started
        </button>
      </div>
    </>
  )
}

export default Home
