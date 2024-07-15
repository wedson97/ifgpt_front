import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from 'api/Requisicoes';
import { useUser } from 'views/admin/default/Context/UseContext';

function ExcluirPergunta({ show, onHide }) {
    const {setor,setPergunta, perguntaSelecionada} = useUser();
    
	const ExcluirPerguntaAtual = async () => {
        try {
            let id = perguntaSelecionada.id;
    
            // Passando o ID no corpo da requisição DELETE
            await api.delete('/chats/1/mensagens', { data: { id: id } })
                .then(response => {
                })
                .catch(error => {
                    console.error('Erro ao excluir pergunta:', error);
                });
    
            // Atualiza as respostas após excluir a pergunta
            const response = await api.get('/mensagens/setores/'+setor);
            setPergunta(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        try {
            ExcluirPerguntaAtual();
            onHide();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Deseja Excluir a pergunta de id : {perguntaSelecionada && perguntaSelecionada.id}</Modal.Title>
            </Modal.Header>
            <Modal.Header>
                    {perguntaSelecionada && perguntaSelecionada.texto}
                </Modal.Header>
            <Modal.Body className="d-flex justify-content-center"> 
                
                <Button variant="secondary" onClick={onHide} style={{marginRight:10}}>
                    Não
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Sim
                </Button>
                
            </Modal.Body>
        </Modal>
    );
}

export default ExcluirPergunta;
