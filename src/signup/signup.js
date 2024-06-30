import React, { useState } from 'react';
import { auth, db } from '../config_db/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    gender: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, dob, gender } = formData;

    if (!firstName || !lastName || !email || !password || !dob || !gender) {
      toast.error("Complete all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "resumes", user.uid), {
        // firstName,
        // lastName,
        name: `${firstName} ${lastName}`,
        email,
        dob,
        gender,
        uid: user.uid
      });

      toast.success("User registered successfully");
    } catch (error) {
      console.error("Error registering user: ", error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error("Email is already in use");
      } else {
        toast.error("Error registering user");
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className='auth-text'>Sign Up</h2>

        <input 
          type="text" 
          name="firstName" 
          placeholder="First Name" 
          value={formData.firstName}
          onChange={handleChange}
        />
        <input 
          type="text" 
          name="lastName" 
          placeholder="Last Name" 
          value={formData.lastName}
          onChange={handleChange}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={handleChange}
        />
        <input 
          type="date" 
          name="dob" 
          value={formData.dob}
          onChange={handleChange}
        />

        <div className="gender-options">
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="male" 
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="female" 
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="other" 
              checked={formData.gender === "other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>

        <button type="submit" className='submit'>Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
