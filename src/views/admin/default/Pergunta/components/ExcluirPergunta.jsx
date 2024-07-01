import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from 'api/Requisicoes';
import { useUser } from 'views/admin/default/Context/UseContext';

function ExcluirPergunta({ show, onHide }) {
    const {setPergunta, perguntaSelecionada} = useUser();
    
	const ExcluirPerguntaAtual = async () => {
        try {
            console.log(perguntaSelecionada.id);
            let id = perguntaSelecionada.id;
    
            // Passando o ID no corpo da requisição DELETE
            await api.delete('/chats/2/mensagens', { data: { id: id } })
                .then(response => {
                })
                .catch(error => {
                    console.error('Erro ao excluir pergunta:', error);
                });
    
            // Atualiza as respostas após excluir a pergunta
            const response = await api.get('/mensagens');
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
                <Modal.Title>Deseja Excluir a pergunta de : {perguntaSelecionada && perguntaSelecionada.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant="secondary" onClick={onHide}>
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
