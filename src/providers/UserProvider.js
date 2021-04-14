import React, { createContext, useState } from 'react';
import db from '../firebase.config';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  /**
   * Generate firebase User Document (signUp)
   * @param {Object} newUser
   * @param {Object} additionalDatas
   * @returns user
   */
  const generateUserDocument = async (newUser, additionalDatas) => {
    if (!newUser) return;
    const userRef = db.doc(`users/${newUser.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email } = newUser;
      try {
        await userRef.set({
          email,
          ...additionalDatas,
        });
      } catch (error) {
        console.error('Error creating user document', error);
      }
    }
    return getUserDocument(newUser.uid);
  };

  /**
   * Get firebase User document
   * @param {string} uid
   * @returns
   */
  const getUserDocument = async (uid) => {
    if (!uid) return null;
    try {
      const userDocument = await db.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data(),
      };
    } catch (error) {
      console.error('Error fetching user', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        generateUserDocument,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
