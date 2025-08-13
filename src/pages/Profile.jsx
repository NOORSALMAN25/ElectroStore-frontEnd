import { useEffect, useState } from 'react'
import Client from '../services/api'

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

    Client.get(`${backendUrl}/profile/${user.id}`)
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
    Client.put(`${backendUrl}/profile/${user.id}`, { name, email })
      .then((res) => {
        setProfile(res.data)
        setEditing(false)
      })
      .catch(() => {
        throw error
      })
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    setPasswordMessage('')
    Client.put(`${backendUrl}/profile/${user.id}/password`, {
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
    <div className="profile-card">
      {editing ? (
        <form
          className="profile-form"
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
        >
          <label className="form-label">
            Name:
            <input
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="form-label">
            Email:
            <input
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3 className="section-title">User Details</h3>
          <p className="detail-item">
            <strong>Name:</strong> {profile.name}
          </p>
          <p className="detail-item">
            <strong>Email:</strong> {profile.email}
          </p>
          <p className="detail-item">
            <strong>Role:</strong> {profile.role}
          </p>

          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-accent"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              {showPasswordForm ? 'Cancel password change' : 'Change password'}
            </button>
          </div>

          {showPasswordForm && (
            <form className="password-form" onSubmit={handlePasswordChange}>
              <label className="form-label">
                Old password:
                <input
                  className="form-input"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </label>

              <label className="form-label">
                New password:
                <input
                  className="form-input"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </label>

              <button type="submit" className="btn btn-primary">
                Update Password
              </button>
              {passwordMessage && (
                <p className="password-message">{passwordMessage}</p>
              )}
            </form>
          )}
        </>
      )}
    </div>
  )
}

export default Profile
