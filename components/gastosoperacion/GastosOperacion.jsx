
import AgregarGasto from "./AgregarGasto";
import { GastoOperacionProvider } from "./ContextGastoOperacion";

const GastosOperacion = () => {
  return (

    <GastoOperacionProvider>
      <AgregarGasto></AgregarGasto>
    </GastoOperacionProvider>

  );
};

export default GastosOperacion;
