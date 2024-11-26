// UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../fireBaseConfig'; // Corrected import
import { onAuthStateChanged } from 'firebase/auth';
import { ref, child, get } from 'firebase/database'; // Adjust for Realtime Database

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('normal');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            setUserRole(snapshot.val().userType || 'normal');
          } else {
            console.log("User document does not exist, setting to 'normal'");
            setUserRole('normal');
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole('normal');
        }
      } else {
        setUserRole('normal');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ userRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
