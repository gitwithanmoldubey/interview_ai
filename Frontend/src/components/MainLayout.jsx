import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout = ({ children }) => {
    return (
        <div className='app-main-layout' style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main className='app-main-content' style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout
