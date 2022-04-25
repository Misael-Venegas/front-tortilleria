import React, { useContext } from "react";
import AlmacenContext from "./ContextAlmacen";
import CrudTableRow from "./CrudTableRow";

const TableAlmacen = () => {
  const { db } = useContext(AlmacenContext);
 // console.log("Datos: ",db);

  return (
    <div>
      <h5>Tabla de Productos</h5>
      <table className="table table-sm">
        <thead className="table-warning">
          <tr>
            <th>Id Producto</th>
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
  );
};

export default TableAlmacen;
