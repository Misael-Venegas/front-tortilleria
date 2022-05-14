import React, { useContext, useState, useEffect } from "react";
import AlmacenContext from "./ContextAlmacen";
import { Table } from "antd";
import { MinusSquareOutlined, FormOutlined } from "@ant-design/icons";

const TableAlmacen = () => {
  const { db, setDataEdit, deleteData } = useContext(AlmacenContext);
  const [datosAlmacen, setDatosAlmacen] = useState([]);
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria",
    },
    {
      title: "Unidad Medida",
      dataIndex: "unidad_Medida",
      key: "unidad_Medida",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
    },
  ];

  useEffect(() => {
    const obj = [];
    const cargaDatos = async () => {
      try {
        if (db) {
          for (let key in db) {
            const {
              id_Producto_Almacen,
              nombre,
              categoria,
              unidad_Medida,
              status,
              stock,
            } = db[key];
            obj.push({
              key: parseInt(key) + 1,
              nombre: nombre,
              categoria: categoria,
              unidad_Medida: unidad_Medida,
              stock: stock,
              status: status,
              acciones: (
                <>
                  <FormOutlined
                    className="seleccionarComponente pr-2"
                    onClick={() => setDataEdit(db[key])}
                  />
                  <MinusSquareOutlined
                    className="seleccionarComponente"
                    onClick={() => deleteData(id_Producto_Almacen)}
                  />
                </>
              ),
            });
          }
          setDatosAlmacen(obj);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    cargaDatos();
  }, [db]);

  return (
    <div className="mt-1">
      <p>
        <strong> Productos Almacen</strong>
      </p>
      <div className="table-wrapper-scroll-y my-custom-scrollbar scrollbar-black thin">
        <div className="force-overflow">
          <Table
            pagination={false}
            columns={columns}
            dataSource={db && datosAlmacen}
          />
        </div>
      </div>
    </div>
  );
};

export default TableAlmacen;
