import React from 'react'
import { Link } from 'react-router-dom'
function Layout() {
  return (
    <div className='nav-container'>

        <Link to="/">Home</Link>
        <Link to="/layout">Layout</Link>

    </div>
  )
}

export default Layout