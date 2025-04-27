import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')
        
        if (token && userData) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setCurrentUser(JSON.parse(userData))
        setIsAuthenticated(true)
        }
        
        setLoading(false)
    }, [])
  
    // Login function
    const login = async (email, password) => {
        try {
        const response = await api.post('/auth/login', {
            username: email,
            password: password
        }, {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
        
        const { access_token } = response.data
        
        // Set token in axios defaults
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
        
        // Get user data
        const userResponse = await api.get('/auth/me')
        
        // Save to state and localStorage
        setCurrentUser(userResponse.data)
        setIsAuthenticated(true)
        localStorage.setItem('token', access_token)
        localStorage.setItem('user', JSON.stringify(userResponse.data))
        
        return userResponse.data
        } catch (error) {
        console.error('Login error:', error)
        throw error
        }
    }
  
    // Register function
    const register = async (email, password, fullName) => {
        try {
        const response = await api.post('/auth/signup', {
            email,
            password,
            full_name: fullName
        })
        
        return response.data
        } catch (error) {
        console.error('Registration error:', error)
        throw error
        }
    }
  
    // Logout function
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setCurrentUser(null)
        setIsAuthenticated(false)
        delete api.defaults.headers.common['Authorization']
    }
    
    const value = {
        currentUser,
        isAuthenticated,
        login,
        register,
        logout
    }
    
    return (
        <AuthContext.Provider value={value}>
        {!loading && children}
        </AuthContext.Provider>
    )
}