import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import { api } from '../services/api';

function ConveniosList({ onSelect }) {
  const [convenios, setConvenios] = useState([]);

  useEffect(() => {
    api.get('/convenios')
      .then(response => setConvenios(response.data));
  }, []);

  return (
    <div>
      <h4>Convênios</h4>
      <ListGroup>
        {convenios.map(conv => (
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
