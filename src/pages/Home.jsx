import { useNavigate } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div>
        <h2>If you have an account please sign in </h2>
        <button onClick={() => navigate('/login')}>
          Click Here To Get Started
        </button>
      </div>
    </>
  )
}

export default Home
