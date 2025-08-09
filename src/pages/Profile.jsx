const Profile = ({ user }) => {
  return (
    <>
      <div>
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
      </div>
    </>
  )
}

export default Profile

//at the profile will be only the user and role and email
