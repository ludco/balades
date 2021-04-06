import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import TextField from '../FormFields/TextField';

export const SignInPage = () => {
  const [user, setUser] = useState({
    mail: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const signInWithEmailAndPasswordHandler = (event) => {};

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
              <Field name="mail" component={TextField} placeholder="Email" />
              <Field
                name="password"
                type="password"
                component={TextField}
                placeholder="Mot de passe"
              />

              <Button>Envoyer</Button>
            </form>
          )}
        </Form>
        <p className="text-center my-3">or</p>
        <Button>Se connecter avec Google</Button>
      </CardBody>
    </Card>
  );
};
