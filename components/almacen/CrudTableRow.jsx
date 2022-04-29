import Image from "next/image";
import iconDelete from "../../public/img/deleteIcon.png";
import iconEdit from "../../public/img/editIcon.png";
import React, { useContext } from "react";
import AlmacenContext from "./ContextAlmacen";

const CrudTableRow = ({ el }) => {
  const { setDataEdit, deleteData } = useContext(AlmacenContext);
  let { id_Producto_Almacen, nombre, categoria, unidad_Medida, status, stock } =
    el;
  return (
    <tr>
      <td>{id_Producto_Almacen}</td>
      <td>{nombre}</td>
      <td>{categoria}</td>
      <td>{unidad_Medida}</td>
      <td>{stock}</td>
      <td>{status}</td>
      <td>
        <button
          className="btn me-md-2"
          onClick={() =>
            setDataEdit({
              nombreProducto: nombre,
              categoria: categoria,
              medida: unidad_Medida,
              status: status,
              stock: stock,
              id: id_Producto_Almacen,
            })
          }
        >
          <Image
            src={iconEdit}
            alt="edit"
            width={20}
            height={20}
          />
        </button>
        <button
          className="btn me-md-2"
          onClick={() => deleteData(id_Producto_Almacen)}
        >
          <Image
            src={iconDelete}
            alt="delete"
            width={20}
            height={20}
          />
        </button>
      </td>
    </tr>
  );
};

export default CrudTableRow;
