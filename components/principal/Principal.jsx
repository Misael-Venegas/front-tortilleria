import Layout from "../layout/Layout";
import { Tabs } from "antd";
import { useState } from "react";
import Cargo from "../Vistas/cargo/Cargo";
import Empleados from "../Vistas/empleados/Empleados";

const Principal = () => {
  const { TabPane } = Tabs;
  const [getKey, setGetKey] = useState("1");
  function callback(key) {
    console.log(key);
    setGetKey(key);
  }
  return (
    <Layout>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Ventas" key="1" />
        <TabPane tab="Productos" key="2" />
        <TabPane tab="Empleados" key="3" />
        <TabPane tab="Cargo" key="4" />
        <TabPane tab="Corte de caja" key="5" />
        <TabPane tab="Sucursal" key="6" />
        <TabPane tab="Merma" key="7" />
        <TabPane tab="Tipo merma" key="8" />
        <TabPane tab="Salidas" key="9" />
        <TabPane tab="Entradas" key="10" />
        <TabPane tab="Almacen" key="11" />
        <TabPane tab="Insumos" key="12" />
        <TabPane tab="Proveedores" key="13" />
        <TabPane tab="Tipo almacen" key="14" />
      </Tabs>
      {
        getKey === "1"
      }
      {
        getKey === "2"
      }
      {
        getKey === "3" && <Empleados />
      }
      {
        getKey === "4" && <Cargo />
      }
      {
        getKey === "5"
      }
      {
        getKey === "6"
      }
      {
        getKey === "7"
      }
      {
        getKey === "8"
      }
      {
        getKey === "9"
      }
      {
        getKey === "10"
      }
      {
        getKey === "11"
      }
      {
        getKey === "12"
      }
      {
        getKey === "13"
      }
      {
        getKey === "14"
      }

    </Layout>
  );
};

export default Principal;
