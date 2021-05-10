/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doGetSettings } from '../actions';

export const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const dispatch = useDispatch();
  const storeSettings = useSelector((state) => state.settings);
  const [settings, setSettings] = useState(storeSettings);

  useEffect(() => {
    if (!storeSettings.length) dispatch(doGetSettings());
  }, []);
  useEffect(() => {
    if (!settings.length) setSettings(storeSettings);
  }, [storeSettings.length]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
