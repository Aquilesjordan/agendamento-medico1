import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { api } from '../services/api';

function ConveniosList({ onSelect }) {
  const [convenios, setConvenios] = useState([]);

  useEffect(() => {
    api.get('/convenios')
      .then(response => setConvenios(response.data));
  }, []);

  const conveniosOrdenados = [...convenios].sort((a, b) =>
    a.nome.localeCompare(b.nome)
  );

  return (
    <div>
      <h4>Convênios</h4>
      <ListGroup>
        {conveniosOrdenados.map(conv => (
          <ListGroup.Item
            key={conv.id}
            action
            onClick={() => onSelect && onSelect(conv)}
          >
            {conv.nome}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default ConveniosList;
