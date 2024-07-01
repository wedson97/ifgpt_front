import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import { useUser } from '../Context/UseContext';
import ResponderModal from "./components/ResponderModal";
import AdicionarPergunta from './components/AdicionarPergunta';
import api from "api/Requisicoes";
import { ColunaTabelaPergunta } from './variaveis/ColunaTabelaPergunta';
import EditarPergunta from './components/EditarPergunta';
import ExcluirPergunta from './components/ExcluirPergunta';

export default function Perguntas() {
  const { pergunta, setPergunta,resposta, setResposta, show, perguntaSelecionada, handleClose, showEditar, handleShowEditar, showExcluir, setShowExcluir, handleShowExcluir } = useUser();
  const [showAdicionar, setShowAdicionar] = useState(false);

  const handleShowAdicionar = () => setShowAdicionar(true);
  const handleCloseAdicionar = () => setShowAdicionar(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('mensagens');
        if (response.status === 200) {
          setPergunta(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  
  const columns = ColunaTabelaPergunta("Opções", ["Responder","Ver Respostas","Editar","Excluir"]);
  const data = pergunta;
  return (
    <>
      <div style={{ marginTop: 70 }}>
        <DataTable
          columns={columns}
          data={data}
          title={<Button variant="primary" onClick={handleShowAdicionar}>Criar pergunta</Button>}
        />
      </div>
      <AdicionarPergunta show={showAdicionar} onHide={handleCloseAdicionar} />
      <ResponderModal show={show} onHide={handleClose} perguntaSelecionada={perguntaSelecionada} />
      <EditarPergunta show={showEditar} onHide={handleShowEditar}></EditarPergunta>
      <ExcluirPergunta show={showExcluir} onHide={handleShowExcluir}></ExcluirPergunta>
    </>
  );
}
