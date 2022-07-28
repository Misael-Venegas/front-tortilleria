import React from 'react'
import { Table, Tooltip } from 'antd'
import { RetweetOutlined } from '@ant-design/icons'
import { DeleteOutlined } from '@ant-design/icons'
const colums = [
    {
        title: "#",
        dataIndex: "key",
        name: "key"
    }, {
        title: "Producto",
        dataIndex: "producto",
        name: "producto"
    }, {
        title: "Cantidad",
        dataIndex: "cantidad",
        name: "cantidad"
    }, {
        title: "Precio",
        dataIndex: "precio",
        name: "precio"
    }, {
        title: "Opciones",
        dataIndex: "opciones",
        name: "opciones"
    }
]


const TablaVentas = ({ arrayVentas, setarrayVentas, arrayProductos, quitarProducto }) => {


    const crearFila = (venta, key) => {
        return {
            key: key + 1,
            producto: obtenerNombreProducto(venta.id_producto),
            cantidad: venta.cantidad + "kg",
            precio: "$" + venta.precio,
            opciones: <span style={{ color: 'red', fontSize: "12pt" }} className='seleccionarComponente' onClick={() => quitarProducto(key)} > <DeleteOutlined /> </span>
        }
    }

    const obtenerNombreProducto = (id_producto) => {
        const nombreProducto = "";
        arrayProductos.map((producto) => {
            if (producto.id_producto === id_producto) {
                nombreProducto = producto.nombre
            }
        })

        return nombreProducto
    }

    return (
        <div className='pt-3' >
            <div className='row' >
                <div className='col-md-6 col-sm-12' >
                    <span>Lista de venta</span>
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Tooltip title="Limpiar tabla">
                        <span className='float-right seleccionarComponente' style={{ fontSize: "16pt", color: "#40A9FF" }} onClick={() => setarrayVentas([])} > <RetweetOutlined /> </span>
                    </Tooltip>
                </div>
            </div>
            <Table columns={colums} dataSource={arrayVentas ? (arrayVentas.map((venta, key) => {
                return crearFila(venta, key)
            })) : []} />
        </div>
    )
}

export default TablaVentas