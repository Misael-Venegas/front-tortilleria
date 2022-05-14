import { useContext } from "react";
import Message from "../globales/Message";
import AlmacenBusqueda from "./AlmacenBusqueda";
import AlmacenContext from "./ContextAlmacen";
import CrudForm from "./CrudForm";
import ModalEliminacion from "./ModalEliminacion";
import TableAlmacen from "./TableAlmacen";

const AgreagarProductoAlmacen = () => {
  const { db, loadingProductos, errorMensaje, openModal, setOpenModal } =
    useContext(AlmacenContext);
  return (
    <div>
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <CrudForm></CrudForm>
        </div>
        <div className="col-md-8 col-sm-12">
          <div className="p-3 mt-0 shadow-sm">
            <div className="">
              <AlmacenBusqueda />
            </div>
            <div className="">
              {loadingProductos && (
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
              {db && <TableAlmacen />}
            </div>
          </div>
        </div>
        <div>
          <ModalEliminacion openModal={openModal} setOpenModal={setOpenModal} />
        </div>
      </div>
    </div>
  );
};

export default AgreagarProductoAlmacen;
