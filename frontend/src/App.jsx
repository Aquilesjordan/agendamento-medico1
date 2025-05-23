import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EspecialidadesPage from './pages/EspecialidadesPage';
import ConveniosPage from './pages/ConveniosPage';
import DisponibilidadesPage from './pages/DisponibilidadesPage';
import AgendamentoPage from './pages/AgendamentoPage';
import AtendimentosPage from './pages/AtendimentosPage';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">Agendamento Médico</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/especialidades">Especialidades</Nav.Link>
              <Nav.Link as={Link} to="/convenios">Convênios</Nav.Link>
              <Nav.Link as={Link} to="/disponibilidades">Disponibilidades</Nav.Link>
              <Nav.Link as={Link} to="/agendamentos">Agendamentos</Nav.Link>
              <Nav.Link as={Link} to="/atendimentos">Atendimentos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/especialidades" element={<EspecialidadesPage />} />
          <Route path="/convenios" element={<ConveniosPage />} />
          <Route path="/disponibilidades" element={<DisponibilidadesPage />} />
          <Route path="/agendamentos" element={<AgendamentoPage />} />
          <Route path="/atendimentos" element={<AtendimentosPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
