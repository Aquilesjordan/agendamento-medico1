import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { api } from '../services/api';

function EspecialidadesList({ onSelect }) {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    api.get('/especialidades')
      .then(response => setEspecialidades(response.data));
  }, []);

  const especialidadesOrdenadas = [...especialidades].sort((a, b) =>
    a.nome.localeCompare(b.nome)
  );

  return (
    <div>
      <h4>Especialidades</h4>
      <ListGroup>
        {especialidadesOrdenadas.map(espec => (
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
