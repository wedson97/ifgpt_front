import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from 'api/Requisicoes';

function ResponderModal({ show, onHide, perguntaSelecionada }) {
    const [resposta, setResposta] = useState('');

    const handleRespostaChange = (event) => {
        setResposta(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            await api.post('respostas',{"id":perguntaSelecionada.id,"resposta":resposta})
            setResposta('');
            onHide();
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Responder a pergunta de id: {perguntaSelecionada && perguntaSelecionada.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {perguntaSelecionada && (
                    <>
                        <Form.Label htmlFor="inputResposta">{perguntaSelecionada.texto}</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputResposta"
                            value={resposta}
                            onChange={handleRespostaChange}
                            style={{ marginBottom: '10px', borderColor:'grey' }}
                        />
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ResponderModal;
