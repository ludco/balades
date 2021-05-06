/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import 'firebase/storage';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Spinner,
  Toast,
} from 'reactstrap';
import { Field, Form } from 'react-final-form';
import TextField from '../FormFields/TextField';
import CheckboxField from '../FormFields/CheckboxField';
import { useDispatch, useSelector } from 'react-redux';
import { geo, storage } from '../firebase.config';
import { TiDelete } from 'react-icons/ti';
import AlertModal from './AlertModal';
import SelectField from '../FormFields/SelectField';
import { deletePic } from '../firebaseRequests';
import { UserContext } from '../providers/UserProvider';
import MapModal from './MapModal';
import { MdPlace } from 'react-icons/md';
import {
  doCreateWalk,
  doEditWalk,
  setLoadingTrue,
  showWarningToast,
} from '../actions';

export const WalkForm = ({ history, settings }) => {
  const dispatch = useDispatch();
  const userCtxt = useContext(UserContext);
  // Toast
  const toast = useSelector((state) => state.toast);
  const [toastVisible, setToastVisible] = useState(toast);

  useEffect(() => {
    if (toastVisible.status) {
      setTimeout(() => {
        setToastVisible({ ...toastVisible, status: false });
      }, 2000);
    }
  }, []);
  //Settings
  const difficulties = settings.find((setting) => setting.difficulty);
  const options = difficulties.difficulty.map((diff) => {
    return { key: diff, text: diff };
  });
  // Walk
  const [walkToUpdate, setWalkToUpdate] = useState(history.location.state);
  const [newWalk, setNewWalk] = useState({
    name: '',
    difficulty: '',
    sector: '',
    latlng: null,
    description: '',
    pics: [],
  });
  // Modal
  const [isOpen, setIsOpen] = useState(false);
  const deletePicModal = {
    title: 'Confirmation',
    content: 'Etes-vous sûr de vouloir supprimer cette photo ?',
    primary: 'supprimer',
    secondary: 'annuler',
  };
  // MapModal
  const [isMapOpen, setIsMapOpen] = useState(false);
  //Form
  const required = (value) => (value ? null : 'Ce champs est requis');
  //Pic
  const [imageAsFile, setImageAsFile] = useState('');
  const handleImageAsFile = (e) => {
    setImageAsFile(e.target.files[0]);
  };
  //Position
  const [latlng, setLatlng] = useState(
    walkToUpdate ? walkToUpdate.latlng : newWalk.latlng
  );
  const loading = useSelector((state) => state.loading);

  /**
   * Handle pic upload to firebase, get pic url and add walk document to firebase db
   * @param {Object} walkToAdd
   */
  const HandleCreateWalk = async (walk) => {
    dispatch(setLoadingTrue());
    if (imageAsFile === '') {
      console.error(`Not an image, the image file is a ${typeof imageAsFile}`);
      dispatch(
        walkToUpdate
          ? doEditWalk({
              walkToUpdate: { ...walk, latlng },
              imageData: null,
              history: history,
            })
          : doCreateWalk({
              walkToAdd: { ...walk, latlng, userId: userCtxt.user.uid },
              imageData: null,
              history: history,
            })
      );
    } else {
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
          dispatch(showWarningToast());
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
                    ? doEditWalk({
                        walkToUpdate: { ...walk, latlng },
                        imageData: { name: imageAsFile.name, url: fireBaseUrl },
                        history: history,
                      })
                    : doCreateWalk({
                        walkToAdd: {
                          ...walk,
                          latlng,
                          userId: userCtxt.user.uid,
                        },
                        imageData: { name: imageAsFile.name, url: fireBaseUrl },
                        history: history,
                      })
                );
              } catch (e) {
                console.error('Error saving walk', e);
                dispatch(showWarningToast());
              }
            });
        }
      );
    }
  };

  const removePic = async () => {
    try {
      deletePic(walkToUpdate);
      setWalkToUpdate({ ...walkToUpdate, latlng, pics: [] });
      dispatch(
        doEditWalk({
          walkToUpdate: { ...walkToUpdate, latlng },
          imageData: { url: '', name: '' },
        })
      );
      setImageAsFile('');
      setIsOpen(false);
    } catch (e) {
      console.error('Error updating walk, e');
      dispatch(showWarningToast());
    }
  };

  /**
   * Update walk document without pic change
   * @param {Object} walk
   */
  const HandleUpdateWalk = (walk) => {
    try {
      dispatch(
        doEditWalk({
          walkToUpdate: { ...walk, latlng },
          imageData: null,
          history: history,
        })
      );
    } catch (e) {
      console.error('Error updating walk', e);
      dispatch(showWarningToast());
    }
  };

  /**
   * Get positions from DraggableMarker and create geoPoint for firebase
   * @param {Object} position
   */
  const getPosition = (position) => {
    setLatlng(new geo.GeoPoint(position.lat, position.lng));
    setIsMapOpen(false);
  };

  return (
    <Card className="signin mt-5">
      <Toast
        isOpen={toastVisible.status}
        className={`toast ${toastVisible.type}`}
      ></Toast>
      <CardHeader>
        <h3>Ajouter une balade</h3>
      </CardHeader>
      <CardBody>
        <Form
          initialValues={walkToUpdate ? walkToUpdate : newWalk}
          onSubmit={(event) =>
            walkToUpdate
              ? imageAsFile
                ? HandleCreateWalk({ ...walkToUpdate, ...event })
                : HandleUpdateWalk({ ...walkToUpdate, ...event })
              : HandleCreateWalk({ ...event })
          }
          onChange={(event) => setNewWalk(event)}
        >
          {({ handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <Field
                name="name"
                component={TextField}
                placeholder="Nom de la balade"
                validate={required}
              />
              <Field
                name="difficulty"
                component={SelectField}
                placeholder="Difficulté"
                options={options}
                validate={required}
              />
              <Field
                name="description"
                component={TextField}
                placeholder="Description"
                as="textarea"
                rows={3}
                validate={required}
              />
              <Row>
                <Col md="7">
                  <Field
                    name="sector"
                    component={TextField}
                    placeholder="Secteur"
                    validate={required}
                  />
                </Col>
                <Col md="3">
                  {latlng ? (
                    <Button outline onClick={() => setIsMapOpen(true)}>
                      <MdPlace /> OK !
                    </Button>
                  ) : (
                    <Button onClick={() => setIsMapOpen(true)}>
                      Localiser
                    </Button>
                  )}
                </Col>
              </Row>
              <Field
                name="time"
                type="number"
                component={TextField}
                placeholder="Durée en heures"
                validate={required}
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
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageAsFile}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="text-center mt-4">
                  {loading ? (
                    <Spinner color="primary" />
                  ) : (
                    <Button>
                      {walkToUpdate ? 'Mettre à jour' : 'Ajouter'}
                    </Button>
                  )}
                </Col>
              </Row>
            </form>
          )}
        </Form>
        {isOpen && (
          <AlertModal
            isOpen={isOpen}
            content={deletePicModal}
            doPrimary={() => removePic()}
            doSecondary={() => setIsOpen(false)}
          />
        )}
        {isMapOpen && (
          <MapModal
            isOpen={isMapOpen}
            content={{
              primary: 'Valider',
              secondary: 'Annuler',
              walk: walkToUpdate ? walkToUpdate : null,
            }}
            doPrimary={getPosition}
            doSecondary={() => setIsMapOpen(false)}
          />
        )}
      </CardBody>
    </Card>
  );
};
