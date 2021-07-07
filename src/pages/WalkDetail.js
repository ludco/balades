import React, { useState } from 'react';
import { BsStopwatch } from 'react-icons/bs';
import { HiOutlineClipboard, HiOutlineClipboardCheck } from 'react-icons/hi';
import { MdPlace } from 'react-icons/md';
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Row, Tooltip } from 'reactstrap';

import defaut from '../assets/defaut.jpg';
import useCopyToClipboard from '../utils/useCopyToClipboard';

export const WalkDetail = ({ history }) => {
  const walk = history.location.state;
  const [isCopied, handleCopy] = useCopyToClipboard(2000);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const topo =
    "Lorem Elsass ipsum schnaps salu libero, gewurztraminer Mauris Salut bisamme Hans picon bière placerat ante tristique knack Verdammi rucksack id, vulputate risus, mamsell hopla et Christkindelsmärik id Coopé de Truchtersheim gal Chulia Roberstau leo yeuh. Chulien dui munster Yo dû. Kabinetpapier kougelhopf consectetur ac Salu bissame quam. amet ftomi! Huguette hopla pellentesque senectus aliquam ullamcorper rhoncus sed Pfourtz ! blottkopf, Spätzle sed und Gal. dolor quam, vielmols, Heineken s'guelt amet, lacus porta merci vielmols tellus eget flammekueche réchime lotto-owe rossbolla non DNA, semper ch'ai messti de Bischheim adipiscing leo turpis, kartoffelsalad Miss Dahlias sit commodo kuglopf Carola ornare geht's turpis Morbi leverwurscht elit Racing. hopla morbi  suspendisse elementum non sit barapli Gal ! météor gravida Pellentesque mänele ornare Richard Schirmeck nullam Oberschaeffolsheim auctor, hopla habitant sagittis purus mollis sit tellus libero, amet hoplageiss eleifend baeckeoffe geïz dignissim in, wie knepfle Oberschaeffolsheim Wurschtsalad ac schneck bissame nüdle condimentum bredele hop so tchao bissame schpeck libero. wurscht Strasbourg chambon jetz gehts los varius";

  return (
    <Container>
      <Card className="mt-4">
        <CardBody>
          <Row>
            <Col lg="5" md="4" sm="4" xs="12">
              {walk.pics[0]?.url ? (
                <img className="pic" src={walk.pics[0]?.url} alt={`${walk.name} `} />
              ) : (
                <img className="pic" src={defaut} alt={'rando'} width="100" height="100" />
              )}
            </Col>
            <Col lg="7" md="8" sm="8" xs="12">
              <Row>
                <Col md="9">
                  <CardTitle tag="h5">{walk.name}</CardTitle>
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
      <div className="p-4">
        <Row>
          <Col md={11}>
            <h5>Topo</h5>
          </Col>
          <Col md={1}>
            <Tooltip placement="left" isOpen={tooltipOpen} target="topo" toggle={toggle}>
              {isCopied ? 'copied!' : 'Copy topo !'}
            </Tooltip>
            <div color="link" onClick={() => handleCopy(topo)} id="topo">
              {isCopied ? <HiOutlineClipboardCheck /> : <HiOutlineClipboard />}
            </div>
          </Col>
        </Row>
        <Row>{topo}</Row>
      </div>
    </Container>
  );
};
