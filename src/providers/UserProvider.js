/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doGetUser } from '../actions';
import { auth } from '../firebase.config';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const storeUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState(storeUser);
  useEffect(() => {
    if (!storeUser) {
      auth.onAuthStateChanged((userAuth) => {
        const uid = userAuth?.uid;
        dispatch(doGetUser({ uid }));
      });
    }
  }, []);
  useEffect(() => {
    if (!user) setUser(storeUser);
  }, [storeUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
