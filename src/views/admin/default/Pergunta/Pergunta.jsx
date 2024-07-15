import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';
import ResponderModal from "./components/ResponderModal";
import AdicionarPergunta from './components/AdicionarPergunta';
import api from "api/Requisicoes";
import { ColunaTabelaPergunta } from './variaveis/ColunaTabelaPergunta';
import EditarPergunta from './components/EditarPergunta';
import ExcluirPergunta from './components/ExcluirPergunta';
import SelecionarSetor from './components/SelecionarSetor';
import { useUser } from '../Context/UseContext';

export default function Perguntas() {
  const {pergunta, perguntaSelecionada, setor,setSetores, setPergunta, show, handleClose, showEditar, handleShowEditar, showExcluir, handleShowExcluir} = useUser()
  const [showAdicionar, setShowAdicionar] = useState(false);

  const handleShowAdicionar = () => setShowAdicionar(true);
  const handleCloseAdicionar = () => setShowAdicionar(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const perguntas = await api.get(`mensagens/setores/${setor}`);
            if (perguntas.status === 200) {
                setPergunta(perguntas.data);
            }
            const setores = await api.get('setores');
            if (setores.status === 200) {
                setSetores(setores.data);
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    fetchData();
  }, [setor,setPergunta, setSetores]);
  
  const columns = ColunaTabelaPergunta("Opções", ["Responder","Ver Respostas","Editar","Excluir"]);
  const data = pergunta;
  return (
    <>
          <div style={{ marginTop: 80 }}>
          <div className='pergunta-header' style={{display: 'flex', alignItems: 'center'}}>
            <div className='select-setor' style={{maxWidth:180, marginRight:3}}>
              <SelecionarSetor todos_setores={true}></SelecionarSetor>
            </div>
            <Button variant="primary" onClick={handleShowAdicionar}>Criar pergunta</Button>
          </div>
          <div className='pergunta-main'>
            <DataTable
                columns={columns}
                data={data}
              />
          </div>
        </div>
        <AdicionarPergunta show={showAdicionar} onHide={handleCloseAdicionar} />
        <ResponderModal show={show} onHide={handleClose} perguntaSelecionada={perguntaSelecionada} />
        <EditarPergunta show={showEditar} onHide={handleShowEditar}></EditarPergunta>
        <ExcluirPergunta show={showExcluir} onHide={handleShowExcluir}></ExcluirPergunta>
    </>
  );
}
