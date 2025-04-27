import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

function Navbar() {
    const { isAuthenticated, currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    const handleLogout = () => {
        logout()
        navigate('/login')
    }
  
  return (
        <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-bold text-xl">Contract Analyzer</span>
                </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
                <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <>
                    <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
                    <Link to="/contracts/upload" className="hover:text-blue-200">Upload Contract</Link>
                    <div className="ml-4 flex items-center space-x-2">
                        <span>{currentUser?.full_name || currentUser?.email}</span>
                        <button
                        onClick={handleLogout}
                        className="px-3 py-1 rounded bg-blue-700 hover:bg-blue-800"
                        >
                        Logout
                        </button>
                    </div>
                    </>
                ) : (
                    <>
                    <Link to="/login" className="hover:text-blue-200">Login</Link>
                    <Link to="/register" className="px-3 py-1 rounded bg-blue-700 hover:bg-blue-800">
                        Register
                    </Link>
                    </>
                )}
                </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
                <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                </button>
            </div>
            </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-blue-700">
            {isAuthenticated ? (
                <>
                <Link to="/dashboard" 
                    className="block px-3 py-2 rounded hover:bg-blue-800"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Dashboard
                </Link>
                <Link to="/contracts/upload" 
                    className="block px-3 py-2 rounded hover:bg-blue-800"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Upload Contract
                </Link>
                <button
                    onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 rounded hover:bg-blue-800"
                >
                    Logout
                </button>
                </>
            ) : (
                <>
                <Link to="/login" 
                    className="block px-3 py-2 rounded hover:bg-blue-800"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Login
                </Link>
                <Link to="/register" 
                    className="block px-3 py-2 rounded hover:bg-blue-800"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Register
                </Link>
                </>
            )}
            </div>
        )}
        </nav>
    )
}

export default Navbar