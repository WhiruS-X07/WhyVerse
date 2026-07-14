import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../components/component'

const Layout = () => {
  return (
    <div className='min-h-screen bg-[#05060A] text-white'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout