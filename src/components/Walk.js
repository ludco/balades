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
              Difficulté : {walk.difficulty}
            </CardSubtitle>
            <CardText>{walk.description}</CardText>
            <Button color="primary">Ajouter aux favoris</Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
