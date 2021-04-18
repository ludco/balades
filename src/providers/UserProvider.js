import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../actions';
import { auth, db } from '../firebase.config';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      auth.onAuthStateChanged((userAuth) => {
        dispatch(getCurrentUser(userAuth.uid));
      });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
