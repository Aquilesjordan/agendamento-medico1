import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import EspecialidadesPage from './pages/EspecialidadesPage';
import ConveniosPage from './pages/ConveniosPage';
import DisponibilidadesPage from './pages/DisponibilidadesPage';
import AgendamentoPage from './pages/AgendamentoPage';
import AtendimentosPage from './pages/AtendimentosPage';
import Home from './pages/Home';
import './App.css'; 

function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow">
        <Container>
          <Navbar.Brand as={NavLink} to="/">Agendamento Médico</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/especialidades">Especialidades</Nav.Link>
              <Nav.Link as={NavLink} to="/convenios">Convênios</Nav.Link>
              <Nav.Link as={NavLink} to="/disponibilidades">Disponibilidades</Nav.Link>
              <Nav.Link as={NavLink} to="/agendamentos">Agendamentos</Nav.Link>
              <Nav.Link as={NavLink} to="/atendimentos">Atendimentos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">
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
