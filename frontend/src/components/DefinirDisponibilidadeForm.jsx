import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';


function DefinirDisponibilidadeForm() {
  const [medico, setMedico] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadesId, setEspecialidadesId] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [duracaoConsultaMinutos, setDuracaoConsultaMinutos] = useState(30);

  useEffect(() => {
    axios.get('http://localhost:3001/especialidades')
      .then(res => setEspecialidades(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!medico || !especialidadesId || !diaSemana || !horaInicio || !horaFim || !duracaoConsultaMinutos) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      await axios.post('http://localhost:3001/disponibilidades', {
        medico,
        especialidadesId: (especialidadesId),
        diaSemana,
        horaInicio,
        horaFim,
        duracaoConsultaMinutos: parseInt(duracaoConsultaMinutos)
      });

      alert('Disponibilidade cadastrada com sucesso!');
      setMedico('');
      setEspecialidadesId('');
      setDiaSemana('');
      setHoraInicio('');
      setHoraFim('');
      setDuracaoConsultaMinutos(30);
    } catch (err) {
      alert('Erro ao cadastrar disponibilidade.');
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Definir Disponibilidade de Horário</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Médico</Form.Label>
            <Form.Control
              type="text"
              value={medico}
              onChange={e => setMedico(e.target.value)}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Especialidade</Form.Label>
                <Form.Select value={especialidadesId} onChange={e => setEspecialidadesId(e.target.value)}>
                  <option value="">Selecione</option>
                  {especialidades.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Dia da Semana</Form.Label>
                <Form.Select value={diaSemana} onChange={e => setDiaSemana(e.target.value)}>
                  <option value="">Selecione</option>
                  <option value="Segunda-feira">Segunda-feira</option>
                  <option value="Terça-feira">Terça-feira</option>
                  <option value="Quarta-feira">Quarta-feira</option>
                  <option value="Quinta-feira">Quinta-feira</option>
                  <option value="Sexta-feira">Sexta-feira</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Hora Início</Form.Label>
                <Form.Control type="time" value={horaInicio} onChange={e => setHoraInicio(e.target.value)} />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Hora Fim</Form.Label>
                <Form.Control type="time" value={horaFim} onChange={e => setHoraFim(e.target.value)} />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Duração da Consulta (min)</Form.Label>
                <Form.Control
                  type="number"
                  value={duracaoConsultaMinutos}
                  onChange={e => setDuracaoConsultaMinutos(e.target.value)}
                  min={5}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="success">Salvar Disponibilidade</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default DefinirDisponibilidadeForm;
