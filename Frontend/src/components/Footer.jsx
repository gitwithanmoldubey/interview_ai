import React from 'react'
import './footer.scss'

const Footer = () => {
    return (
        <footer className='app-footer'>
            <div className='footer-container'>
                
                <div className='footer-left'>
                    <span className='footer-brand'>Interview<span className='highlight'>.AI</span></span>
                    <span className='footer-copy'>&copy; {new Date().getFullYear()} Anmol Dubey. All rights reserved.</span>
                </div>

                <div className='footer-links'>
                    <a href='mailto:anmoldubey2310@gmail.com' target='_blank' rel='noopener noreferrer' title='Email'>
                        📧 anmoldubey2310@gmail.com
                    </a>
                    <a href='tel:+917398867267' title='Phone'>
                        📞 +91-7398867267
                    </a>
                    <a href='https://protfolio-nine-inky.vercel.app/' target='_blank' rel='noopener noreferrer'>
                        🌐 Portfolio
                    </a>
                    <a href='https://linkedin.com/in/anmol23' target='_blank' rel='noopener noreferrer'>
                        💼 LinkedIn
                    </a>
                    <a href='https://github.com/gitwithanmoldubey' target='_blank' rel='noopener noreferrer'>
                        🐙 GitHub
                    </a>
                    <a href='https://leetcode.com/u/anmoldubey2310/' target='_blank' rel='noopener noreferrer'>
                        🧩 LeetCode
                    </a>
                </div>

            </div>
        </footer>
    )
}

export default Footer
