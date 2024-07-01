import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from 'api/Requisicoes';
import { useUser } from 'views/admin/default/Context/UseContext';

function ExcluirResposta({ show, onHide }) {
    const {perguntaSelecionada,respostaSelecionada, setResposta} = useUser();
    
	const ExcluirRespostaAtual = async () => {
        try {
            await api.delete(`/resposta/${respostaSelecionada.id}` )
                .then(response => {

                })
                .catch(error => {
                    console.error('Erro ao excluir pergunta:', error);
                });
    
        } catch (error) {
            console.error(error);
        }finally{
            const response = await api.get(`resposta/${perguntaSelecionada.id }`)
            setResposta(response.data);
        }
    };

    const handleSubmit = async () => {
        try {
            ExcluirRespostaAtual();
            onHide();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Deseja Excluir a pergunta de : {respostaSelecionada && respostaSelecionada.id}</Modal.Title>
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

export default ExcluirResposta;
