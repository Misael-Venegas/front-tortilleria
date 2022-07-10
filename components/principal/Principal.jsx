import Layout from "../layout/Layout";
import { Tabs } from "antd";
import { useState } from "react";
import Cargo from "../Vistas/cargo/Cargo";
import Empleados from "../Vistas/empleados/Empleados";
import Proveedor from "../Vistas/proveedor/Proveedor";
import Merma from "../Vistas/merma/Merma";
import TipoAlmacen from "../Vistas/tipoalmacen/TipoAlmacen";
import Insumos from "../Vistas/insumos/Insumos";
import Almacen from "../Vistas/almacen/Almacen";
import TipoMerma from "../Vistas/tipomerma/TipoMerma";
import EntradasAlmacen from "../Vistas/entradasalmacen/EntradasAlmacen";

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
        getKey === "7" && <Merma/>
      }
      {
        getKey === "8" && <TipoMerma/>
      }
      {
        getKey === "9"
      }
      {
        getKey === "10" && <EntradasAlmacen/>
      }
      {
        getKey === "11" && <Almacen/>
      }
      {
        getKey === "12" && <Insumos/>
      }
      {
        getKey === "13" && <Proveedor/>
      }
      {
        getKey === "14" && <TipoAlmacen/>
      }
    </Layout>
  );
};

export default Principal;
