import React from 'react'
import { Input, Table, Image } from 'antd'
import { MinusSquareOutlined } from '@ant-design/icons'
const TblVentas = ({ arrayVentas, ventas, setArrayVentas, arrayGVentas, setArrayGVentas, setVentas }) => {
    const eliminarProducto = (dato) => {
        console.log(dato)
        const index = arrayVentas.findIndex(producto => parseInt(producto.id) === parseInt(dato.id))
        arrayVentas.splice(index, 1);
        arrayGVentas.splice(index, 1);
        const auxiliar = arrayVentas;
        const auxiliarGVentas = arrayGVentas;
        setArrayVentas([])
        setArrayVentas([...auxiliar])
        setArrayGVentas([])
        setArrayGVentas([...auxiliarGVentas])
        setVentas(ventas - dato.total)
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        }, {
            title: 'Producto',
            dataIndex: 'producto',
            key: 'producto'
        }, {
            title: 'Precio venta',
            dataIndex: 'PrecioVenta',
            key: 'PrecioVenta'
        }, {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        }, {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        }, {
            title: '_',
            dataIndex: '_',
            key: '_',
        }

    ]
    const crearColumna = (venta, key) => {
        return {
            key: key + 1,
            producto: venta.producto,
            PrecioVenta: venta.precio,
            cantidad: venta.cantidad,
            total: venta.total,
            _: <MinusSquareOutlined  onClick={() => eliminarProducto(venta)}  />
        }
    }
    return (
        <>
            <div className='p-4' >
                <Table columns={columns} pagination={false} dataSource={arrayVentas ? arrayVentas.map((venta, key) => {
                    return (
                        crearColumna(venta, key)
                    )
                }) : []} />
                <div className='row'>
                    <div className='col'>
                        <div className='float-right pt-3 d-flex justify-content-betwen '>
                            <h4 className='pr-3'>Total a pagar  $:</h4>
                            <Input style={{ width: 100 }} disabled={true} value={ventas} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}

export default TblVentas