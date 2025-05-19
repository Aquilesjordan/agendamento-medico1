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
  try {
    // Busca todos atendimentos e agendamentos
    const [resAtendimentos, resAgendamentos] = await Promise.all([
      api.get('/atendimentos'),
      api.get('/agendamentos'),
    ]);

    const atendimentosComPaciente = resAtendimentos.data.map(atendimento => {
      const agendamento = resAgendamentos.data.find(a => a.id === atendimento.agendamentoId);
      return {
        ...atendimento,
        paciente: agendamento?.paciente || '', // adiciona paciente se existir
      };
    });

    const filtrados = atendimentosComPaciente.filter(a => {
      if (!a.dataAtendimento) return false;

      const dataAtendimento = new Date(a.dataAtendimento);
      if (isNaN(dataAtendimento)) return false;

      const dataISO = dataAtendimento.toISOString().split('T')[0];
      const pacienteOK = !filtroPaciente || a.paciente.toLowerCase().includes(filtroPaciente.toLowerCase());
      const inicioOK = !dataInicio || dataISO >= dataInicio;
      const fimOK = !dataFim || dataISO <= dataFim;

      return pacienteOK && inicioOK && fimOK;
    });

    setAtendimentos(filtrados);
  } catch (err) {
    alert('Erro ao buscar atendimentos.');
  }
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
