import { useEffect, useState } from 'react'
import User from '../services/api'

const Profile = ({ user }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  useEffect(() => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    User.get(`${backendUrl}/profile/${user.id}`)
      .then((res) => {
        setProfile(res.data)
        setName(res.data.name)
        setEmail(res.data.email)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [user?.id, backendUrl])

  const handleSave = () => {
    User.put(`${backendUrl}/profile/${user.id}`, { name, email })
      .then((res) => {
        setProfile(res.data)
        setEditing(false)
      })
      .catch(() => {
        alert('Failed to update user information')
      })
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    setPasswordMessage('')
    User.put(`${backendUrl}/profile/${user.id}`, {
      oldPassword,
      newPassword
    })
      .then((res) => {
        setPasswordMessage(res.data.status)
        setOldPassword('')
        setNewPassword('')
        setShowPasswordForm(false)
      })

      .catch((err) => {
        if (err.response && err.response.data && err.response.data.msg) {
          setPasswordMessage(err.response.data.msg)
        } else {
          setPasswordMessage('Failed to update password')
        }
      })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  if (!profile) {
    return (
      <div>
        <h2>You don't have an account</h2>
        <p>Please create an account to access your profile.</p>
      </div>
    )
  }

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
          <h5>Name: {profile.name}</h5>
          <h5>Email: {profile.email}</h5>
          <h5>Role: {profile.role}</h5>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
    </div>
  )
}

export default Profile

//at the profile will be only the user and role and email
