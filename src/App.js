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
import { doGetWalks } from './actions';
import SettingsProvider from './providers/SettingsProvider';

function App() {
  const dispatch = useDispatch();
  const walks = useSelector((state) => state.walks);
  useEffect(() => {
    if (!walks.length) dispatch(doGetWalks());
  }, []);

  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <SettingsProvider>
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
      </SettingsProvider>
    </IconContext.Provider>
  );
}

export default App;
