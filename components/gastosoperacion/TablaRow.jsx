import { gql, useLazyQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import GastoOperacionContext from "./ContextGastoOperacion";

const OBTENERPRODUCTOSALMACEN = gql`
  query getAlmacenProducto($id: Int!) {
    getAlmacenProducto(id: $id) {
      id_Producto_Almacen
      nombre
      unidad_Medida
    }
  }
`;

/**const OBTENERUSUARIOS = gql`
  query getUsuario($id: Int!) {
    getUsuario(id: $id) {
      email
    }
  }
`;
 */

const TablaRow = ({ el }) => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  let { id_operacion, id_producto, cantidad, precio, fecha, id_usuario } = el;
  const [getAlmacenProducto, { data }] = useLazyQuery(OBTENERPRODUCTOSALMACEN);
  // const [getUsuario, { data: dataUser }] = useLazyQuery(OBTENERUSUARIOS);
  const { listUsuariosOption } = useContext(GastoOperacionContext);

  function formatDate(d) {
    let date = new Date(d);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return (d = dd + "/" + mm + "/" + yyyy);
  }

  useEffect(() => {
    const cargaDatos = async () => {
      try {
        await getAlmacenProducto({
          variables: {
            id: parseInt(id_producto),
          },
        });
      } catch (error) {
        console.log(error.message);
      }
      if (data)
        setNombreProducto(
          data.getAlmacenProducto["nombre"] +
            " " +
            data.getAlmacenProducto["unidad_Medida"]
        );
    };
    cargaDatos();
  }, [id_producto, data, getAlmacenProducto]);

  useEffect(() => {
    const cargaDatos = async () => {
      if (listUsuariosOption) {
        const result = await listUsuariosOption.filter((elemento) => {
          return elemento.id == id_usuario;
        });
        if (result.length > 0) {
          for (let key in result) {
            setNombreUsuario(result[key]["email"]);
          }
        }
      }
      /* try {
        await getUsuario({
          variables: {
            id: parseInt(id_usuario),
          },
        });
        if (dataUser) setNombreUsuario(dataUser.getUsuario["email"]);
      } catch (error) {
        console.log(error.message);
      }*/
    };
    cargaDatos();
  }, [listUsuariosOption, id_usuario]);
  //  }, [id_usuario, dataUser, getUsuario]);

  return (
    <tr>
      <td>{nombreProducto}</td>
      <td>{cantidad}</td>
      <td>{precio}</td>
      <td>{parseFloat(cantidad) * parseFloat(precio)}</td>
      <td>{formatDate(fecha)}</td>
      <td>{nombreUsuario}</td>
    </tr>
  );
};

export default TablaRow;
