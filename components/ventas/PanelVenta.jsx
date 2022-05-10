import React, { useState, useEffect } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { message, Button, InputNumber, Select } from 'antd'
const GET_PRODUCTOS = gql`
query  getProductos($key: Float!){
    getProductos(key: $key){
        id_producto
        nombre
        precioVenta
        unidad
        id_producto_almacen
    }
}
`

const PanelVenta = ({ setArrayVentas, arrayVentas, setVentas, ventas, setArrayGVentas, arrayGVentas }) => {
    const [producto, setProducto] = useState(-1)
    const [cantidad, setCantidad] = useState(1)
    const [id, setIdProducto] = useState(1);
    const [obtenerProductos, { data: dataProductos }] = useLazyQuery(GET_PRODUCTOS);

    const { Option } = Select

    useEffect(() => {
        obtenerProductos({
            variables: {
                key: Math.random()
            }
        })
    }, [])


    const agregarVentas = async () => {
        try {
            if (cantidad === "") {
                message.error("Ingrese un dato numerico")
                return
            }
            parseInt(cantidad)
        } catch (error) {
            message.error("Ingrese un dato numerico")
            return
        }
        if (producto <= 0) {
            message.error("Seleccion un producto  ")
            return
        }

        const datosOriginales = obtenerProductoOriginal()
        const crearProducto = {
            id,
            producto: datosOriginales.nombre,
            precio: datosOriginales.precioVenta,
            cantidad,
            total: (cantidad * datosOriginales.precioVenta)
        }

        const datoVenta = {
            id_usuario: 1,
            total: (cantidad * datosOriginales.precioVenta),
            fecha_venta: new Date().toLocaleDateString(),
            hora_venta: new Date().toLocaleTimeString(),
            id_producto: datosOriginales.id_producto,
            cantidad: parseFloat(cantidad)
        }

        setVentas(ventas + crearProducto.total)
        setArrayVentas([...arrayVentas, crearProducto])
        setArrayGVentas([...arrayGVentas, datoVenta])
        setIdProducto(id + 1);
    }
    const obtenerProductoOriginal = () => {
        const respuesta = null;
        dataProductos.getProductos.forEach((p) => {

            if (p.id_producto === parseInt(producto)) {
                respuesta = p
            }
        })
        return respuesta
    }
    return (
        <>
            <div className='border shadow-sm' style={{ width: 700, height: 100 }} >
                <div className='row m-1' >
                    <div className='col-md-6 col-sm-12'>
                        <div className='d-flex justify-content-between pt-4'>
                            <span className='pt-1' >Producto</span>
                            <Select style={{ width: "80%" }} value={producto} onChange={(e) => setProducto(e)} >
                                <Option value={-1}> </Option>
                                {
                                    dataProductos && dataProductos.getProductos.map((producto, key) => {
                                        return (
                                            <Option key={key} value={producto.id_producto} >
                                                {
                                                    producto.nombre
                                                }
                                            </Option>
                                        )
                                    }
                                    )
                                }
                            </Select>
                        </div>

                    </div>

                    <div className='col-md-6 col-sm-12'>
                        <div className='d-flex justify-content-between pt-4' >
                            <span className='pt-1' > Cantidad:</span>
                            <InputNumber stringMode style={{ width: "150px" }}
                                value={cantidad} onChange={(e) => setCantidad(e)} />
                                <Button style={{ backgroundColor: '#FFCA2C' }} onClick={agregarVentas} >Agregar</Button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default PanelVenta