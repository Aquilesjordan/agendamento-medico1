import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CadastrarEspecialidade from '../components/CadastrarEspecialidade';
import EspecialidadesList from '../components/EspecialidadesList';

function EspecialidadesPage() {
  return (
    <>
      <h2>Gestão de Especialidades</h2>
      <Row>
        <Col md={6}><CadastrarEspecialidade /></Col>
        <Col md={6}><EspecialidadesList /></Col>
      </Row>
    </>
  );
}

export default EspecialidadesPage;
