import React, { useState, useCallback } from 'react';
import api from 'api/Requisicoes';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  HStack,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

import Setor from './Setor';

const UploadArquivo = () => {
  const [arquivo, setArquivo] = useState(null);
  const [arquivoURL, setArquivoURL] = useState(null);
  const [pdfOptions, setPdfOptions] = useState({
    f: 1,
    l: 1,
    x: 0,
    y: 0,
    W: 595, // A4 padrão largura
    H: 842, // A4 padrão altura
  });

  const handleMudancaArquivo = useCallback((evento) => {
    const arquivoSelecionado = evento.target.files[0];
    if (arquivoSelecionado) {
      setArquivo(arquivoSelecionado);
      const reader = new FileReader();
      reader.onloadend = () => setArquivoURL(reader.result);
      reader.readAsDataURL(arquivoSelecionado);
    }
  }, []);

  const handleOptionChange = (option) => (value) => {
    setPdfOptions((prevOptions) => ({
      ...prevOptions,
      [option]: parseInt(value)
    }));
  };

  const handleSubmit = useCallback(async (evento) => {
    evento.preventDefault();
    if (!arquivo) {
      alert('Por favor, selecione um arquivo primeiro!');
      return;
    }

    const jsonPayload = {
      nomeArquivo: arquivo.name,
      tipoArquivo: arquivo.type,
      conteudoArquivo: arquivoURL,
      opcoes: pdfOptions,
    };

    try {
      const response = await api.post('arquivos/', JSON.stringify(jsonPayload));
      if (response.status === 200) {
        console.log('Arquivo enviado com sucesso:', JSON.stringify(jsonPayload));
      }
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error);
    }
  }, [arquivo, arquivoURL, pdfOptions]);
  const setoresExistentes = ['Setor A', 'Setor B', 'Setor C'];
  return (
    <Box>
      <form onSubmit={handleSubmit}>
      <Setor setoresExistentes={setoresExistentes}></Setor>
        <HStack mb={4} spacing={4} align="center" style={{marginTop:10}}>
          
          <FormControl id="arquivo">
            <FormLabel>Upload de Arquivo PDF</FormLabel>
            <Input type="file" accept="application/pdf" onChange={handleMudancaArquivo} />
          </FormControl>
          <Button colorScheme="blue" type="submit" style={{marginTop:30}}>
            Enviar
          </Button>
        </HStack>
      </form>

      {arquivoURL && (
        <Box mt={4} p={4} border="1px" borderColor="gray.300" borderRadius="md">
          <Text>Visualização do PDF:</Text>
          <HStack spacing={4} align="center">
            {Object.entries(pdfOptions).map(([key, value]) => (
              <FormControl key={key}>
                <FormLabel>{`${key.toUpperCase()} (${key})`}</FormLabel>
                <NumberInput value={value} onChange={handleOptionChange(key)}>
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            ))}
          </HStack>
          <object data={arquivoURL} type="application/pdf" width="100%" height="500px">
            <p>
              Seu navegador não suporta visualização de PDF. Por favor, faça o download do PDF para visualizá-lo: 
              <a href={arquivoURL} download>Baixar PDF</a>.
            </p>
          </object>
        </Box>
      )}
    </Box>
  );
};

export default UploadArquivo;
