import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import { api } from '../services/api';

function EspecialidadesList({ onSelect }) {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    api.get('http://localhost:3001/especialidades')
      .then(response => setEspecialidades(response.data));
  }, []);

  return (
    <div>
      <h4>Especialidades</h4>
      <ListGroup>
        {especialidades.map(espec => (
          <ListGroup.Item
            key={espec.id}
            action
            onClick={() => onSelect && onSelect(espec)}
          >
            {espec.nome}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default EspecialidadesList;
