import React from 'react'
import './loadingScreen.scss'

const LoadingScreen = ({ message = "Loading your interview plan..." }) => {
    return (
        <main className='loading-screen'>
            <div className='loading-card'>
                
                {/* Glowing Logo Icon */}
                <div className='logo-wrapper'>
                    <div className='pulse-ring'></div>
                    <div className='logo-box'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                        </svg>
                    </div>
                </div>

                {/* Animated Text */}
                <h1 className='loading-title'>{message}</h1>
                <p className='loading-sub'>Our AI is analyzing job requirements & crafting custom strategy...</p>

                {/* Shimmer Bar */}
                <div className='loading-bar-container'>
                    <div className='loading-bar-shimmer'></div>
                </div>

            </div>
        </main>
    )
}

export default LoadingScreen
