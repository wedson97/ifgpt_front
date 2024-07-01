import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from 'api/Requisicoes';
import { useUser } from 'views/admin/default/Context/UseContext';

function AdicionarPergunta({ show, onHide }) {
    const {setPergunta, handleClose} = useUser();
    const [novaPergunta, setNovaPergunta] = useState('');
    
	const enviarNovaPergunta = async () => {
		try {
            await api.post('/chats/1/mensagens', {texto: novaPergunta})
					.then(response => {
						setNovaPergunta('')
					})  
					.catch(error => {
						console.error('Erro ao enviar pergunta:', error);
					});
            const response = await api.get('mensagens');
			setPergunta(response.data);
		} catch (error) {
			console.error(error);
		}
	};
	
    const handlePerguntaChange = (event) => {
        setNovaPergunta(event.target.value);
        handleClose()
    };

    const handleSubmit = async () => {
        try {
            enviarNovaPergunta();
            onHide();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Faça sua pergunta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <>
                        <Form.Control
                            type="text"
                            id="inputPergunta"
                            placeholder='Coloque a pergunta aqui'
                            value={novaPergunta}
                            onChange={handlePerguntaChange}
                        />
                    </>
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

export default AdicionarPergunta;
