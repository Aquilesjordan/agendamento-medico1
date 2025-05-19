import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';
import { api } from '../services/api';

function AgendamentosList() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [filtroPaciente, setFiltroPaciente] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const buscarAgendamentos = async () => {
  try {
    const response = await api.get(`/agendamentos`);
    let dados = response.data;

    if (filtroPaciente) {
      dados = dados.filter(a =>
        a.paciente?.toLowerCase().includes(filtroPaciente.toLowerCase())
      );
    }

    if (dataInicio) {
      dados = dados.filter(a => new Date(a.dataHora) >= new Date(dataInicio));
    }

    if (dataFim) {
      const dataFimCompleta = new Date(dataFim);
      dataFimCompleta.setHours(23, 59, 59, 999);
      dados = dados.filter(a => new Date(a.dataHora) <= dataFimCompleta);
    }

    setAgendamentos(dados);
  } catch (err) {
    alert("Erro ao buscar agendamentos.");
  }
};


  return (
    <Card>
      <Card.Body>
        <Card.Title>Agendamentos</Card.Title>

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
          <Button variant="primary" onClick={buscarAgendamentos}>Buscar</Button>
        </Form>

        <ListGroup>
          {agendamentos.map(a => (
            <ListGroup.Item key={a.id}>
              <strong>{a.paciente}</strong> - {a.especialidadeNome} ({a.convenioNome})<br />
              <small>{new Date(a.dataHora).toLocaleString()}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default AgendamentosList;
