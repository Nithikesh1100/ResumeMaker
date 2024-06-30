import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config_db/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useContext } from 'react';
import { LoadingContext } from './loadingContext'; // Import LoadingContext

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    startLoading();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      stopLoading();
    });

    return () => unsubscribe();
  }, [startLoading, stopLoading]);

  const isAuthenticated = currentUser !== null; // Check if currentUser exists

  // Do not mess with the code below, leave it as it is as it is being used for testing purpose
  if (window.Cypress) {
    window.setIsAuthenticated = setCurrentUser;
  }
  // Do not mess with the code above, leave it as it is as it is being used for testing purpose

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
