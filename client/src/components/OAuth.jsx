import React from 'react'
import { signInSuccess } from '../redux/user/userSlice';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function OAuth() {

const dispatch = useDispatch();
const navigate = useNavigate()
      const handelGoogle = async () => {
            try {
                  const provide = new GoogleAuthProvider();
                  const auth = getAuth(app);
                  const result= await signInWithPopup(auth, provide);

                  const res = await fetch('/api/auth/google', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo : result.user.photoURL })
                  })
                  const data = await res.json();
                  dispatch(signInSuccess(data));
                  navigate('/')

            } catch (error) {
                  console.log("Error from Google OAuth", error)
            }
      }
  return (
    <div>
      <button onClick={handelGoogle} type='button' className='bg-red-600 hover:bg-red-700 text-white font-bold py-2  w-full rounded'>Continue with Google</button>
    </div>
  )
}

export default OAuth
