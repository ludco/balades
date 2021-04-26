import React, { useContext, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Button, Card, CardBody, CardHeader, Col } from 'reactstrap';
import TextField from '../FormFields/TextField';
import { auth, provider } from '../firebase.config';
import { UserContext } from '../providers/UserProvider';

export const SignInPage = ({ history }) => {
  const userCtxt = useContext(UserContext);
  const userInitialState = { email: '', displayName: '', password: '' };
  const [error, setError] = useState(null);
  const [user, setUser] = useState(userInitialState);

  /**
   * SignIn with Email/password
   * @param {Object} event
   */
  const signInWithEmailAndPasswordHandler = async (event) => {
    auth
      .signInWithEmailAndPassword(event.email, event.password)
      .then(() => history.push('/'))
      .catch((err) => {
        setError('Les identifiants ne correspondent pas.');
        console.error('Error signing in with password and email', err);
      });
    setUser(userInitialState);
  };

  /**
   * SignIn with Google
   */
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider).then((res) => userCtxt.setUser(res.user));
  };

  return (
    <Card className="signin mt-5">
      <CardHeader>
        <h3>Connexion</h3>
      </CardHeader>
      <CardBody>
        <Form
          initialValues={user}
          onSubmit={(event) => signInWithEmailAndPasswordHandler(event)}
        >
          {({ handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <Field name="email" component={TextField} placeholder="Email" />
              <Field
                name="password"
                type="password"
                component={TextField}
                placeholder="Mot de passe"
              />
              <Col className="text-center">
                {error && <p className="error">{error}</p>}
                <Button className="center">Envoyer</Button>
              </Col>
            </form>
          )}
        </Form>
        <p className="text-center my-3">ou</p>
        <Col className="text-center">
          <Button color="warning" onClick={() => signInWithGoogle()}>
            Se connecter avec Google
          </Button>
        </Col>
        <Col className="text-center mt-4">
          <p>
            Pas encore inscrit ?{' '}
            <span className="link" onClick={() => history.push('/signup')}>
              Créer un compte
            </span>
          </p>
        </Col>
      </CardBody>
    </Card>
  );
};
