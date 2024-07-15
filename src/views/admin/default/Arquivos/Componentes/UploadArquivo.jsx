import React, { useCallback } from 'react';
import api from 'api/Requisicoes';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  HStack,

} from '@chakra-ui/react';

import ConfiguracaoPdf from './ConfiguracaoPdf';
import { ArquivoUser } from '../Contexto/ArquivoContext';

const UploadArquivo = () => {
  const {arquivo, setArquivo,arquivoURL, setArquivoURL, pdfOptions} = ArquivoUser()

  const handleMudancaArquivo = useCallback((evento) => {
    const arquivoSelecionado = evento.target.files[0];
    if (arquivoSelecionado) {
      setArquivo(arquivoSelecionado);
      const reader = new FileReader();
      reader.onloadend = () => setArquivoURL(reader.result);
      reader.readAsDataURL(arquivoSelecionado);
    }
  }, [setArquivo, setArquivoURL]);


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
        // console.log('Arquivo enviado com sucesso:', JSON.stringify(jsonPayload));
      }
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error);
    }
  }, [arquivo, arquivoURL, pdfOptions]);

  

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <HStack mb={4} spacing={4} align="center" style={{ marginTop: 10 }}>
          <FormControl id="arquivo">
            <FormLabel>Upload de Arquivo PDF</FormLabel>
            <Input type="file" accept="application/pdf" onChange={handleMudancaArquivo} borderColor="grey" />
          </FormControl>
          <Button colorScheme="blue" type="submit" style={{ marginTop: 30, backgroundColor:'#0d6efd' }}>
            Enviar
          </Button>
        </HStack>
      </form>
      <ConfiguracaoPdf></ConfiguracaoPdf>
        <Box mt={4} p={4} border="1px" borderColor="grey" borderRadius="md">
          <object data={arquivoURL} type="application/pdf" width="100%" height="500px">
            <p>
              Seu navegador não suporta visualização de PDF. Por favor, faça o download do PDF para visualizá-lo:
              <a href={arquivoURL} download>Baixar PDF</a>.
            </p>
          </object>
        </Box>
    </Box>
  );
};

export default UploadArquivo;
