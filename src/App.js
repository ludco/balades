/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { IconContext } from 'react-icons/lib';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { doGetSettings, doGetWalks } from './actions';
import { Header } from './components/Header';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { WalksAddition } from './pages/WalkAddition';
import FiltersProvider from './providers/FiltersProvider';
import { WalksPage } from './pages/WalksPage';
import UserProvider from './providers/UserProvider';

function App() {
  const dispatch = useDispatch();
  const walks = useSelector((state) => state.walks);
  const storeSettings = useSelector((state) => state.settings);
  useEffect(() => {
    if (!walks.length) dispatch(doGetWalks());
    if (!storeSettings.length) dispatch(doGetSettings());
  }, []);

  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <UserProvider>
        <FiltersProvider>
          <Router>
            <Header></Header>
            <Switch>
              <Route exact path="/add" component={WalksAddition} />
              <Route exact path="/signin" component={SignInPage} />
              <Route exact path="/signup" component={SignUpPage} />
              <Route path="/" component={WalksPage} />
            </Switch>
          </Router>
        </FiltersProvider>
      </UserProvider>
    </IconContext.Provider>
  );
}

export default App;
