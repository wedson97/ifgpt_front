import { createContext, useContext, useState } from 'react';
import configuracao from '../Variaveis/configuracaoPdf';

const UserContext = createContext();

export const ArquivoProvider = ({ children }) => {
    const [arquivo, setArquivo] = useState(null);
    const [arquivoURL, setArquivoURL] = useState(null);
    const [pdfOptions, setPdfOptions] = useState(configuracao);
    return (
        <UserContext.Provider value={{arquivo, setArquivo,arquivoURL, setArquivoURL, pdfOptions, setPdfOptions}}>
        {children}
        </UserContext.Provider>
    );
};

export const ArquivoUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('Não foi possível inicializar o contexto dos arquivos');
  }
  return ctx;
};
