import { Table } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { AlertEliminarProducto } from './AlertEliminarProducto'

const TablProductos = ({ arrayProductos, setactuaizarTabla }) => {
    const { alertEliminarProducto } = AlertEliminarProducto()
    
    const columns = [
        {
            title: "#",
            dataIndex: "key",
            name: "key"
        }, {
            title: "Producto",
            dataIndex: "producto",
            name: "producto"
        }, {
            title: "Opciones",
            dataIndex: "opciones",
            name: "opciones"
        }
    ]

    const crearFila = (producto, key) => {
        return {
            key: key,
            producto: producto.nombre,
            opciones: <span style={{ color: 'red' }} className='seleccionarComponente' ><DeleteOutlined onClick={() => alertEliminarProducto(producto.id_producto, setactuaizarTabla)} /></span>
        }
    }
    return (
        <>
            <Table columns={columns} className="pt-3" dataSource={arrayProductos ? (arrayProductos.map((producto, key) => {
                return (
                    crearFila(producto, key)
                )
            })) : []} />
        </>
    )
}

export default TablProductos