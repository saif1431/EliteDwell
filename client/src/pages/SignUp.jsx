import React from 'react'
import { NavLink } from 'react-router-dom'
function SignUp() {
  return (
    <div className='flex items-center justify-center  mt-14 flex-col'>
      <h1 className='text-3xl font-semibold '>Sign Up</h1>
      <div className='bg-gray-100 p-4 rounded-md mt-4 w-96'>
        <form className='flex flex-col gap-1'>
          <label className='text-slate-800 font-semibold' htmlFor='email'>userName <sup className='text-red-600 text-lg'>*</sup></label>
          <input className='py-2 border border-slate-300 mt-2 rounded-lg outline-none px-4' type='text' id='email' name='email' placeholder='Enter your userName' />
          <label className='text-slate-800 font-semibold' htmlFor='email'>Email<sup className='text-red-600 text-lg'>*</sup></label>
          <input className='py-2 border border-slate-300 mt-2 rounded-lg outline-none px-4' type='email' id='email' name='email' placeholder='Enter your email'/>
          <label className='text-slate-800 font-semibold' htmlFor='password'>Password<sup className='text-red-600 text-lg'>*</sup></label>
          <input className='py-2 border border-slate-300 mt-2 rounded-lg outline-none px-4' type='password' id='password' name='password' placeholder='Enter your password' />
          <button className='bg-blue-500 text-white rounded-md p-2 mt-2 hover:bg-blue-400 disabled:opacity-50' type='submit'>
            Sign Up
          </button>
        </form>
        <div className='flex items-center mt-2 justify-center'>
          <p>Already have an account?</p>
          <NavLink className='text-blue-500 ml-1' to={'/sign-in'}>signIn</NavLink>
        </div>
      </div>
    </div>
  )
}

export default SignUp
