import React, { useContext } from "react";
import AlmacenContext from "./ContextAlmacen";
import CrudTableRow from "./CrudTableRow";

const TableAlmacen = () => {
  const { db } = useContext(AlmacenContext);
  // console.log("Datos: ",db);

  return (
    <div className="mt-3">
      <h5 className="ml-2">Productos del Almacen</h5>
      <div className="table-wrapper-scroll-y my-custom-scrollbar scrollbar-black thin">
        <div className="force-overflow">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Unidad Medida</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {db.length > 0 ? (
                db.map((el) => (
                  <CrudTableRow key={el.id_Producto_Almacen} el={el} />
                ))
              ) : (
                <tr colSpan="3">Sin datos</tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableAlmacen;
