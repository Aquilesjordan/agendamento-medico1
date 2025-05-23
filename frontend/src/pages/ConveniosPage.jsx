import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CadastrarConvenio from '../components/CadastrarConvenio';
import ConveniosList from '../components/ConveniosList';

function ConveniosPage() {
  return (
    <>
      <h2>Gestão de Convênios</h2>
      <Row>
        <Col md={6}><CadastrarConvenio /></Col>
        <Col md={6}><ConveniosList /></Col>
      </Row>
    </>
  );
}

export default ConveniosPage;
