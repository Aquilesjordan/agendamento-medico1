import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { api } from '../services/api';

function AtendimentoForm() {
  const [agendamentoId, setAgendamentoId] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [resultado, setResultado] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);
  const [atendimentos, setAtendimentos] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get('/agendamentos'),
      api.get('/atendimentos')
    ]).then(([resAgendamentos, resAtendimentos]) => {
      const atendimentosExistentes = resAtendimentos.data;
      const agendamentosOrdenados = resAgendamentos.data
        .filter(ag => !atendimentosExistentes.find(at => String(at.agendamentoId) === String(ag.id)))
        .sort((a, b) => a.paciente.localeCompare(b.paciente));

      setAgendamentos(agendamentosOrdenados);
      setAtendimentos(atendimentosExistentes);
    });
  }, []);

  const gerarAtendimento = async (e) => {
    e.preventDefault();

    const agendamento = agendamentos.find(a => String(a.id) === String(agendamentoId));

    if (!agendamento) {
      alert('Agendamento não encontrado.');
      return;
    }

    try {
      const response = await api.post('/atendimentos', {
        agendamentoId: agendamento.id,
        observacoes,
        dataAtendimento: agendamento.dataHora
      });

      setResultado(response.data);
      alert('Atendimento gerado com sucesso!');

      // Remover agendamento da lista após atendimento
      setAgendamentos(prev => prev.filter(a => a.id !== agendamento.id));

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
            <Form.Label>Selecione o Agendamento</Form.Label>
            <Form.Select
              value={agendamentoId}
              onChange={e => setAgendamentoId(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              {agendamentos.length === 0 && (
                <option disabled value="">Nenhum agendamento disponível</option>
              )}
              {agendamentos.map(a => (
                <option key={a.id} value={a.id}>
                  {a.paciente} - {new Date(a.dataHora).toLocaleString()} (ID: {a.id})
                </option>
              ))}
            </Form.Select>
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

          <Button type="submit" variant="warning" disabled={agendamentos.length === 0}>
            Marcar como Atendido
          </Button>
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
