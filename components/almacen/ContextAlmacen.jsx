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
  //const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

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

  const [updateAlmacenProducto] = useMutation(ACTUALIZARPRODUCTOALMACEN, {
    refetchQueries: (mutationResult) => [{ query: OBTENERPRODUCTOSALMACEN }],
  });

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
            stock: parseInt(dataForm.stock),
          },
        },
      });
      if (!error) {
        alert("Datos Guardados");
        //refetchAlmacen();
        //setDb([...db, data]);
      } else {
        //setDb(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const updateData = async (dataForm) => {
    console.log("Actualizar: ", dataForm);
    try {
      await updateAlmacenProducto({
        variables: {
          input: {
            id_Producto_Almacen:dataForm.id,
            nombre: dataForm.nombreProducto,
            categoria: dataForm.categoria,
            unidad_Medida: dataForm.medida,
            status: dataForm.status,
            stock: parseInt(dataForm.stock),
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteData = async (id) => {
    let isDelete = window.confirm(`¿Deseas eliminar el registro: ${id}  ?`);
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
    } else {
      alert("cancelado");
    }
  };

  useEffect(() => {
    const cargaDatos = async () => {
      try {
        /* if (loadinAlmacen) return "Loading...";
        if (errorAlmacen) return `Error! ${error.message}`;*/
        await getAlmacen();
        if (almacenData) setDb(almacenData.getAlmacen);
      } catch (error) {
        console.log(error.message);
      }
    };
    cargaDatos();
  }, [almacenData, getAlmacen]);

  const dataContext = {
    db,
    dataEdit,
    setDataEdit,
    createData,
    updateData,
    deleteData,
  };
  return (
    <AlmacenContext.Provider value={dataContext}>
      {children}
    </AlmacenContext.Provider>
  );
};

export { AlmacenProvider };
export default AlmacenContext;
