import React from 'react'
import logo from '/logo.png'
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom'
function Header() {
  return (
    <header className='bg-slate-200 p-3 text-slate-600 shadow-md'> 
    <div className='flex items-center justify-between max-w-6xl mx-auto'>
    <Link to={'/'} className='w-28 h-12 flex items-center justify-center'>
<img  className='w-full h-fit' src={logo} alt="" />
    </Link>
    <form className='bg-slate-300 p-3 rounded-lg flex items-center'>
      <input className='text-slate-600  w-24 sm:w-62 bg-transparent  outline-none' type="text" placeholder='Search.....' />
      <IoSearch className='text-slate-700 text-lg' />

    </form>
    <nav className='text-slate-600'>
      <ul className='flex space-x-6'>
            <li className='hover:underline'><Link to={'/'}>Home</Link></li>
            <li className='hover:underline'><Link to={'/about'}>About</Link></li>
            <li className='hover:underline'><Link to={'/sign-up'}>Sign Up</Link></li>
      </ul>
    </nav>
    </div>
    </header>
  )
}

export default Header
