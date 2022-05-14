import { gql, useLazyQuery } from "@apollo/client";
import { useContext, useState, useEffect } from "react";
import MermasContext from "./MermasContext";

const OBTENERUSUARIOS = gql`
  query getUsuario($id: Int!) {
    getUsuario(id: $id) {
      email
    }
  }
`;

const MermasTablaRow = ({ el }) => {
  const { setDataDelete } = useContext(MermasContext);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const { id_merma, tipo, cantidad, descripcion, id_usuario, fecha } = el;
  const [getUsuario, { data: dataUser }] = useLazyQuery(OBTENERUSUARIOS);

  function formatDate(d) {
    let date = new Date(d);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return (d = dd + "/" + mm + "/" + yyyy);
  }

  useEffect(() => {
    const cargaDatos = async () => {
      try {
        await getUsuario({
          variables: {
            id: parseInt(id_usuario),
          },
        });
        if (dataUser) setNombreUsuario(dataUser.getUsuario["email"]);
      } catch (error) {
        console.log(error.message);
      }
    };
    cargaDatos();
  }, [id_usuario, dataUser, getUsuario]);
  
  return (
    <tr
      key={id_merma}
      onClick={() =>
        setDataDelete({
          producto: tipo,
          cantidad: cantidad,
          descripcion: descripcion,
          fecha: fecha,
          id_usuario: id_usuario,
          id: id_merma,
        })
      }
      className="seleccionarComponente"
    >
      <td>{tipo}</td>
      <td>{cantidad}</td>
      <td>{descripcion}</td>
      <td>{nombreUsuario}</td>
      <td>{formatDate(fecha)}</td>
    </tr>
  );
};

export default MermasTablaRow;
