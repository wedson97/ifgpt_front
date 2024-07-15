import { Select } from '@chakra-ui/react';
import { useUser } from '../../Context/UseContext';

function SelecionarSetor({todos_setores}) {
    const { setores, setSetor } = useUser();

    const handleClick = (value) => {
        setSetor(value);
    };

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        handleClick(selectedValue); // Chama a função handleClick com o valor selecionado
    };
    return (
        <Select
            placeholder='Selecionar setor'
            style={{ backgroundColor: '#0d6efd', color: 'white' }}
            onChange={handleChange}
        >
            {todos_setores && (<option key={0} value={0}>{'Todos setores'}</option>)}
            
            {setores && (
                
                setores.map((setor) => (
                    <option key={setor.id} value={setor.id}>{setor.nome}</option>
                ))
            )}
        </Select>
    );
}

export default SelecionarSetor;
