import React, { useState } from 'react';
import { auth } from '../config_db/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signin.css';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Enhanced email regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully");
      navigate("/details");
    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        toast.error("Invalid email or password");
      } else {
        toast.error("Error signing in");
      }
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2 className='Signintext'>Sign In</h2>

        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange} 
        />

        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={handleChange} 
        />

        <button type="submit" className='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Signin;
