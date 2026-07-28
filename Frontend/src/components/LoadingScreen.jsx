import React from 'react'
import Logo from './Logo'
import './loadingScreen.scss'

const LoadingScreen = ({ message = "Loading your interview plan..." }) => {
    return (
        <main className='loading-screen'>
            <div className='loading-card'>
                
                {/* Glowing Logo Icon */}
                <div className='logo-wrapper'>
                    <div className='pulse-ring'></div>
                    <div className='logo-box'>
                        <Logo size={36} />
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
