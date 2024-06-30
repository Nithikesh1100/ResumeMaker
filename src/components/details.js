import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/details.css';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../config_db/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

const Details = () => {
  const [resumeData, setResumeData] = useState({
    objective: '',
    experience: '',
    education: '',
    skills: '',
    // dob: '',
    // gender: '',
    // name: '',
    // email: '',
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchResumeData(currentUser.uid);
        // console.log(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchResumeData = async (userId) => {
    try {
      const docRef = doc(db, "resumes", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log(docSnap.data());
        setResumeData(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching resume data: ', error);
      toast.error('Error fetching resume data');
    }
  };

  const handleFileChange = (e) => {
    // Implement file handling logic if needed
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { objective, experience, education, skills } = resumeData;

    // Check if all fields are filled
    if (!objective || !experience || !education || !skills) {
      toast.error('All fields are required!');
      return;
    }

    // Validate objective length
    if (objective.split(' ').length < 100) {
      toast.error('Objective should be at least 100 words');
      return;
    }

    // Simulate profile details that cannot be modified
    const profileDetails = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      dob: '1990-01-01',
      gender: 'male'
    };

    // Check if trying to modify restricted profile details
    if (
      objective.includes(profileDetails.name) ||
      objective.includes(profileDetails.email) ||
      objective.includes(profileDetails.dob) ||
      objective.includes(profileDetails.gender)
    ) {
      toast.error('You cannot modify name, email, date of birth, or gender.');
      return;
    }

    // Check if the user is authenticated
    if (!user) {
      toast.error('You need to be authenticated to update resume');
      return;
    }

    try {
      // Set the document in collection "resumes" with the user ID as the document ID
      await setDoc(doc(db, "resumes", user.uid), {
        objective,
        experience,
        education,
        skills,
        userId: user.uid // Optional: store the user ID
      }, { merge: true }); // Merge with existing document
      toast.success('Resume updated successfully');
    } catch (error) {
      console.error('Error updating resume: ', error);
      toast.error('Error updating resume: ' + error.message);
    }
  };

  return (
    <>
    <h1 style={{textAlign:'center'}}>Enter or Update your details here...</h1>
      <div className="profile-pic-container-upload">
        <label>
          <img
            src="https://w1.pngwing.com/pngs/132/484/png-transparent-circle-silhouette-avatar-user-upload-pixel-art-user-profile-document-black.png"
            alt="Upload Profile"
            className="round-pic"
          />
          <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
        </label>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="resume-input-form">
          <div className="row">
            <label>
              Objective:
              <textarea
                name="objective"
                value={resumeData.objective}
                placeholder='Enter objective'
                onChange={(e) => setResumeData({ ...resumeData, objective: e.target.value })}
              ></textarea>
            </label>
            <label>
              Experience:
              <textarea
                name="experience"
                value={resumeData.experience}
                placeholder='Enter your experience'
                onChange={(e) => setResumeData({ ...resumeData, experience: e.target.value })}
              ></textarea>
            </label>
          </div>
          <div className="row">
            <label>
              Education:
              <textarea
                name="education"
                value={resumeData.education}
                placeholder='Enter your education'
                onChange={(e) => setResumeData({ ...resumeData, education: e.target.value })}
              ></textarea>
            </label>
            <label>
              Skills:
              <textarea
                name="skills"
                value={resumeData.skills}
                placeholder='Enter your skills'
                onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
              ></textarea>
            </label>
          </div>
          <div className="submit-row">
            <input type="submit" value="Update" className="submit-button" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Details;
