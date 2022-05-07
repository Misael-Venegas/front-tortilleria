import Container from "../principal/Container";
import AgregarGasto from "./AgregarGasto";
import { GastoOperacionProvider } from "./ContextGastoOperacion";

const GastosOperacion = () => {
  return (
    <Container>
      <GastoOperacionProvider>
        <AgregarGasto></AgregarGasto>
      </GastoOperacionProvider>
    </Container>
  );
};

export default GastosOperacion;
