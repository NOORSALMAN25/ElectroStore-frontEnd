import { useNavigate } from 'react-router-dom'

const Home = ({ user }) => {
  let navigate = useNavigate()
  return (
    <>
      {user ? (
        <h1>{`Welcome , ${user.name}`}</h1>
      ) : (
        <div>
          <h2>hello </h2>
          <button onClick={() => navigate('/signup')}>
            Click Here To Get Started
          </button>
        </div>
      )}
    </>
  )
}

export default Home
