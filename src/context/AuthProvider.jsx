import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const autenticateUser = async () => {
      const token = localStorage.getItem('token')
      console.log(token)
      if (!token) {
        console.log('no hay token')
        setLoading(false)
        navigate('/')
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await axiosClient('/users/profile', config)
        setAuth(data)
      } catch (error) {
        setAuth({})
      } finally {
        setLoading(false)
      }
    }
    autenticateUser()
  }, [])

  const logOutAuth = () => {
    setAuth({})
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        logOutAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export { AuthProvider }

export default AuthContext
