import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Button, Card, CardBody, CardHeader, Col } from 'reactstrap';
import TextField from '../FormFields/TextField';
import { auth } from '../firebase.config';
import { addUser } from '../actions';
import { useDispatch } from 'react-redux';

export const SignUpPage = ({ history }) => {
  const dispatch = useDispatch();
  const UserInitialState = { email: '', displayName: '', password: '' };
  const [error, setError] = useState(null);

  /**
   * SignUp with Email/password
   * @param {Object} event
   */
  const signUpWithEmailAndPasswordHandler = async (event) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        event.email,
        event.password
      );
      const additionalDatas = { displayName: event.displayName };
      dispatch(addUser(user, additionalDatas));
      history.push('/');
    } catch (err) {
      setError(
        "Une erreur s'est produite pendant la création de votre compte."
      );
      console.error('Error Signing up with email and password', err);
    }
  };

  return (
    <Card className="signin mt-5">
      <CardHeader>
        <h3>Inscription</h3>
      </CardHeader>
      <CardBody>
        <Form
          initialValues={UserInitialState}
          onSubmit={(event) => signUpWithEmailAndPasswordHandler(event)}
        >
          {({ handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <Field
                name="displayName"
                component={TextField}
                placeholder="Pseudo"
              />
              <Field name="email" component={TextField} placeholder="Email" />
              <Field
                name="password"
                type="password"
                component={TextField}
                placeholder="Mot de passe"
              />
              <Col className="text-center">
                {error && <p className="error">{error}</p>}
                <Button className="center">S'inscrire</Button>
              </Col>
            </form>
          )}
        </Form>
      </CardBody>
    </Card>
  );
};
