import React from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from 'reactstrap';
import { BsStopwatch } from 'react-icons/bs';
import { MdPlace } from 'react-icons/md';

export const Walk = ({ walk }) => {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col sm="3">
            <img className="pic" src={walk.pics[0]} alt={`${walk.name} `} />
          </Col>
          <Col>
            <CardTitle tag="h5">{walk.name}</CardTitle>

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
    </Card>
  );
};
