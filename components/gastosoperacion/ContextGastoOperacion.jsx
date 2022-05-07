import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { createContext, useEffect, useState } from "react";

const GastoOperacionContext = createContext();

const INSERTARGASTO = gql`
  mutation CreateGasto($input: gastoInput!) {
    createGasto(input: $input) {
      id_operacion
      id_producto
      cantidad
      precio
      fecha
      id_usuario
    }
  }
`;

const OBTENERPRODUCTOSALMACEN = gql`
  query getAlmacen {
    getAlmacen {
      id_Producto_Almacen
      nombre
      categoria
      unidad_Medida
      status
      stock
    }
  }
`;

const OBTENERGASTOS = gql`
  query getGasto {
    getGasto {
      id_operacion
      id_producto
      cantidad
      precio
      fecha
      id_usuario
    }
  }
`;

const ACTUALIZARPRODUCTOSTOCK = gql`
  mutation UpdateAlmacenStock($input: almacenUpdateStock!) {
    updateAlmacenStock(input: $input) {
      id_Producto_Almacen
      stock
    }
  }
`;

const OBTENERUSUARIOS = gql`
  query getUsuarios {
    getUsuarios {
      id
      email
    }
  }
`;

const GastoOperacionProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [dataAuxiliar, setDataAuxiliar] = useState(null);
  const [errorMensaje, setErrorMensaje] = useState(null);
  const [loadingGastosOperacion, setLoadingGastosOperacion] = useState(false);
  const [listOption, setListOption] = useState(null);
  const [seGuardo, setSeGuardo] = useState(false);
  const [mesaje, setMensaje] = useState("");
  const [listUsuariosOption, setListUsuariosOption] = useState(null);
  const [getAlmacen, { data, loading }] = useLazyQuery(OBTENERPRODUCTOSALMACEN);
  const [
    getGasto,
    { data: gastosData, loading: loadinGastos, error: errorGasto },
  ] = useLazyQuery(OBTENERGASTOS);

  const [getUsuarios, { data: dataUser }] = useLazyQuery(OBTENERUSUARIOS);

  const [createGasto, { error }] = useMutation(INSERTARGASTO, {
    refetchQueries: (mutationResult) => [{ query: OBTENERGASTOS }],
  });
  const [updateAlmacenStock] = useMutation(ACTUALIZARPRODUCTOSTOCK);

  const createData = async (dataForm) => {
    const result = await listOption.filter((elemento) => {
      return elemento.id_Producto_Almacen == dataForm.producto;
    });
    try {
      await createGasto({
        variables: {
          input: {
            id_producto: parseInt(dataForm.producto),
            cantidad: parseFloat(dataForm.cantidad),
            precio: parseFloat(dataForm.precio),
            fecha: dataForm.fecha.replace(/-/g, "/"),//La fecha por defecto retorna un dia antes de la actual, al parsearla se corrige 
            id_usuario: parseInt(dataForm.id_Usuario),
          },
        },
      });
      await updateAlmacenStock({
        variables: {
          input: {
            id_Producto_Almacen: parseInt(dataForm.producto),
            stock: parseFloat(dataForm.cantidad) + parseFloat(result[0].stock),
          },
        },
      });
      if (!error) {
        setSeGuardo(true);
        setMensaje("Gasto Agregado Correctamente");
        setTimeout(() => {
          setSeGuardo(false);
        }, 2000);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const filtrarDatos = async ({ producto, fecha, usuario, total }) => {
    if (total == "" || total == null) total = 0;
    const result = await dataAuxiliar.filter((elemento) => {
      return (
        (elemento.id_producto == producto || producto == -1) &&
        parseFloat(elemento.cantidad) * parseFloat(elemento.precio) >=
          parseFloat(total) &&
        (new Date(elemento.fecha) >= new Date(fecha.replace(/-/g, "/")) ||
          !fecha) &&
        (elemento.id_usuario == usuario || usuario == -1)
      );
    });
    if (result.length > 0) setDb(result);
  };

  /*
  function GetCellValues(username) {
    var table = document.getElementById("tablaGastos");
    for (var r = 0, n = table.rows.length; r < n; r++) {
      for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
        if (table.rows[r].cells[6].innerHTML == username) return true;
      }
    }
    return false;
  }*/

  useEffect(() => {
    const cargaDatos = async () => {
      try {
        if (loadinGastos) setLoadingGastosOperacion(true);
        if (errorGasto) {
          setErrorMensaje(errorGasto);
          setLoadingGastosOperacion(false);
        }
        await getGasto();
        if (gastosData) {
          setDb(gastosData.getGasto);
          setDataAuxiliar(gastosData.getGasto);
          setErrorMensaje(null);
          setLoadingGastosOperacion(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    cargaDatos();
  }, [gastosData, getGasto, loadinGastos, errorGasto]);

  useEffect(() => {
    const cargaDatos = async () => {
      try {
        await getAlmacen();
        if (data) {
          setListOption(data.getAlmacen);
          //console.log("User: ", localStorage.getItem("token"));
        }
        await getUsuarios();
        if (dataUser) setListUsuariosOption(dataUser.getUsuarios);
      } catch (error) {
        console.log(error.message);
      }
    };
    cargaDatos();
  }, [getAlmacen, getUsuarios, data, dataUser]);
  /*
  useEffect(() => {
    const cargaDatos = async () => {
      try {
        await getUsuario({
          variables: {
            id: parseInt(id_usuario),
          },
        });
        if (dataUser) {
          setNombreUsuario(dataUser.getUsuario["email"]);
        } else {
          setNombreUsuario("Sin registro de usuario");
        }
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
  }, []);*/

  const dataContext = {
    listOption,
    mesaje,
    seGuardo,
    db,
    loadingGastosOperacion,
    errorMensaje,
    dataAuxiliar,
    listUsuariosOption,
    createData,
    filtrarDatos,
  };

  return (
    <GastoOperacionContext.Provider value={dataContext}>
      {children}
    </GastoOperacionContext.Provider>
  );
};

export { GastoOperacionProvider };
export default GastoOperacionContext;
