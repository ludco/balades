import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AlertModal = ({ isOpen, content, doPrimary, doSecondary }) => {
  const [modal, setModal] = useState(isOpen);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{content.title}</ModalHeader>
        <ModalBody>{content.content}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={doPrimary}>
            {content.primary}
          </Button>{' '}
          <Button color="secondary" onClick={doSecondary}>
            {content.secondary}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AlertModal;
