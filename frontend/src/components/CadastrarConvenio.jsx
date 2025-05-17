import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';

function CadastrarConvenio() {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim()) return alert('Informe um nome.');

    try {
      await axios.post('http://localhost:3001/convenios', { nome });
      alert('Convênio cadastrado com sucesso!');
      setNome('');
    } catch (err) {
      alert('Erro ao cadastrar convênio.');
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Cadastrar Convênio</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Unimed"
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

export default CadastrarConvenio;
