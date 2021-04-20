import React, { useState } from 'react';
import 'firebase/storage';
import { Row, Col, Card, CardBody, CardHeader, Button } from 'reactstrap';
import { Field, Form } from 'react-final-form';
import TextField from '../FormFields/TextField';
import CheckboxField from '../FormFields/CheckboxField';
import { useDispatch, useSelector } from 'react-redux';
import { addWalk, editWalk } from '../actions';
import { storage } from '../firebase.config';
import { TiDelete } from 'react-icons/ti';
import AlertModal from './AlertModal';
import SelectField from '../FormFields/SelectField';

export const WalkForm = ({ history }) => {
  const dispatch = useDispatch();
  // Walk
  const [walkToUpdate, setWalkToUpdate] = useState(history.location.state);
  const [newWalk, setNewWalk] = useState({
    name: '',
    difficulty: '',
    description: '',
    pics: [],
  });
  //Settings
  const difficulties = useSelector((state) => state.settings).find(
    (setting) => setting.difficulty
  );
  const options = difficulties.difficulty.map((diff) => {
    return { key: diff, text: diff };
  });
  // Modal
  const [isOpen, setIsOpen] = useState(false);
  const deletePicModal = {
    title: 'Confirmation',
    content: 'Etes-vous sûr de vouloir supprimer cette photo ?',
    primary: 'supprimer',
    secondary: 'annuler',
  };
  //Pic
  const [imageAsFile, setImageAsFile] = useState('');
  const handleImageAsFile = (e) => {
    setImageAsFile(e.target.files[0]);
  };

  /**
   * Handle pic upload to firebase, get pic url and add walk document to firebase db
   * @param {Object} walkToAdd
   */
  const doCreateWalk = (walk) => {
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
            try {
              dispatch(
                walkToUpdate
                  ? editWalk(
                      walk,
                      { name: imageAsFile.name, url: fireBaseUrl },
                      history
                    )
                  : addWalk(
                      walk,
                      { name: imageAsFile.name, url: fireBaseUrl },
                      history
                    )
              );
            } catch (e) {
              console.error('Error saving walk', e);
            }
          });
      }
    );
  };

  /**
   * Delete picture from storage, update walk document
   */
  const deletePic = () => {
    const picRef = storage.ref('pics').child(`${walkToUpdate.pics[0].name}`);
    picRef
      .delete()
      .then(() => setWalkToUpdate({ ...walkToUpdate, pics: [] }))
      .catch((e) => console.error('Error deleting picture'));

    dispatch(editWalk(walkToUpdate, { url: '', name: '' }, null));
    setImageAsFile('');
    setIsOpen(false);
  };

  /**
   * Update walk document without pic change
   * @param {Object} walk
   */
  const doUpdateWalk = (walk) => {
    dispatch(editWalk(walk, null, history));
  };

  return (
    <Card className="signin mt-5">
      <CardHeader>
        <h3>Ajouter une balade</h3>
      </CardHeader>
      <CardBody>
        <Form
          initialValues={walkToUpdate ? walkToUpdate : newWalk}
          onSubmit={(event) =>
            walkToUpdate
              ? imageAsFile
                ? doCreateWalk({ ...walkToUpdate, ...event })
                : doUpdateWalk({ ...walkToUpdate, ...event })
              : doCreateWalk({ ...event })
          }
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
                component={SelectField}
                placeholder="Difficulté"
                options={options}
              />
              <Field
                name="description"
                component={TextField}
                placeholder="Description"
                as="textarea"
                rows={3}
              />
              <Field
                name="sector"
                component={TextField}
                placeholder="Secteur"
              />
              <Field
                name="time"
                type="number"
                component={TextField}
                placeholder="Durée en heures"
              />
              <Field
                name="buggy"
                type="checkbox"
                label="Carrossable ? "
                component={CheckboxField}
                placeholder="Carrossable ?"
              />
              {walkToUpdate && (
                <>
                  {walkToUpdate.pics.length > 0 && walkToUpdate.pics[0]?.url && (
                    <>
                      <img
                        className="minpic"
                        src={walkToUpdate.pics[0]?.url}
                        alt={walkToUpdate.name}
                      />
                      <TiDelete
                        className="delete link"
                        onClick={() => setIsOpen(true)}
                      />
                    </>
                  )}
                </>
              )}

              <Row>
                <Col>Ajouter une photo :</Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <input type="file" onChange={handleImageAsFile} />
                </Col>
              </Row>
              <Row>
                <Col className="text-center mt-4">
                  <Button>{walkToUpdate ? 'Mettre à jour' : 'Ajouter'}</Button>
                </Col>
              </Row>
            </form>
          )}
        </Form>
        {isOpen && (
          <AlertModal
            isOpen={isOpen}
            content={deletePicModal}
            doPrimary={() => deletePic()}
            doSecondary={() => setIsOpen(false)}
          />
        )}
      </CardBody>
    </Card>
  );
};
