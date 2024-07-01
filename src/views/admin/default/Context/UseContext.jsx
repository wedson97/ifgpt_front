import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [show, setShow] = useState(false);
    const [perguntaSelecionada, setPerguntaSelecionada] = useState(null);
    const [pergunta, setPergunta] = useState([]);
    const [resposta, setResposta] = useState([]);
    const handleClose = () => setShow(false);

    const [showEditar, setShowEditar] = useState(false);

    const handleShowEditar = (pergunta) => {
      if (showEditar === false){
        setShowEditar(true)
        setPerguntaSelecionada(pergunta)
        console.log(pergunta);
      }else if(showEditar === true){
        setShowEditar(false)
        setPerguntaSelecionada('')
      }
      
    };


    const [showExcluir, setShowExcluir] = useState(false);

    const handleShowExcluir = (pergunta) => {
      if (showExcluir === false){
        setPerguntaSelecionada(pergunta)
        setShowExcluir(true)
      }else if(showExcluir === true){
        setShowExcluir(false)
        setPerguntaSelecionada('')
      }
      
    };

    const handleShowResposta = (pergunta) => {
      setPerguntaSelecionada(pergunta);
    }
   
    const handleShow = (pergunta) => {
        setPerguntaSelecionada(pergunta);
        setShow(true);
    };

    const [respostaSelecionada, setRespostaSelecionada] = useState(null);

    const [showEditarResposta, setEditarResposta] = useState(false);

    const handleShowEditarResposta = (resposta) => {
      if (showEditarResposta === false){
        setEditarResposta(true)
        setRespostaSelecionada(resposta)
      }else if(showEditarResposta === true){
        setEditarResposta(false)
        setRespostaSelecionada('')
      }
    };
    const [showExcluirResposta, setShowExcluirResposta] = useState(false);

    const handleShowExcluirResposta = (resposta) => {
      if (showExcluirResposta === false){
        setShowExcluirResposta(true)
        setRespostaSelecionada(resposta)
      }else if(showExcluirResposta === true){
        setShowExcluirResposta(false)
        setRespostaSelecionada('')
      }
      
    };
  return (
    <UserContext.Provider value={{resposta, setResposta, show, setShow, perguntaSelecionada, setPerguntaSelecionada, handleClose, handleShow, handleShowResposta, showEditar, setShowEditar, handleShowEditar, showExcluir, setShowExcluir, handleShowExcluir, respostaSelecionada, setRespostaSelecionada, showEditarResposta, setEditarResposta, handleShowEditarResposta, pergunta, setPergunta, handleShowExcluirResposta, showExcluirResposta}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('Não foi possível inicializar o contexto do usuário');
  }
  return ctx;
};
