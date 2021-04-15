import React from 'react';
import { Header } from './components/Header';
import { WalksPage } from './pages/WalksPage';
import { SignInPage } from './pages/SignInPage';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import UserProvider from './providers/UserProvider';
import { SignUpPage } from './pages/SignUpPage';
import { WalksAddition } from './pages/WalkAddition';

function App() {
  return (
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
  );
}

export default App;
