import Layout from "../layout/Layout";
import { Tabs } from 'antd';
import { useState } from "react";
import AgregarUsuarios from "../usuarios/AgregarUsuarios";
import Almacen from "../almacen/Almacen";
import Productos from "../productos/Productos";
import Mermas from "../mermas/Mermas";
import Ventas from "../ventas/Ventas";
import GastosOperacion from "../gastosoperacion/GastosOperacion";
const Principal = () => {
  const { TabPane } = Tabs;
  const [getKey, setGetKey] = useState("1")
  function callback(key) {
    console.log(key);
    setGetKey(key)
  }
  return (

    <Layout>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Almacen" key="1" />
        <TabPane tab="Productos" key="2" />
        <TabPane tab="Mermas" key="3" />
        <TabPane tab="Ventas" key="4" />
        <TabPane tab="Corte de caja" key="5" />
        <TabPane tab="Gastos de Operación" key="6" />
        <TabPane tab="Usuarios" key="7" />
      </Tabs>

      {
        getKey === "1" && <Almacen />
      }
      {
        getKey === "2" && <Productos />
      }
      {
        getKey === "3" && <Mermas />
      }
      {
        getKey === "4" && <Ventas />
      }
      {
        getKey === "5"
      }
      {
        getKey === "6" && <GastosOperacion />
      }
      {
        getKey === "7" && <AgregarUsuarios />
      }


    </Layout>
  );
};

export default Principal;
