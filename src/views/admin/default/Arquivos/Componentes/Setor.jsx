import { useState } from 'react';
import {
  Select,
  FormControl,
  FormLabel,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

const Setor = ({ setoresExistentes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [novoSetorNome, setNovoSetorNome] = useState('');
  const toast = useToast();

  const handleEscolhaSetor = (event) => {
    const escolha = event.target.value;
    // Aqui você pode adicionar a lógica para lidar com a escolha do setor
    console.log(`Setor escolhido: ${escolha}`);
  };

  const handleCriarNovoSetor = () => {
    if (novoSetorNome.trim() === '') {
      toast({
        title: 'Erro ao criar setor',
        description: 'O nome do setor não pode estar em branco.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Aqui você pode adicionar lógica para realmente criar o novo setor
    toast({
      title: 'Novo setor criado',
      description: `Setor "${novoSetorNome}" criado com sucesso.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setNovoSetorNome('');
    onClose();
  };

  return (
    <>
    <Button colorScheme="blue" onClick={onOpen}>
        Criar Novo Setor
    </Button>
      <FormControl id="escolherSetor">
        <FormLabel>Escolher um setor existente:</FormLabel>
        <Select placeholder="Selecione um setor" onChange={handleEscolhaSetor}>
          {setoresExistentes.map((setor, index) => (
            <option key={index} value={setor}>
              {setor}
            </option>
          ))}
        </Select>
      </FormControl>
      
      

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Novo Setor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="novoSetorNome" isRequired>
              <FormLabel>Nome do Novo Setor:</FormLabel>
              <Input
                type="text"
                placeholder="Digite o nome do novo setor"
                value={novoSetorNome}
                onChange={(e) => setNovoSetorNome(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCriarNovoSetor}>
              Criar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Setor;
