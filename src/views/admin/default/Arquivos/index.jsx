import UploadArquivo from "./Componentes/UploadArquivo";
import { ArquivoProvider } from "./Contexto/ArquivoContext";
export default function Arquivos() {

  return (
    <>
      <ArquivoProvider>
        <div style={{marginTop:100}}>
          <UploadArquivo></UploadArquivo>
        </div>
      </ArquivoProvider>
      
      
    </>
  );
}
