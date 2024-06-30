// App.js
// import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { LoadingContext } from './contexts/loadingContext';
import Signup from './signup/signup';
import Signin from './signin/signin';
import Details from './components/details';
import Navbar from './components/navbar';
import Resume from './components/resume';
import Home from './components/Home';

function App() {
  // const { loading, setLoading } = useContext(LoadingContext);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
