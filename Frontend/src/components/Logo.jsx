import React from 'react'

const Logo = ({ size = 24, className = '' }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            className={className}
        >
            <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
            </defs>

            {/* Futuristic AI Hexagon Shield */}
            <path 
                d="M12 2.2L19.5 6.5V15.5L12 19.8L4.5 15.5V6.5L12 2.2Z" 
                stroke="url(#logoGrad)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />

            {/* Core AI Sparkle Star */}
            <path 
                d="M12 6.5C12 9.5 14.5 11 17.5 11C14.5 11 12 12.5 12 15.5C12 12.5 9.5 11 6.5 11C9.5 11 12 9.5 12 6.5Z" 
                fill="url(#sparkGrad)"
            />

            {/* Node Dots */}
            <circle cx="12" cy="2.2" r="1.2" fill="#ec4899" />
            <circle cx="19.5" cy="6.5" r="1.2" fill="#8b5cf6" />
            <circle cx="19.5" cy="15.5" r="1.2" fill="#6366f1" />
            <circle cx="12" cy="19.8" r="1.2" fill="#38bdf8" />
            <circle cx="4.5" cy="15.5" r="1.2" fill="#6366f1" />
            <circle cx="4.5" cy="6.5" r="1.2" fill="#8b5cf6" />
        </svg>
    )
}

export default Logo
