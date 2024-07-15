import React from 'react';
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Text,
  Select,
  SimpleGrid,
  GridItem,
  Checkbox,
} from '@chakra-ui/react';

import nomes from '../Variaveis/nomesConfiguracaoPdf';
// import configuracao from '../Variaveis/configuracaoPdf';
import { ArquivoUser } from '../Contexto/ArquivoContext';
import { useUser } from '../../Context/UseContext';

const ConfiguracaoPdf = () => {
  const { arquivoURL, pdfOptions, setPdfOptions } = ArquivoUser();
  const { setores } = useUser();

  const handleTruncarChange = (event) => {
    const { name, checked } = event.target;
    setPdfOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
    
  };

  const handleSetorChange = (event) => {
    const selectedSetorId = event.target.value;
    setPdfOptions((prevOptions) => ({
      ...prevOptions,
      setor: selectedSetorId,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPdfOptions((prevOptions) => ({
      ...prevOptions,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <>
      {arquivoURL && (
        <Box mt={4} p={4} border="1px" borderColor="grey" borderRadius="md">
          <Text>Configuração do PDF:</Text>
          <SimpleGrid columns={4} spacing={4}>
            {Object.keys(pdfOptions).map((key) => (
              <GridItem key={key}>
                {typeof pdfOptions[key] === 'boolean' ? (
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor={key}>{nomes[key]}</FormLabel>
                    <Checkbox
                      id={key}
                      name={key}
                      isChecked={pdfOptions[key]}
                      onChange={handleTruncarChange}
                      borderColor="grey"
                    />
                  </FormControl>
                ) : key === 'setor' ? (
                  <FormControl>
                    <FormLabel htmlFor={key}>{nomes[key]}</FormLabel>
                    <Select
                      id={key}
                      name={key}
                      value={pdfOptions[key]}
                      onChange={handleSetorChange}
                      borderColor="grey"
                    >
                    <option > Escolher setor</option>,
                      {setores &&
                        setores.map((setor) => (
                          <option key={setor.id} value={setor.id}>
                            {setor.nome}
                          </option>
                        ))}
                    </Select>
                  </FormControl>
                ) : (
                  <FormControl>
                    <FormLabel htmlFor={key}>{nomes[key]}</FormLabel>
                    <Input
                      type="number"
                      id={key}
                      name={key}
                      value={pdfOptions[key]}
                      onChange={handleChange}
                      borderColor="grey"
                    />
                  </FormControl>
                )}
              </GridItem>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};

export default ConfiguracaoPdf;
