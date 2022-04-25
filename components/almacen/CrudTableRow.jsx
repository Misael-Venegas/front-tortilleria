import Image from "next/image";
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
            src="https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/344/external-edit-user-interface-tanah-basah-detailed-outline-tanah-basah.png"
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
            src="https://img.icons8.com/ios-glyphs/344/filled-trash.png"
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
