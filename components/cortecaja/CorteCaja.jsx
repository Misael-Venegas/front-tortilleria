import { CorteCajaProvider } from "./ContextCorteCaja";
import CorteCajaPrincipal from "./CorteCajaPrincipal";

const CorteCaja = () => {
  return (
    <CorteCajaProvider>
      <CorteCajaPrincipal></CorteCajaPrincipal>
    </CorteCajaProvider>
  );
};

export default CorteCaja;
