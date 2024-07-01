import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import api from "api/Requisicoes";
import { useUser } from '../Context/UseContext';
import { ColunaTabelaResposta } from './variaveis/ColunaTabelaResposta';
import EditarResposta from './components/EditarResposta';
import ExcluirResposta from './components/ExcluirResposta';
export default function Respostas() {
  const { resposta, setResposta, perguntaSelecionada, respostaSelecionada, setRespostaSelecionada, showEditarResposta, setEditarResposta, handleShowEditarResposta, handleShowExcluirResposta, showExcluirResposta } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`resposta/${perguntaSelecionada.id }`);
        if (response.status === 200) {
          setResposta(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };
    fetchData();
  }, []);
  
  const columns = ColunaTabelaResposta("Opções", ["Editar","Excluir"]);
  const data = resposta;
  return (
    <>
    <div style={{ marginTop: 70 }}>
        <DataTable
          columns={columns}
          data={data}
          title={perguntaSelecionada?.texto || 'Pergunta'}
        />
      </div>
      <EditarResposta show={showEditarResposta} onHide={handleShowEditarResposta}></EditarResposta>
      <ExcluirResposta show={showExcluirResposta} onHide={handleShowExcluirResposta}></ExcluirResposta>
    </>
    

  );
}
