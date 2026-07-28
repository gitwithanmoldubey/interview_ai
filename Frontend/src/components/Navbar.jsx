import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import Logo from './Logo'
import './navbar.scss'

const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const onLogout = async () => {
        await handleLogout()
        navigate('/login')
    }

    const handleNewStrategy = (e) => {
        e.preventDefault()
        navigate('/')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <header className='app-navbar'>
            <div className='navbar-container'>
                
                {/* Logo & Brand */}
                <Link to='/' onClick={handleNewStrategy} className='navbar-brand'>
                    <div className='logo-icon'>
                        <Logo size={22} />
                    </div>
                    <span className='brand-name'>Interview<span className='highlight'>.AI</span></span>
                </Link>

                {/* Right Actions & Profile */}
                <div className='navbar-actions'>
                    
                    <button onClick={handleNewStrategy} className='nav-link-btn' title='Create a new interview plan'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>New Strategy</span>
                    </button>

                    {user && (
                        <div className='user-profile-badge'>
                            <div className='user-avatar'>
                                {(user.username || user.email || 'U')[0].toUpperCase()}
                            </div>
                            <span className='user-name'>{user.username || user.email?.split('@')[0]}</span>
                        </div>
                    )}

                    <button onClick={onLogout} className='logout-btn' title='Logout of your account'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>

            </div>
        </header>
    )
}

export default Navbar
