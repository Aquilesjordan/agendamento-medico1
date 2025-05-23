import React from 'react';
import AgendamentoForm from '../components/AgendamentoForm';
import AgendamentosList from '../components/AgendamentosList';

function AgendamentoPage() {
  return (
    <>
      <h2>Gestão de Agendamentos</h2>
      <AgendamentoForm />
      <hr className="my-4" />
      <AgendamentosList />
    </>
  );
}

export default AgendamentoPage;
