import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useUser } from "../../Context/UseContext";
import { MdOutlineQuestionAnswer, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom'; // Importa o NavLink do React Router

export const ColunaTabelaPergunta = (tituloBotao, nomesBotoes) => {
    const { handleShow, handleShowResposta, handleShowEditar, handleShowExcluir } = useUser();

    // Funções de onClick para cada botão
    const handleClick = (row, index) => {
        switch (index) {
            case 0:
                handleShow(row); // Lógica para o primeiro botão
                break;
            case 1:
                handleShowResposta(row);
                break;
            case 2:
                handleShowEditar(row);
                break;
            case 3:
                handleShowExcluir(row)
                break;
            default:
                break;
        }
    };

    // Função para renderizar os botões
    const renderButtons = (row) => (
        <div style={styles.buttonContainer}>
            {nomesBotoes.map((nome, index) => (
                <OverlayTrigger
                    key={index}
                    placement="top"
                    overlay={<Tooltip>{nome}</Tooltip>}
                >
                    {index === 1 ? (
                        <NavLink to="/admin/respostas">
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleClick(row, index)}
                                style={styles.button}
                            >
                                {renderIcon(index)}
                            </Button>
                        </NavLink>
                    ) : (
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleClick(row, index)}
                            style={styles.button}
                        >
                            {renderIcon(index)}
                        </Button>
                    )}
                </OverlayTrigger>
            ))}
        </div>
    );

    // Função para renderizar o ícone de acordo com o índice
    const renderIcon = (index) => {
        switch (index) {
            case 0:
                return <MdOutlineQuestionAnswer />;
            case 1:
                return <FaEye />;
            case 2:
                return <RiPencilFill />;
            case 3:
                return <MdDelete />;
            default:
                return null;
        }
    };

    return [
        {
            name: 'Id',
            selector: row => row.id,
        },
        {
            name: 'Pergunta',
            selector: row => row.texto,
        },
        {
            name: tituloBotao,
            button: true,
            cell: row => renderButtons(row),
            width: '300px', // Define a largura da coluna de botões
        }
    ];
};

const styles = {
    buttonContainer: {
        display: 'flex',
        gap: '5px',
        justifyContent: 'center', 
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px 8px',
    },
    navlink: {
        textDecoration: 'none',
    }
};

