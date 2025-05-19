import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { api } from '../services/api';

function AgendamentoForm() {
  const [paciente, setPaciente] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [convenios, setConvenios] = useState([]);
  const [especialidadesId, setEspecialidadesId] = useState('');
  const [convenioId, setConvenioId] = useState('');
  const [horario, setHorario] = useState('');
  const [data, setData] = useState('');
  const [medico, setMedico] = useState('');
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [mensagem, setMensagem] = useState('');

  dayjs.locale("pt-br");

  useEffect(() => {
    api.get('/especialidades').then(res => setEspecialidades(res.data));
    api.get('/convenios').then(res => setConvenios(res.data));
  }, []);

  const buscarHorarios = async () => {
    if (!especialidadesId || !data) return;

    try {
      const [resDisponibilidades, resAgendamentos] = await Promise.all([
        api.get('/disponibilidades'),
        api.get('/agendamentos'),
      ]);

      const disponibilidades = resDisponibilidades.data;
      const agendamentos = resAgendamentos.data;

      const diaSelecionado = dayjs(data).locale('pt-br').format('dddd').toLowerCase();

      const horariosFiltrados = disponibilidades
        .filter(h =>
          h.especialidadesId === (especialidadesId) &&
          h.diaSemana.toLowerCase() === diaSelecionado
        )
        .map(h => {
          const dataHoraCompleta = `${data}T${h.horaInicio}:00Z`;
          const agendamento = agendamentos.find(a => a.dataHora === dataHoraCompleta);

          return {
            ...h,
            ocupado: !!agendamento,
            paciente: agendamento?.paciente || null
          };
        });

      setHorariosDisponiveis(horariosFiltrados);
    } catch (err) {
      alert('Erro ao buscar horários.');
    }
  };

  const agendarConsulta = async (e) => {
    e.preventDefault();
    if (!paciente || !especialidadesId || !convenioId || !horario) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      await api.post('/agendamentos', {
        paciente,
        especialidadeId: (especialidadesId),
        convenioId: (convenioId),
        dataHora: `${data}T${horario}:00Z`
      });

      setMensagem('Consulta agendada com sucesso!');
      setPaciente('');
      setHorario('');
      buscarHorarios();
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
                <Form.Select value={especialidadesId} onChange={e => setEspecialidadesId(e.target.value)}>
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
                  value={h.horaInicio}
                  disabled={h.ocupado}
                >
                  {h.horaInicio} - {h.horaFim} {h.ocupado ? `(Ocupado por ${h.paciente})` : '(Disponível)'}
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
