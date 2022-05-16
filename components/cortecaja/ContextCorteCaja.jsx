import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { createContext, useEffect, useState } from "react";

const CorteCajaContext = createContext();
/*const OBTENERVENTAS = gql`
  query getVentas($fecha: String!) {
    getVentas(fecha: $fecha) {
      id
      id_usuario
      total
      fecha_venta
      hora_venta
      id_producto
      cantidad
    }
  }
`;*/

const OBTENERVENTASALL = gql`
  query getVentasAll {
    getVentasAll {
      id
      id_usuario
      total
      fecha_venta
      hora_venta
      id_producto
      cantidad
    }
  }
`;
const GET_PRODUCTOS = gql`
  query getProductos($key: Float!) {
    getProductos(key: $key) {
      id_producto
      nombre
      precioVenta
      unidad
      id_producto_almacen
    }
  }
`;
const OBTENERUSUARIOS = gql`
  query getUsuarios {
    getUsuarios {
      id
      email
      nombre
      apellidoP
      apellidoM
    }
  }
`;

const CorteCajaProvider = ({ children }) => {
  const [getVentasAll, { data: dataVentas }] = useLazyQuery(OBTENERVENTASALL);
  const [obtenerProductos, { data: dataProductos }] =
    useLazyQuery(GET_PRODUCTOS);
  const [getUsuarios, { data: dataUser }] = useLazyQuery(OBTENERUSUARIOS);

  const [tablaDatos, setTablaDatos] = useState(null);
  /* useEffect(() => {
    const ejecutarMetodo = async () => {
      try {
        await getVentas({
          variables: {
            fecha: "15/5/2022",
          },
        });
        if (dataVentas) console.log(dataVentas.getVentas);
      } catch (error) {
        console.log(error.message);
      }
    };
    ejecutarMetodo();
  }, [dataVentas]);*/

  useEffect(() => {
    const ejecutarMetodo = async () => {
      try {
        await getVentasAll();
        await obtenerProductos({
          variables: {
            key: Math.random(),
          },
        });
        await getUsuarios();
      } catch (error) {
        console.log(error.message);
      }
    };
    ejecutarMetodo();
  }, [dataVentas,]);

  function formatDate(d) {
    let partes = d.split("/");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  const filtrarVentas = ({ hora, usuario, fecha, horaFinal }) => {
    if (hora == "") hora = "00:00:00";
    if (horaFinal == "") horaFinal = "23:59:59";
    if (usuario == "") usuario = -1;
    const listAux = [];
    var f1 = new Date(fecha.replace(/-/g, "/"));
    if (dataVentas) {
      for (let key in dataVentas.getVentasAll) {
        const {
          id,
          id_usuario,
          total,
          fecha_venta,
          hora_venta,
          id_producto,
          cantidad,
        } = dataVentas.getVentasAll[key];
        var f2 = new Date(formatDate(fecha_venta));
        //console.log(id_usuario, " : ", usuario);
        if (
          f1.getTime() == f2.getTime() &&
          hora_venta >= hora &&
          hora_venta <= horaFinal &&
          (usuario == id_usuario || usuario == -1)
        ) {
          listAux.push(dataVentas.getVentasAll[key]);
        }
      }
      setTablaDatos(listAux);
    }
  };

  const dataContext = { filtrarVentas, tablaDatos, dataProductos, dataUser };
  return (
    <CorteCajaContext.Provider value={dataContext}>
      {children}
    </CorteCajaContext.Provider>
  );
};

export { CorteCajaProvider };
export default CorteCajaContext;
