import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MapForm } from './MapForm';

const MapModal = ({ isOpen, content, doPrimary, doSecondary }) => {
  const [modal, setModal] = useState(isOpen);
  const [position, setPosition] = useState([]);
  const toggle = () => setModal(!modal);

  const fromMapForm = (markerPosition) => {
    setPosition(markerPosition);
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className="mapmodal">
        <ModalHeader toggle={toggle}>
          Localiser le départ de la balade
        </ModalHeader>
        <ModalBody>
          <MapForm fromMapForm={fromMapForm} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => doPrimary(position)}>
            {content.primary}
          </Button>
          <Button color="secondary" onClick={doSecondary}>
            {content.secondary}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MapModal;
