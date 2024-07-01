import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from 'api/Requisicoes';
import { useUser } from '../../Context/UseContext';

function EditarResposta({ show, onHide }) {
    const {perguntaSelecionada,respostaSelecionada, setResposta} = useUser();
    const [novaResposta, setNovaResposta] = useState('');
    
	const enviarNovaResposta = async () => {
		try {
            await api.put('resposta/'+respostaSelecionada.id, {texto: novaResposta})
					.then(response => {
						setNovaResposta('')
					})
					.catch(error => {
						console.error('Erro ao enviar pergunta:', error);
					});
                   
		} catch (error) {
			console.error(error);
		}finally{
            const response = await api.get(`resposta/${perguntaSelecionada.id }`)
            setResposta(response.data);
        }
        
	};
	
    const handleRespostaChange = (event) => {
        setNovaResposta(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            enviarNovaResposta();
            onHide();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Editar a resposta de id: {respostaSelecionada && respostaSelecionada.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <>
                        <Form.Control
                            type="text"
                            id="inputResposta"
                            placeholder='Coloque a Resposta aqui'
                            value={novaResposta}
                            onChange={handleRespostaChange}
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

export default EditarResposta;
