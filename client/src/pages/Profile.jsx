import React, { useRef } from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {
const{currentUser} = useSelector((state) => state.user);
const fileRef = useRef(null);
  return (
    <div className='mt-4 max-w-lg mx-auto'>
      <h1 className='text-center font-bold text-xl'>Profile Page</h1>
      <form className='flex flex-col items-center justify-center mt-4 gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} className='w-24 h-24 rounded-full object-cover ' src={currentUser.avatar} alt="" />
        <input className='p-3 border border-slate-400 w-full outline-none rounded-lg'
        defaultValue={currentUser.userName}
        type="text" placeholder='userName' id='userName' />
        <input className='p-3 border border-slate-400 w-full outline-none rounded-lg'
        defaultValue={currentUser.email}
        type="text" placeholder='Email' id='email' />
        <input className='p-3 border border-slate-400 w-full outline-none rounded-lg' type="text" placeholder='Password' id='password' />
        <button className='p-3  bg-slate-700 w-full outline-none rounded-lg text-white font-semibold hover:opacity-90 disabled:opacity-80 cursor-pointer'>Update</button>
      </form>
      <div className='flex justify-between mt-3'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
