import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { createContext, useEffect, useState } from "react";

const AlmacenContext = createContext();

const INSERTARPRODUCTOALMACEN = gql`
  mutation CreateAlmacenProducto($input: almacenInput!) {
    createAlmacenProducto(input: $input) {
      id_Producto_Almacen
      nombre
      categoria
      unidad_Medida
      status
      stock
    }
  }
`;

const ACTUALIZARPRODUCTOALMACEN = gql`
  mutation UpdateAlmacenProducto($input: almacenUpdate!) {
    updateAlmacenProducto(input: $input) {
      id_Producto_Almacen
      nombre
      categoria
      unidad_Medida
      status
      stock
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

const ELIMINARPRODUCTO = gql`
  mutation deleteAlmacenProducto($id: Int!) {
    deleteAlmacenProducto(id_Producto_Almacen: $id) {
      id_Producto_Almacen
    }
  }
`;

const AlmacenProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [dataAuxiliar, setDataAuxiliar] = useState(null);
  const [errorMensaje, setErrorMensaje] = useState(null);
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [seGuardo, setSeGuardo] = useState(false);
  const [mesaje, setMensaje] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [idProductoEliminar, setIdProductoEliminar] = useState(-1);

  const [
    getAlmacen,
    { data: almacenData, loading: loadinAlmacen, error: errorAlmacen },
  ] = useLazyQuery(OBTENERPRODUCTOSALMACEN);

  const [createAlmacenProducto, { data, loading, error }] = useMutation(
    INSERTARPRODUCTOALMACEN,
    { refetchQueries: (mutationResult) => [{ query: OBTENERPRODUCTOSALMACEN }] }
  );
  const [deleteAlmacenProducto] = useMutation(ELIMINARPRODUCTO, {
    refetchQueries: (mutationResult) => [{ query: OBTENERPRODUCTOSALMACEN }],
  });

  const [updateAlmacenProducto, { error: errorUpdate }] = useMutation(
    ACTUALIZARPRODUCTOALMACEN,
    {
      refetchQueries: (mutationResult) => [{ query: OBTENERPRODUCTOSALMACEN }],
    }
  );

  /////FUNCIONES
  const createData = async (dataForm) => {
    try {
      await createAlmacenProducto({
        variables: {
          input: {
            nombre: dataForm.nombreProducto,
            categoria: dataForm.categoria,
            unidad_Medida: dataForm.medida,
            status: dataForm.status,
            stock: parseFloat(dataForm.stock),
          },
        },
      });
      if (!error) {
        setSeGuardo(true);
        setMensaje("Producto Agregado Correctamente");
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
  const updateData = async (dataForm) => {
    //console.log("Actualizar: ", dataForm);
    try {
      await updateAlmacenProducto({
        variables: {
          input: {
            id_Producto_Almacen: dataForm.id,
            nombre: dataForm.nombreProducto,
            categoria: dataForm.categoria,
            unidad_Medida: dataForm.medida,
            status: dataForm.status,
            stock: parseFloat(dataForm.stock),
          },
        },
      });
      if (!errorUpdate) {
        setSeGuardo(true);
        setMensaje("Producto Actualizado Correctamente");
        setTimeout(() => {
          setSeGuardo(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteData = async (id) => {
    setIdProductoEliminar(id);
    setOpenModal(true);
    /* let isDelete = window.confirm(`¿Deseas eliminar el registro: ${id}  ?`);
    if (isDelete) {
      try {
        await deleteAlmacenProducto({
          variables: {
            id: parseInt(id),
          },
        });
      } catch (error) {
        console.log(error);
      }
    }*/
  };
  const eliminarProductoBD = async () => {
    try {
      if (idProductoEliminar >= 0) {
        await deleteAlmacenProducto({
          variables: {
            id: parseInt(idProductoEliminar),
          },
        });
        setOpenModal(false);
        setIdProductoEliminar(-1);
        setSeGuardo(true);
        setMensaje("Producto Eliminado Correctamente");
        setTimeout(() => {
          setSeGuardo(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filtrarDatos = async ({ nombreBusqueda, categoriaBusqueda }) => {
    const result = await dataAuxiliar.filter(
      (elemento) =>
        elemento.nombre.toLowerCase().indexOf(nombreBusqueda.toLowerCase()) >
          -1 &&
        elemento.categoria
          .toLowerCase()
          .indexOf(categoriaBusqueda.toLowerCase()) > -1
    );
    if (result.length > 0) setDb(result);
  };

  useEffect(() => {
    const cargaDatos = async () => {
      try {
        if (loadinAlmacen) setLoadingProductos(true);
        if (errorAlmacen) {
          setErrorMensaje(errorAlmacen);
          setLoadingProductos(false);
        }
        await getAlmacen();
        if (almacenData) {
          setDb(almacenData.getAlmacen);
          setDataAuxiliar(almacenData.getAlmacen);
          setErrorMensaje(null);
          setLoadingProductos(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    cargaDatos();
  }, [almacenData, getAlmacen, loadinAlmacen, errorAlmacen]);

  const dataContext = {
    db,
    dataEdit,
    seGuardo,
    mesaje,
    loadingProductos,
    errorMensaje,
    openModal,
    setOpenModal,
    setDataEdit,
    createData,
    updateData,
    deleteData,
    filtrarDatos,
    eliminarProductoBD
  };
  return (
    <AlmacenContext.Provider value={dataContext}>
      {children}
    </AlmacenContext.Provider>
  );
};

export { AlmacenProvider };
export default AlmacenContext;
