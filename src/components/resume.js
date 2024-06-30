import React, { useState, useEffect, useContext } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../config_db/firebase';
import { LoadingContext } from '../contexts/loadingContext';
import { AuthContext } from '../contexts/authContext'; // Assuming you have an AuthContext for user authentication
import '../styles/resume.css';

const Resume = () => {
  const { currentUser } = useContext(AuthContext); // Assuming currentUser is available from AuthContext
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    objective: "",
    experience: "",
    education: "",
    skills: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      startLoading();
      try {
        const docRef = doc(db, "resumes", currentUser.uid); // Ensure currentUser.uid is the document ID in your Firestore collection
        const docSnap = await getDoc(docRef);
        // console.log(docSnap);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setResumeData({
            name: userData.name || "",
            email: userData.email || "",
            dob: userData.dob || "",
            gender: userData.gender || "",
            objective: userData.objective || "",
            experience: userData.experience || "",
            education: userData.education || "",
            skills: userData.skills || ""
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        stopLoading();
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser, startLoading, stopLoading]);

  return (
    <div className='resume'>

      <div className="profile-container">
        <img
          src="https://w1.pngwing.com/pngs/132/484/png-transparent-circle-silhouette-avatar-user-upload-pixel-art-user-profile-document-black.png"
          alt="Profile Pic"
          className="profile-pic"
        />
      </div>

      <div className="info-container">
        <div>
          <h1>Name:</h1>
          <p>{resumeData.name}</p>
        </div>
        <div>
          <h1>Email:</h1>
          <p>{resumeData.email}</p>
        </div>
        <div>
          <h1>Date of Birth:</h1>
          <p>{resumeData.dob}</p>
        </div>
        <div>
          <h1>Gender:</h1>
          <p>{resumeData.gender}</p>
        </div>
        <div>
          <h1>Objective:</h1>
          <p>{resumeData.objective}</p>
        </div>
        <div>
          <h1>Experience:</h1>
          <p>{resumeData.experience}</p>
        </div>
        <div>
          <h1>Education:</h1>
          <p>{resumeData.education}</p>
        </div>
        <div>
          <h1>Skills:</h1>
          <p>{resumeData.skills}</p>
        </div>
      </div>

    </div>
  );
};

export default Resume;
