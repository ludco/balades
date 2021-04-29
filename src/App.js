/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { WalksPage } from './pages/WalksPage';
import { SignInPage } from './pages/SignInPage';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import UserProvider from './providers/UserProvider';
import { SignUpPage } from './pages/SignUpPage';
import { WalksAddition } from './pages/WalkAddition';
import { IconContext } from 'react-icons/lib';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings, getWalks } from './actions';

function App() {
  const dispatch = useDispatch();
  const { walks, settings } = useSelector((state) => state);

  useEffect(() => {
    if (!walks.length) dispatch(getWalks());
    if (!settings.length) dispatch(getSettings());
  }, []);

  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <UserProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/add" component={WalksAddition} />
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route path="/" component={WalksPage} />
          </Switch>
        </Router>
      </UserProvider>
    </IconContext.Provider>
  );
}

export default App;
