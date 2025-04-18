import React, { use, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';


function SignIn() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });
const { loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if any field is empty
    if ( !formData.email || !formData.password) {
      setError('All fields are required');
      return; // Stop the function if any field is empty
    }

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure('An error occurred. Please try again.'));
    }
  };

  return (
    <div className='flex items-center justify-center mt-14 flex-col'>
      <h1 className='text-3xl font-semibold'>Sign In</h1>
      <div className='bg-gray-100 p-4 rounded-md mt-4 w-96'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
          <label className='text-slate-800 font-semibold' htmlFor='email'>Email<sup className='text-red-600 text-lg'>*</sup></label>
          <input className='py-2 border border-slate-300 mt-2 rounded-lg outline-none px-4' type='email' id='email' name='email' placeholder='Enter your email' onChange={handleChange} />
          <label className='text-slate-800 font-semibold' htmlFor='password'>Password<sup className='text-red-600 text-lg'>*</sup></label>
          <input className='py-2 border border-slate-300 mt-2 rounded-lg outline-none px-4' type='password' id='password' name='password' placeholder='Enter your password' onChange={handleChange} />
          <button disabled={loading} type='submit' className='bg-blue-500 text-white rounded-md p-2 mt-2 hover:bg-blue-400 disabled:opacity-50'>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          <OAuth/>
        </form>
        <div className='flex items-center mt-2 justify-center'>
          <p>Don't have an account?</p>
          <NavLink className='text-blue-500 ml-1' to={'/sign-up'}>signUp</NavLink>
        </div>
      </div>
      {error && <p className='text-red-600 mt-2'>{error}</p>}
    </div>
  );
}

export default SignIn;