import Layout from "../layout/Layout";
import { Tabs } from "antd";
import React from "react";
import Cargo from "../Vistas/cargo/Cargo";
import Empleados from "../Vistas/empleados/Empleados";
import Proveedor from "../Vistas/proveedor/Proveedor";
import Merma from "../Vistas/merma/Merma";
import TipoAlmacen from "../Vistas/tipoalmacen/TipoAlmacen";
import Insumos from "../Vistas/insumos/Insumos";
import Almacen from "../Vistas/almacen/Almacen";
import TipoMerma from "../Vistas/tipomerma/TipoMerma";
import EntradasAlmacen from "../Vistas/entradasalmacen/EntradasAlmacen";
import Productos from "../Vistas/productos/Productos";
import Sucursal from "../Vistas/sucursal/Sucursal";
import Ventas from "../Vistas/ventas/Ventas";
import CorteDeCaja from "../Vistas/corteDeCaja/CorteDeCaja";
import Salidas from "../Vistas/salidas/Salidas";

const Principal = () => {
  const { TabPane } = Tabs;

  return (

    <Layout  >
      <Tabs defaultActiveKey="1" size="small"  >
        <TabPane tab="Ventas" key="1" >
          {
             <Ventas />
          }
        </TabPane>

        <TabPane tab="Productos" key="2" >
          <Productos />
        </TabPane>
        <TabPane tab="Empleados" key="3" >
          <Empleados />
        </TabPane>
        <TabPane tab="Cargo" key="4" >
          <Cargo />
        </TabPane>
        <TabPane tab="Corte de caja" key="5" >
          <CorteDeCaja />
        </TabPane>
        <TabPane tab="Sucursal" key="6" >
          <Sucursal />
        </TabPane>
        <TabPane tab="Merma" key="7" >
          {
            <Merma />
          }
        </TabPane>
        <TabPane tab="Tipo merma" key="8" >
          {
              <TipoMerma />
          }
        </TabPane>
        <TabPane tab="Salidas" key="9" >
          <Salidas/>
        </TabPane>
        <TabPane tab="Entradas" key="10" >
          {
             <EntradasAlmacen />
          }
        </TabPane>
        <TabPane tab="Almacen" key="11" >
          {
              <Almacen />
          }
        </TabPane>
        <TabPane tab="Insumos" key="12" >
          {
            <Insumos />
          }
        </TabPane>
        <TabPane tab="Proveedores" key="13" >
          {
            <Proveedor />
          }
        </TabPane>
        <TabPane tab="Tipo almacen" key="14" >
          {
            <TipoAlmacen />
          }
        </TabPane>
      </Tabs>

    </Layout>

  );
};

export default Principal;
