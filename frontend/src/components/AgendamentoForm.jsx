import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';

function AgendamentoForm() {
  const [paciente, setPaciente] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [convenios, setConvenios] = useState([]);
  const [especialidadeId, setEspecialidadeId] = useState('');
  const [convenioId, setConvenioId] = useState('');
  const [horario, setHorario] = useState('');
  const [data, setData] = useState('');
  const [medico, setMedico] = useState('');
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/especialidades')
      .then(res => setEspecialidades(res.data));
    axios.get('http://localhost:3001/convenios')
      .then(res => setConvenios(res.data));
  }, []);

  const buscarHorarios = async () => {
    if (!especialidadeId || !data) return;

    try {
      const response = await axios.post('http://localhost:3001/disponibilidades', {
        especialidadeId: parseInt(especialidadeId),
        data,
        medico
      });
      setHorariosDisponiveis(response.data);
    } catch (err) {
      alert('Erro ao buscar horários.');
    }
  };

  const agendarConsulta = async (e) => {
    e.preventDefault();
    if (!paciente || !especialidadeId || !convenioId || !horario) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      await axios.post('http://localhost:3001/agendamentos', {
        paciente,
        especialidadeId: parseInt(especialidadeId),
        convenioId: parseInt(convenioId),
        dataHora: `${data}T${horario}:00Z`
      });

      setMensagem('Consulta agendada com sucesso!');
      setPaciente('');
      setHorario('');
      buscarHorarios(); // atualiza disponibilidade
    } catch (err) {
      alert('Erro ao agendar consulta.');
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Agendar Consulta</Card.Title>

        {mensagem && <Alert variant="success">{mensagem}</Alert>}

        <Form onSubmit={agendarConsulta}>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Paciente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Paciente"
              value={paciente}
              onChange={e => setPaciente(e.target.value)}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Especialidade</Form.Label>
                <Form.Select value={especialidadeId} onChange={e => setEspecialidadeId(e.target.value)}>
                  <option value="">Selecione</option>
                  {especialidades.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Convênio</Form.Label>
                <Form.Select value={convenioId} onChange={e => setConvenioId(e.target.value)}>
                  <option value="">Selecione</option>
                  {convenios.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Data</Form.Label>
                <Form.Control type="date" value={data} onChange={e => setData(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Médico (opcional)</Form.Label>
                <Form.Control type="text" value={medico} onChange={e => setMedico(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button variant="info" onClick={buscarHorarios}>Buscar Horários</Button>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Horário</Form.Label>
            <Form.Select value={horario} onChange={e => setHorario(e.target.value)}>
              <option value="">Selecione um horário</option>
              {horariosDisponiveis.map((h, index) => (
                <option
                  key={index}
                  value={h.disponivel ? h.horaInicio : ''}
                  disabled={!h.disponivel}
                >
                  {h.horaInicio} - {h.horaFim}
                  {h.disponivel ? ' (Disponível)' : ` (Ocupado por ${h.paciente})`}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="success">Agendar</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AgendamentoForm;
