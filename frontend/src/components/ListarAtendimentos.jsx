import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';
import { api } from '../services/api';
function ListarAtendimentos() {
  const [atendimentos, setAtendimentos] = useState([]);
  const [filtroPaciente, setFiltroPaciente] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const buscarAtendimentos = async () => {
    const params = new URLSearchParams();
    if (filtroPaciente) params.append('paciente', filtroPaciente);
    if (dataInicio) params.append('dataInicio', dataInicio);
    if (dataFim) params.append('dataFim', dataFim);

    const response = await api.get(`/atendimentos?${params.toString()}`);
    setAtendimentos(response.data);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Listar Atendimentos</Card.Title>

        <Form className="mb-3 d-flex gap-3 flex-wrap">
          <Form.Control
            placeholder="Paciente"
            value={filtroPaciente}
            onChange={e => setFiltroPaciente(e.target.value)}
          />
          <Form.Control
            type="date"
            value={dataInicio}
            onChange={e => setDataInicio(e.target.value)}
          />
          <Form.Control
            type="date"
            value={dataFim}
            onChange={e => setDataFim(e.target.value)}
          />
          <Button variant="primary" onClick={buscarAtendimentos}>Buscar</Button>
        </Form>

        <ListGroup>
          {atendimentos.map(a => (
            <ListGroup.Item key={a.id}>
              <strong>Agendamento #{a.agendamentoId}</strong><br />
              <small>{new Date(a.dataAtendimento).toLocaleString()}</small><br />
              <em>{a.observacoes || 'Sem observações'}</em>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default ListarAtendimentos;
