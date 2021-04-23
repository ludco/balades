import React from 'react';
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
import { BiEdit } from 'react-icons/bi';
import defaut from '../assets/defaut.jpg';

export const Walk = ({ walk, history }) => {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col md="3" sm="8">
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
          <Col md="9" sm="12">
            <Row>
              <Col>
                <CardTitle tag="h5">{walk.name}</CardTitle>
              </Col>
              <Col className="text-right">
                <Button color="link" onClick={() => history.push('/add', walk)}>
                  <BiEdit />
                </Button>
              </Col>
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
    </Card>
  );
};
