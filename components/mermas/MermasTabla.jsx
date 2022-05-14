import { useContext, useState, useEffect } from "react";
import MermasContext from "./MermasContext";
import { Table } from "antd";
import { gql, useLazyQuery } from "@apollo/client";

const OBTENERUSUARIOS = gql`
  query getUsuario($id: Int!) {
    getUsuario(id: $id) {
      email
    }
  }
`;

const MermasTabla = () => {
  const { dataMermas, setDataDelete } = useContext(MermasContext);
  const [getUsuario, { data: dataUser }] = useLazyQuery(OBTENERUSUARIOS);
  const [mermas, setMermas] = useState([]);

  function formatDate(d) {
    let date = new Date(d);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return (d = dd + "/" + mm + "/" + yyyy);
  }

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Producto",
      dataIndex: "producto",
      key: "producto",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usuario",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
  ];

  /*const crearColumna = (dato, key) => {
    const { id_merma, tipo, cantidad, descripcion, id_usuario, fecha } = dato;
    return {
      key: key + 1,
      producto: tipo,
      cantidad: cantidad,
      descripcion: descripcion,
      usuario: id_usuario,
      fecha: formatDate(fecha),
      id_merma: id_merma,
    };
  };
*/

  const filaSelected = (record) => {
    const { id_merma, producto, cantidad, descripcion, id_usuario, fecha } =
      record;
    setDataDelete({
      producto: producto,
      cantidad: cantidad,
      descripcion: descripcion,
      fecha: fecha,
      id_usuario: id_usuario,
      id: id_merma,
    });
  };

  useEffect(() => {
    const obj = [];
    const cargaDatos = async () => {
      try {
        if (dataMermas) {
          for (let key in dataMermas.getMermas) {
            const { id_merma, tipo, cantidad, descripcion, id_usuario, fecha } =
              dataMermas.getMermas[key];

            await getUsuario({
              variables: {
                id: parseInt(id_usuario),
              },
            });
            if (dataUser) {
              obj.push({
                key: parseInt(key) + 1,
                producto: tipo,
                cantidad: cantidad,
                descripcion: descripcion,
                usuario: dataUser.getUsuario["email"],
                fecha: formatDate(fecha),
                id_merma: id_merma,
              });
            }
          }
          setMermas(obj);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    cargaDatos();
  }, [dataMermas, getUsuario, dataUser]);

  return (
    <div className="p-3 mt-0 shadow-sm">
      <p>
        <strong>Tabla Mermas</strong>
      </p>
      <div className="table-wrapper-scroll-y my-custom-scrollbar scrollbar-black thin">
        <div className="force-overflow">
          <Table
            pagination={false}
            columns={columns}
            dataSource={dataMermas && mermas}
            onRow={(record) => {
              return {
                onClick: () => {
                  filaSelected(record);
                },
              };
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MermasTabla;
