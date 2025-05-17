import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, Alert } from 'react-bootstrap';

function AtendimentoForm() {
  const [agendamentoId, setAgendamentoId] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [resultado, setResultado] = useState(null);

  const gerarAtendimento = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/atendimentos', {
        agendamentoId: parseInt(agendamentoId),
        observacoes
      });
      setResultado(response.data);
      alert('Atendimento gerado com sucesso!');
      setAgendamentoId('');
      setObservacoes('');
    } catch (err) {
      alert('Erro ao gerar atendimento.');
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Gerar Atendimento</Card.Title>
        <Form onSubmit={gerarAtendimento}>
          <Form.Group className="mb-3">
            <Form.Label>ID do Agendamento</Form.Label>
            <Form.Control
              type="number"
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
