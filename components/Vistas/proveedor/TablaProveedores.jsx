import { Table } from 'antd'

const TablaProveedores = () => {

  const columns = [{
    title: "#",
    dataIndex: "key",
    name: "key",
  },
  {
    title: "Nombre Proveedor",
    dataIndex: "nombre_proveedor",
    name: "nombre_proveedor"
  },
  {
    title: "Correo",
    dataIndex: "correo",
    name: "correo"
  },
  {
    title: "Teléfono",
    dataIndex: "telefono",
    name: "telefono"
  },
  {
    title: "Acciones",
    dataIndex: "acciones",
    name: "acciones"
  }
  ]

  return (
    <div>
      <Table className='pt-5' columns={columns} >

      </Table>
    </div>
  )
}

export default TablaProveedores