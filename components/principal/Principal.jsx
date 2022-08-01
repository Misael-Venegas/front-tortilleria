import { useEffect, useState } from "react";
import { Tabs, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from '@ant-design/icons'
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
  const [verCorteCaja, setverCorteCaja] = useState(5)
  const [verMerma, setverMerma] = useState(7)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const { id_cargo } = jwtDecode(token);
      setRol(id_cargo);
    }
  }, []);

  const menu = (
    <Menu
      items={[
        {
          key: '5',
          label: (
            <p onClick={() => setverCorteCaja(5)} >Corte de caja</p>
          ),
        },
        {
          key: '15',
          label: (
            <p onClick={() => setverCorteCaja(15)} >Reportes</p>
          ),
        },
      ]}
    />
  )

  const menuMerma = (
    <Menu
      items={[
        {
          key: '7',
          label: (
            <p onClick={() => setverMerma(7)} >Merma</p>
          ),
        },
        {
          key: '8',
          label: (
            <p onClick={() => setverMerma(8)} >Tipo Merma</p>
          ),
        },
      ]}
    />
  )
  console.log(verCorteCaja)
  return (
    <Layout>
      <div>
        <Tabs defaultActiveKey="1" tabPosition="top" style={{ height: 220 }}>

          {rol !== 0 && <TabPane tab="Ventas" key="1">
            <Ventas />
          </TabPane>
          } {(rol == 1 || rol == 0) && (
            <>
              {rol !== 0 &&
                <TabPane tab="Productos" key="2">
                  <Productos />
                </TabPane>

              }
              <TabPane tab="Empleados" key="3">
                <Empleados />
              </TabPane>
              {
                rol !== 0 && <>
                  <TabPane tab="Cargo" key="4">
                    <Cargo />
                  </TabPane>
                  <TabPane tab={<Dropdown overlay={menu} trigger={['click']} >
                    <span onClick={(e) => e.preventDefault()}>
                      <Space>
                        Corte de caja
                        <DownOutlined />
                      </Space>
                    </span>
                  </Dropdown>} key="5">
                    {
                      verCorteCaja === 5 && <CorteDeCaja />
                    }
                    {
                      verCorteCaja === 15 && <Reportes />
                    }

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
                  <TabPane tab="Proveedores" key="13">
                    <Proveedor />
                  </TabPane>
                  <TabPane tab="Tipo almacen" key="14">
                    <TipoAlmacen />
                  </TabPane>
                </>
              }
            </>
          )}
          {
            rol !== 0 && <>
              <TabPane tab={<Dropdown overlay={menuMerma} trigger={['click']} >
                <span onClick={(e) => e.preventDefault()}>
                  <Space>
                    Merma
                    <DownOutlined />
                  </Space>
                </span>
              </Dropdown>} key="7">
                {
                  verMerma === 7 && <Merma />
                }
                {
                  verMerma == 8 && <TipoMerma />
                }
              </TabPane>
            </>
          }
        </Tabs>

      </div>
    </Layout>
  );
};

export default Principal;
