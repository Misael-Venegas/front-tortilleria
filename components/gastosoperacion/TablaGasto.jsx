import { useContext } from "react";
import GastoOperacionContext from "./ContextGastoOperacion";
import TablaRow from "./TablaRow";

const TablaGasto = () => {
  const { db } = useContext(GastoOperacionContext);

  return (
    <div className="mt-3">
      <h5 className="ml-2">Gastos de Operación</h5>
      <div className="table-wrapper-scroll-y my-custom-scrollbar scrollbar-black thin">
        <div className="force-overflow">
          <table className="table table-striped" id="tablaGastos">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Usuario</th>
              </tr>
            </thead>
            <tbody>
              {db.length > 0 ? (
                db.map((el) => (
                  <TablaRow key={el.id_operacion} el={el} />
                ))
              ) : (
                <tr>
                  <td>Sin datos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaGasto;
