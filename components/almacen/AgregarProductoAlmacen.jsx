import { useContext } from "react";
import AlmacenBusqueda from "./AlmacenBusqueda";
import AlmacenContext from "./ContextAlmacen";
import CrudForm from "./CrudForm";
import TableAlmacen from "./TableAlmacen";

const AgreagarProductoAlmacen = () => {
  const { db } = useContext(AlmacenContext);
  return (
    <div>
      <div className="row">
        <div className="col-3 card bg-light ml-3">
          <CrudForm></CrudForm>
        </div>
        <div className="col-8 card ml-3 pt-2">
          <div className="row"><div className="col-11 card ml-3 pt-2"><AlmacenBusqueda/></div></div>
          <div className="row"><div className="col-11 card mt-2 ml-3">{db && <TableAlmacen />}</div></div>
        </div>
        
      </div>
    </div>
  );
};

export default AgreagarProductoAlmacen;
