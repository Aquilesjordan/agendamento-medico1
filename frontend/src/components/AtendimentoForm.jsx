import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { api } from '../services/api';
  

function AtendimentoForm() {
  const [agendamentoId, setAgendamentoId] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [resultado, setResultado] = useState(null);
  const [data, setData] = useState('');

  const gerarAtendimento = async (e) => {
    e.preventDefault();

    api.get(`agendamentos?id=${agendamentoId}`).then((getresponse) => {
      const agendamento = getresponse.data[0]; 

      if (!agendamento) {
        alert('Agendamento não encontrado.');
        return;
      }

      api.post('atendimentos', {
        agendamentoId: agendamentoId,
        observacoes,
        dataAtendimento: agendamento.dataHora
      }).then((response) => {
        setResultado(response.data);
        alert('Atendimento gerado com sucesso!');
        setAgendamentoId('');
        setObservacoes('');
      }).catch((err) => {
        alert('Erro ao gerar atendimento.');
      });
    }).catch((err) => {
      alert('Erro ao buscar agendamento.');
    });
  };


  return (
    <Card>
      <Card.Body>
        <Card.Title>Gerar Atendimento</Card.Title>
        <Form onSubmit={gerarAtendimento}>
          <Form.Group className="mb-3">
            <Form.Label>ID do Agendamento</Form.Label>
            <Form.Control
              value={agendamentoId}
              onChange={e => setAgendamentoId(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Observações</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="warning">Marcar como Atendido</Button>
        </Form>

        {resultado && (
          <Alert variant="success" className="mt-4">
            <p><strong>Atendimento ID:</strong> {resultado.id}</p>
            <p><strong>Data:</strong> {new Date(resultado.dataAtendimento).toLocaleString()}</p>
            <p><strong>Observações:</strong> {resultado.observacoes}</p>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default AtendimentoForm;
