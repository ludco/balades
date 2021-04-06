import React, { useState } from 'react';
import 'firebase/storage';
import { Row, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { Field, Form } from 'react-final-form';
import TextField from '../FormFields/TextField';
import { storage, db } from '../firebase.config';

export const WalkForm = () => {
  const [newWalk, setNewWalk] = useState({
    name: '',
    difficulty: '',
    description: '',
    pics: [],
  });

  const [imageAsFile, setImageAsFile] = useState('');

  const handleImageAsFile = (e) => {
    setImageAsFile(e.target.files[0]);
  };

  /**
   * Handle pic upload to firebase, get pic url and add walk document to firebase db
   * @param {Object} walkToAdd
   */
  const doCreateWalk = (walkToAdd) => {
    if (imageAsFile === '') {
      console.error(`Not an image, the image file is a ${typeof imageAsFile}`);
      return;
    }

    const uploadTask = storage
      .ref(`/pics/${imageAsFile.name}`)
      .put(imageAsFile);

    //initiates the firebase side uploading
    uploadTask.on(
      'state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log('snapshot', snapShot);
      },
      (err) => {
        //catches the errors
        console.log('upload error', err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref('pics')
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            db.collection('balades')
              .doc()
              .set({ ...walkToAdd, pics: [fireBaseUrl] })
              .then(() => {
                console.log('Document successfully written!');
              })
              .catch((error) => {
                console.error('Error writing document: ', error);
              });
          });
      }
    );
  };
  return (
    <Card>
      <CardBody>
        <Row>
          <Col>
            <CardTitle tag="h5">Ajouter une balade</CardTitle>
            <Form
              initialValues={newWalk}
              onSubmit={(event) => doCreateWalk({ ...event })}
              onChange={(event) => setNewWalk(event)}
            >
              {({ handleSubmit, handleChange }) => (
                <form onSubmit={handleSubmit} onChange={handleChange}>
                  <Field
                    name="name"
                    component={TextField}
                    placeholder="Nom de la balade"
                  />
                  <Field
                    name="difficulty"
                    component={TextField}
                    placeholder="Difficulté"
                  />
                  <Field
                    name="description"
                    component={TextField}
                    placeholder="Description"
                  />
                  <input type="file" onChange={handleImageAsFile} />
                  <Button>Ajouter</Button>
                </form>
              )}
            </Form>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
