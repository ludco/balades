import React from 'react';
import { Header } from './components/Header';
import { WalksPage } from './pages/WalksPage';
import { SignInPage } from './pages/SignInPage';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header></Header>

      <Switch>
        <Route exact path="/" component={WalksPage} />
        <Route exact path="/signin" component={SignInPage} />
      </Switch>
    </Router>
  );
}

export default App;
