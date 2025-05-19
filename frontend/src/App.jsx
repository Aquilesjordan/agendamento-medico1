import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EspecialidadesList from './components/EspecialidadesList';
import ConveniosList from './components/ConveniosList';
import CadastrarEspecialidade from './components/CadastrarEspecialidade';
import CadastrarConvenio from './components/CadastrarConvenio';
import AgendamentoForm from './components/AgendamentoForm';
import AgendamentosList from './components/AgendamentosList';
import AtendimentoForm from './components/AtendimentoForm';
import DefinirDisponibilidadeForm from './components/DefinirDisponibilidadeForm';
import ListarAtendimentos from './components/ListarAtendimentos';
import './App.css'

function App() {
  return (
    <Container className="my-4">
      
      <h1 className="text-center mb-4 text-primary">Sistema de Agendamento Médico</h1>

      <Row>
        <Col md={6}><CadastrarEspecialidade /></Col>
        <Col md={6}><CadastrarConvenio /></Col>
        
      </Row>

      <Row className="mb-4">
        <Col md={6}><EspecialidadesList /></Col>
        <Col md={6}><ConveniosList /></Col>
      </Row>

      <DefinirDisponibilidadeForm />
      <hr className="my-5" />
      <AgendamentoForm />
      <hr className="my-5" />
      <AgendamentosList />
      <hr className="my-5" />
      <AtendimentoForm />
      <hr className="my-5" />
      <ListarAtendimentos/>

    </Container>
  );
}

export default App;
