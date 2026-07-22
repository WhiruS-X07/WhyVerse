import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../pages/pages'

const Layout = () => {
  return (
    <div className='min-h-screen bg-[#000000] text-white'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout