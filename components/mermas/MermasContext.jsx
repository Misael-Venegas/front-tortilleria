import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const MermasContext = createContext();

const OBTENERMERMAS = gql`
  query getMermas {
    getMermas {
      id_merma
      tipo
      cantidad
      descripcion
      id_usuario
      fecha
    }
  }
`;
const INSERTARMERMA = gql`
  mutation CreateMerma($input: mermaInput!) {
    createMerma(input: $input) {
      tipo
      cantidad
      descripcion
      id_usuario
      fecha
    }
  }
`;

const ELIMINARMERMA = gql`
  mutation deleteMerma($id: Int!) {
    deleteMerma(id_merma: $id) {
      id_merma
    }
  }
`;

const MermasProvider = ({ children }) => {
  const [getMermas, { data: dataMermas, loading, error }] =
    useLazyQuery(OBTENERMERMAS);
  const [createMerma, { error: errorCreateMerma }] = useMutation(
    INSERTARMERMA,
    { refetchQueries: (mutationResult) => [{ query: OBTENERMERMAS }] }
  );
  const [deleteMerma] = useMutation(ELIMINARMERMA, {
    refetchQueries: (mutationResult) => [{ query: OBTENERMERMAS }],
  });

  const [dataDelete, setDataDelete] = useState(null);
  const [loadingMermas, setLoadingMermas] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState(null);
  const [seGuardo, setSeGuardo] = useState(false);
  const [mesaje, setMensaje] = useState("");

  useEffect(() => {
    const cargaDatos = async () => {
      try {
        if (loading) setLoadingMermas(true);
        await getMermas();
        if (error) setErrorMensaje(error);
      } catch (error) {
        console.log(error.message);
      }
    };
    cargaDatos();
  }, [getMermas]);

  const createData = async (dataForm) => {
    /*console.log(new Date().toLocaleDateString());//dd/mm/yyy
    console.log(dataForm.fecha);//mm/dd/yyyy
    //calendar: yyyy/mm/dd*/
    try {
      await createMerma({
        variables: {
          input: {
            tipo: dataForm.producto,
            cantidad: parseFloat(dataForm.cantidad),
            descripcion: dataForm.descripcion,
            id_usuario: parseInt(jwt_decode(localStorage.getItem("token")).id),
            fecha: dataForm.fecha,
          },
        },
      });
      if (!errorCreateMerma) {
        setSeGuardo(true);
        setMensaje("Merma Agregada Correctamente");
        setTimeout(() => {
          setSeGuardo(false);
        }, 2000);
      } else {
        console.log(errorCreateMerma);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteData = async (dataForm) => {
    try {
      if (dataForm.id >= 0) {
        await deleteMerma({
          variables: {
            id: parseInt(dataForm.id),
          },
        });
        setSeGuardo(true);
        setMensaje("Merma Eliminada Correctamente");
        setTimeout(() => {
          setSeGuardo(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dataContext = {
    dataMermas,
    dataDelete,
    errorMensaje,
    loadingMermas,
    seGuardo,
    mesaje,
    setDataDelete,
    createData,
    deleteData,
  };
  return (
    <MermasContext.Provider value={dataContext}>
      {children}
    </MermasContext.Provider>
  );
};

export { MermasProvider };
export default MermasContext;
