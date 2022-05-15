import { useContext, useState, useEffect } from "react";
import GastoOperacionContext from "./ContextGastoOperacion";
import { Table } from "antd";

const TablaGasto = () => {
  const { db, setDataDelete, listUsuariosOption, listOption } = useContext(
    GastoOperacionContext
  );
  const [datosTabla, setDatosTabla] = useState([]);
  
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
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usuario",
    },
  ];
  const filaSelected = (record) => {
    const {
      id_operacion,
      producto,
      cantidad,
      precio,
      fecha,
      id_usuario,
      usuario,
    } = record;
   // console.log("Record ", record);
    setDataDelete({
      producto: producto,
      cantidad: cantidad,
      precio: precio,
      fecha: fecha,
      usuario: usuario,
      id_usuario: id_usuario,
      id: id_operacion,
    });
  };

  function formatDate(d) {
    let date = new Date(d);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return (d = yyyy + "/" + mm + "/" + dd);
  }

  useEffect(() => {
    const obj = [];
    const cargaDatos = async () => {
      try {
        if (db && listUsuariosOption && listOption) {
          for (let key in db) {
            const {
              id_operacion,
              id_producto,
              cantidad,
              precio,
              fecha,
              id_usuario,
            } = db[key];
            const result = await listUsuariosOption.filter((elemento) => {
              return elemento.id == id_usuario;
            });
            const resultProducto = await listOption.filter((elemento) => {
              return elemento.id_Producto_Almacen == id_producto;
            });
            if (result.length > 0) {
              obj.push({
                key: parseInt(key) + 1,
                producto:
                  resultProducto[0]["nombre"] +
                  " " +
                  resultProducto[0]["unidad_Medida"],
                cantidad: cantidad,
                precio: precio,
                total: parseFloat(cantidad) * parseFloat(precio),
                fecha: formatDate(fecha),
                usuario: result[0]["email"],
                id_usuario: id_usuario,
                id_operacion: id_operacion,
              });
            }
          }
          setDatosTabla(obj);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    cargaDatos();
  }, [db, listUsuariosOption, listOption]);

  return (
    <div className="mt-3">
      <p><strong>Gastos de Operación</strong></p>
      <div className="table-wrapper-scroll-y my-custom-scrollbar scrollbar-black thin">
        <div className="force-overflow">
          <Table
            pagination={false}
            columns={columns}
            dataSource={db && datosTabla}
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

export default TablaGasto;
