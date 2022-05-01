import React, { useState, useEffect } from 'react'
import { useLazyQuery, gql } from '@apollo/client'

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

const PanelVenta = ({ setArrayVentas, arrayVentas, setVentas, ventas, setArrayGVentas, arrayGVentas,
    setmensaje, setmensajeError
}) => {
    const [producto, setProducto] = useState(-1)
    const [cantidad, setCantidad] = useState(1)
    const [id, setIdProducto] = useState(1);
    const [obtenerProductos, { data: dataProductos }] = useLazyQuery(GET_PRODUCTOS);

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
                setmensaje("Ingrese un dato numerico")
                setmensajeError(true)
                setTimeout(() => {
                    setmensajeError(false)
                }, 2000);
                return
            }
            parseInt(cantidad)
        } catch (error) {
            setmensaje("Ingrese un dato numerico")
            setmensajeError(true)
            setTimeout(() => {
                setmensajeError(false)
            }, 2000);
            return
        }
        if (producto <= 0) {
            setmensaje("Seleccion un producto  ")
            setmensajeError(true)
            setTimeout(() => {
                setmensajeError(false)
            }, 2000);
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
        console.log(producto)

        dataProductos.getProductos.forEach((p) => {

            if (p.id_producto === parseInt(producto)) {
                respuesta = p
            }
        })
        return respuesta
    }
    return (
        <>
            <div className='border shadow' style={{ width: 700, height: 100 }} >
                <div className='row m-1' >
                    <div className='col-md-6 col-sm-12'>
                        <div className='d-flex justify-content-between pt-4'>
                            <span className='pt-1' >Producto</span>
                            <select className='form-select' style={{ width: "50%" }} value={producto} onChange={(e) => setProducto(e.target.value)} >
                                <option value={-1}></option>
                                {
                                    dataProductos && dataProductos.getProductos.map((producto, key) => {
                                        return (
                                            <option key={key} value={producto.id_producto} >
                                                {
                                                    producto.nombre
                                                } </option>
                                        )
                                    }
                                    )
                                }
                            </select>
                            <div className="form-check pt-1">
                                <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                                <label className="form-check-label" >
                                    A granel
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className='col-md-6 col-sm-12'>
                        <div className='d-flex justify-content-between pt-4' >
                            <span className='pt-1' > Cantidad:</span>
                            <input type="number" className='form-control' style={{ width: "100px" }}
                                value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                            <button className='btn btn-warning' onClick={agregarVentas} >Agregar</button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default PanelVenta