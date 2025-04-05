import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';
import { toast } from 'react-toastify'; // Import toast

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        toast.error(data.message); // Show error toast
        return;
      }

      dispatch(updateUserSuccess(data));
      toast.success('User Updated Successfully'); // Show success toast
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error(error.message); // Show error toast for network or other errors
    }
  };


 const handleDeleteUser = async () => {
  try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${currentUser.token}`, // Add if needed
      },
    });
    if (!res.ok) {
      const errorText = await res.text(); // Handle non-JSON responses
      throw new Error(errorText || `Request failed with status ${res.status}`);
    }
    const data = await res.json();
    if (data.success === false) {
      dispatch(deleteUserFailure(data.message));
      toast.error(data.message);
      return;
    }
    dispatch(deleteUserSuccess());
    toast.success('User Deleted Successfully');
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
    toast.error(error.message);
  }
};


const handleSignOut =async () => {
  try {
    dispatch(signOutUserStart());
    const res = await fetch('/api/auth/signOut')
    const data = await res.json();

    if (data.success === false) {
      dispatch(signOutUserFailure(data.message));
      toast.error(data.message); // Show error toast
      return;
    }
    dispatch(signOutUserSuccess());
    toast.success('User Signed Out Successfully');
  } catch (error) {
    dispatch(signOutUserFailure(error.message));
  }
}
  return (
    <div className="mt-4 max-w-lg mx-auto">
      <h1 className="text-center font-bold text-xl">Profile Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center mt-4 gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 rounded-full object-cover"
          src={currentUser.avatar}
          alt=""
        />
        <input
          className="p-3 border border-slate-400 w-full outline-none rounded-lg"
          defaultValue={currentUser.userName}
          onChange={handleChange}
          type="text"
          placeholder="userName"
          id="userName"
        />
        <input
          className="p-3 border border-slate-400 w-full outline-none rounded-lg"
          defaultValue={currentUser.email}
          onChange={handleChange}
          type="text"
          placeholder="Email"
          id="email"
        />
        <input
          onChange={handleChange}
          className="p-3 border border-slate-400 w-full outline-none rounded-lg"
          type="password" // Changed to "password" for security
          placeholder="Password"
          id="password"
        />
        <button
          disabled={loading}
          className="p-3 bg-slate-700 w-full outline-none rounded-lg text-white font-semibold hover:opacity-90 disabled:opacity-80 cursor-pointer"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-3">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;