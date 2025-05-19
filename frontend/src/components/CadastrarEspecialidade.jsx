import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';
import { api } from '../services/api';

function CadastrarEspecialidade() {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim()) return alert('Informe um nome.');

    try {
      await api.post('/especialidades', { nome });
      alert('Especialidade cadastrada com sucesso!');
      setNome('');
      window.location.reload();
    } catch (err) {
      alert('Erro ao cadastrar especialidade.');
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Cadastrar Especialidade</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Cardiologia"
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-2">
            Cadastrar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CadastrarEspecialidade;
