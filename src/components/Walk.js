import React, { useContext, useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';
import { BsStopwatch } from 'react-icons/bs';
import { MdPlace } from 'react-icons/md';
import { BiEdit, BiTrash } from 'react-icons/bi';
import defaut from '../assets/defaut.jpg';
import AlertModal from './AlertModal';
import { deletePic } from '../firebaseRequests';
import { useDispatch } from 'react-redux';
import { UserContext } from '../providers/UserProvider';
import { doRemoveWalk, showWarningToast } from '../actions';

export const Walk = ({ walk, history }) => {
  const dispatch = useDispatch();
  const userCtxt = useContext(UserContext);
  // Modal
  const [isOpen, setIsOpen] = useState(false);
  const deletePicModal = {
    title: 'Confirmation',
    content: 'Etes-vous sûr de vouloir supprimer cette balade ?',
    primary: 'supprimer',
    secondary: 'annuler',
  };

  /**
   * Delete walk (and pic from storage)
   */
  const deleteWalk = () => {
    try {
      if (walk.pics[0]?.name) deletePic(walk);
      dispatch(doRemoveWalk());
      setIsOpen(false);
    } catch (e) {
      console.error('Error removing walk', e);
      dispatch(showWarningToast());
    }
  };

  return (
    <Card>
      <CardBody>
        <Row>
          <Col lg="5" md="4" sm="4" xs="12">
            {walk.pics[0]?.url ? (
              <img
                className="pic"
                src={walk.pics[0]?.url}
                alt={`${walk.name} `}
              />
            ) : (
              <img
                className="pic"
                src={defaut}
                alt={'rando'}
                width="100"
                height="100"
              />
            )}
          </Col>
          <Col lg="7" md="8" sm="8" xs="12">
            <Row>
              <Col md="9">
                <CardTitle tag="h5">{walk.name}</CardTitle>
              </Col>
              {walk.userId === userCtxt.user?.uid && (
                <Col className="text-right" md="3">
                  <Button
                    color="link"
                    onClick={() => history.push('/add', walk)}
                  >
                    <BiEdit />
                  </Button>
                  <Button color="link" onClick={() => setIsOpen(true)}>
                    <BiTrash />
                  </Button>
                </Col>
              )}
            </Row>

            <CardSubtitle tag="h6" className="mb-2 text-muted">
              <span>Difficulté : {walk.difficulty}</span>
              <span className="ml-4">
                <BsStopwatch /> {walk.time}h
              </span>
            </CardSubtitle>
            <CardText>{walk.description}</CardText>
            <CardSubtitle>
              <MdPlace />
              <span className="ml-1">{walk.sector}</span>
            </CardSubtitle>
          </Col>
        </Row>
      </CardBody>
      {isOpen && (
        <AlertModal
          isOpen={isOpen}
          content={deletePicModal}
          doPrimary={() => deleteWalk()}
          doSecondary={() => setIsOpen(false)}
        />
      )}
    </Card>
  );
};
