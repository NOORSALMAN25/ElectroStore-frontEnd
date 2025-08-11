import { useEffect, useState } from 'react'
import User from '../services/api'

const Profile = ({ user }) => {
  const [userr, setUserr] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [NewPassword, setNewPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  useEffect(() => {
    console.log(user.id)

    if (!user.id)
      return User.get(`/profile/${user.id}`)
        .then((res) => {
          setUserr(res.data)
          setName(res.data.name)
          setEmail(res.data.email)
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })
  }, [user.id])

  const handleSave = () => {
    User.put(`/profile/${user.id}`, { name, email })
      .then((res) => {
        setUserr(res.data)
        setEditing(false)
      })
      .catch((err) => {
        alert(`failed to update user information`)
      })
  }

  if (loading) return <P>loading...</P>
  if (error) return <p>error:{error}</p>

  return (
    <div>
      {editing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
        >
          <label>
            Name:{' '}
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Email:{' '}
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h3>User Details</h3>
          <h5>Name:{user.name}</h5>
          <h5>Email:{user.email}</h5>
          <button onClick={() => setEditing(true)}>Edit</button>
          <br />
        </>
      )}
    </div>
  )
}

export default Profile

//at the profile will be only the user and role and email

{
  /* <div>
        {user ? (
          <>
            <p>name:{user.name}</p>
            <p>email:{user.email}</p>
            <p>role:{user.role}</p>
          </>
        ) : (
          <>
            <h2>You Don't have an account</h2>
            <p>Please create an account to accesses your profile </p>
          </>
        )}
      </div> */
}
