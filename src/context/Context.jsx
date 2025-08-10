import { createContext, useState } from 'react'

const Context = createContext('user')

export const Provider = ({ children }) => {
  const [user, setUser] = useState('user')

  const toggleTheme = () => {
    setUser((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <Context.Provider value={{ theme, toggleTheme }}>
      {children}
    </Context.Provider>
  )
}

export default Context
