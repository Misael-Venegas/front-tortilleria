import { useEffect, useState } from "react";
import { Tabs } from "antd";
import Layout from "../layout/Layout";
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
import jwtDecode from "jwt-decode";
import Reportes from "../Vistas/reportes/Reportes";

const { TabPane } = Tabs;

const Principal = () => {
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const { id_cargo } = jwtDecode(token);
      setRol(id_cargo);
    }
  }, []);

  return (
    <Layout>
      <div>
        <Tabs defaultActiveKey="1" tabPosition="top" style={{ height: 220 }}>
          <TabPane tab="Ventas" key="1">
            <Ventas />
          </TabPane>
          {(rol == 1 || rol == 0) && (
            <>
              <TabPane tab="Productos" key="2">
                <Productos />
              </TabPane>
              <TabPane tab="Empleados" key="3">
                <Empleados />
              </TabPane>
              <TabPane tab="Cargo" key="4">
                <Cargo />
              </TabPane>
              <TabPane tab="Corte de caja" key="5">
                <CorteDeCaja />
              </TabPane>
              <TabPane tab="Sucursal" key="6">
                <Sucursal />
              </TabPane>
              <TabPane tab="Salidas" key="9">
                <Salidas />
              </TabPane>
              <TabPane tab="Entradas" key="10">
                <EntradasAlmacen />
              </TabPane>
              <TabPane tab="Almacen" key="11">
                <Almacen />
              </TabPane>
              <TabPane tab="Insumos" key="12">
                <Insumos />
              </TabPane>
              <TabPane tab="Proveedores" key="13">
                <Proveedor />
              </TabPane>
              <TabPane tab="Tipo almacen" key="14">
                <TipoAlmacen />
              </TabPane>
              <TabPane tab="Reportes" key="15">
                <Reportes />
              </TabPane>
            </>
          )}
          <TabPane tab="Merma" key="7">
            <Merma />
          </TabPane>
          <TabPane tab="Tipo merma" key="8">
            <TipoMerma />
          </TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Principal;
