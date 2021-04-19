import React from 'react';
import { Header } from './components/Header';
import { WalksPage } from './pages/WalksPage';
import { SignInPage } from './pages/SignInPage';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import UserProvider from './providers/UserProvider';
import { SignUpPage } from './pages/SignUpPage';
import { WalksAddition } from './pages/WalkAddition';
import { IconContext } from 'react-icons/lib';

function App() {
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <UserProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/" component={WalksPage} />
            <Route exact path="/add" component={WalksAddition} />
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/signup" component={SignUpPage} />
          </Switch>
        </Router>
      </UserProvider>
    </IconContext.Provider>
  );
}

export default App;
