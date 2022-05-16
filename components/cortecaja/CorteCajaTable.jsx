import { Table } from "antd";
import { useContext, useState, useEffect } from "react";
import CorteCajaContext from "./ContextCorteCaja";

const CorteCajaTabla = () => {
  const { tablaDatos, dataProductos, dataUser } = useContext(CorteCajaContext);
  const [dataVentas, setDataVentas] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usuario",
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
      title: "Hora",
      dataIndex: "hora",
      key: "hora",
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
  ];

  useEffect(() => {
    const obj = [];
    const sumaVentas=0;
    const cargaDatos = async () => {
      try {
        if (tablaDatos) {
          // var pos = dataProductos.getProductos.map(function(e) { return e.id_producto; }).indexOf(3);
          for (let key in tablaDatos) {
            const {
              id,
              id_usuario,
              total,
              fecha_venta,
              hora_venta,
              id_producto,
              cantidad,
            } = tablaDatos[key];
            var indexOfUser = dataUser.getUsuarios.findIndex(
              (i) => i.id === id_usuario
            );
            var indexOfProduct = dataProductos.getProductos.findIndex(
              (i) => i.id_producto === id_producto
            );
            obj.push({
              key: parseInt(key) + 1,
              usuario: `${dataUser.getUsuarios[indexOfUser]["nombre"]} ${dataUser.getUsuarios[indexOfUser]["apellidoP"]} ${dataUser.getUsuarios[indexOfUser]["apellidoM"]}`,
              total: total,
              fecha: fecha_venta,
              hora: hora_venta,
              producto: dataProductos.getProductos[indexOfProduct]["nombre"],
              cantidad: cantidad,
            });
            sumaVentas+=total;
          }
          setDataVentas(obj);
          setTotalVentas(sumaVentas);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    cargaDatos();
  }, [tablaDatos]);

  return (
    <div className="p-3 mt-0 shadow-sm">
      <p>
        <strong>Ventas</strong>
      </p>
      <div className="table-wrapper-scroll-y my-custom-scrollbar scrollbar-black thin">
        <div className="force-overflow">
          <Table
            pagination={false}
            columns={columns}
            dataSource={tablaDatos && dataVentas}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="float-right pt-3 d-flex justify-content-betwen ">
            <h4 className="pr-3">Total Ventas $:</h4>
            <h4>{totalVentas}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorteCajaTabla;
