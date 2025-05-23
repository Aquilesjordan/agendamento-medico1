import React from 'react';
import AtendimentoForm from '../components/AtendimentoForm';
import ListarAtendimentos from '../components/ListarAtendimentos';

function AtendimentosPage() {
  return (
    <>
      <h2>Gestão de Atendimentos</h2>
      <AtendimentoForm />
      <hr className="my-4" />
      <ListarAtendimentos />
    </>
  );
}

export default AtendimentosPage;
