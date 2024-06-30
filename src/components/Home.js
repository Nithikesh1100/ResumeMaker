import React from 'react'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();

    const handlesignup = () => {
        navigate('/signup');
    }

    const handlesignin = () => {
        navigate('/signin');
    }

    return (
        <div className='container'>
            <h1>Welcome to Resume Maker</h1>
            <div className='buttons'>
                {/* This is Home Page */}

                <h3>Click here to register</h3>
                <button className="submit" onClick={handlesignup}>Sign Up</button>
                <h3>Already registered? Click here to Login</h3>
                <button className="submit" onClick={handlesignin}>Sign In</button>
            </div>
        </div>
    )
}

export default Home