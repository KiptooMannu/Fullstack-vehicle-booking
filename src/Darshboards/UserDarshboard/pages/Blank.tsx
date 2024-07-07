// import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import TopNav from '../components/topnav/TopNav'
import { Outlet } from 'react-router-dom'

const Blank = () => {
    return (
        <>
        <h1>empty div</h1>
            {/* <Sidebar />
            <div className="main">
                <div className="main__content">
                    <TopNav />
                    <Outlet />
                </div>
            </div> */}
        </>
    )
}

export default Blank
