import { useContext } from "react";
import Message from "../globales/Message";
import AgregarGastoForm from "./AgregarGastoForm";
import BusquedaGasto from "./BusquedaGasto";
import GastoOperacionContext from "./ContextGastoOperacion";
import TablaGasto from "./TablaGasto";

const AgregarGasto = () => {
  const { db, loadingGastosOperacion, errorMensaje } = useContext(
    GastoOperacionContext
  );

  return (
    <div className="row">
      <div className="col-md-4 col-sm-12">
        <AgregarGastoForm></AgregarGastoForm>
      </div>
      <div className="col-md-8 col-sm-12">
        <div className="p-3 mt-0 shadow-sm">
          <BusquedaGasto />
        </div>
        <div className="">
          {loadingGastosOperacion && (
            <div className="row justify-content-center">
              <div className="col-4">
                <div className="loader" />
              </div>
            </div>
          )}
          {errorMensaje && (
            <Message
              msg={`Error: No se pudieron obtener los registros de la base datos`}
              bgColor="alert alert-danger"
            />
          )}
          {db && <TablaGasto />}
        </div>
      </div>
    </div>
  );
};

export default AgregarGasto;
