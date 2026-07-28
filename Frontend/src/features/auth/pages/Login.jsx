import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import Footer from '../../../components/Footer'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }
        try {
            await handleLogin({ email, password })
            navigate('/')
        } catch (err) {
            setError("Invalid credentials. Please try again.")
        }
    }

    return (
        <main className="auth-page" style={{ flexDirection: 'column', padding: 0, justifyContent: 'space-between' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '2rem 1.5rem' }}>
                <div className="auth-card">

                    <div className="auth-header">
                        <div className="auth-logo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                                <polyline points="2 17 12 22 22 17" />
                                <polyline points="2 12 12 17 22 12" />
                            </svg>
                        </div>
                        <h1>Welcome Back</h1>
                        <p>Log in to access your interview strategies</p>
                    </div>

                    {error && (
                        <div style={{ color: '#ef4444', padding: '10px 14px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '500' }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                </span>
                                <input
                                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                </span>
                                <input
                                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                        </div>

                        <button disabled={loading} className="auth-submit-btn">
                            {loading ? 'Logging in...' : 'Sign In'}
                        </button>

                    </form>

                    <p className="auth-footer">
                        Don't have an account? <Link to="/register">Create one</Link>
                    </p>

                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Login