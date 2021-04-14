import React, { useContext, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import TextField from '../FormFields/TextField';
import { auth, provider } from '../firebase.config';
import { UserContext } from '../providers/UserProvider';

export const SignUpPage = ({ history }) => {
  const userCtxt = useContext(UserContext);
  const UserInitialState = { email: '', displayName: '', password: '' };

  const signUpWithEmailAndPasswordHandler = async (event) => {
    console.log('event', event);
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        event.email,
        event.password
      );
      userCtxt.generateUserDocument(user, { displayName: event.displayName });
      history.push('/');
    } catch (error) {
      console.error('Error Signing up with email and password');
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
                <Button className="center">S'inscrire</Button>
              </Col>
            </form>
          )}
        </Form>
      </CardBody>
    </Card>
  );
};