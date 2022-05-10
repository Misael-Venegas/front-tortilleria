import React, { useEffect, useState } from 'react'
import { useLazyQuery, gql, useMutation } from '@apollo/client'
import { message, Button, Input, Table } from 'antd';
import { MinusSquareOutlined, FormOutlined } from '@ant-design/icons'
const GET_PRODUCTS = gql`
query getProductos($key: Float!) {
    getProductos(key: $key) {
    id_producto
    id_producto_almacen
    nombre
    precioVenta
    unidad  
    }
  }
`

const DELETE_PRODUCTO = gql`
    mutation eliminarProducto($id_producto: Int!){
        eliminarProducto(id_producto: $id_producto)
    } 
`;

export const TblProductos = ({ actualizar, setActualizar, editarProductos }) => {
    const [buscar, setBuscar] = useState("")
    const [array, setArrayProductos] = useState([])
    const [arrayAuxiliar, setArrayAuxiliar] = useState([])
    const [obtrenerProductos, { loading }] = useLazyQuery(GET_PRODUCTS, {
        onCompleted: (data) => {
            setArrayProductos(data.getProductos)
            setArrayAuxiliar(data.getProductos)
        }
    })
    const [deleteProducto, { loading: loadingDelete }] = useMutation(DELETE_PRODUCTO);
    useEffect(() => {
        try {
            obtrenerProductos({
                variables: {
                    key: Math.random()
                }
            })
        } catch (error) {
            message.error(error.message)
        }
    }, [actualizar])

    const eliminarProducto = async (id) => {
        try {
            await deleteProducto({
                variables: {
                    id_producto: parseInt(id)
                }
            })

            message.success("Producto eliminado")
            setActualizar(Math.random())
        } catch (error) {
            message.error(error.message)
        }

    }

    const buscarProducto = () => {
        if (buscar === "") {
            setArrayProductos(arrayAuxiliar)
            return
        }
        const arrayNuevo = arrayAuxiliar.filter((dato) => {
            return dato.nombre.toLowerCase().includes(buscar.toLowerCase())
        })
        setArrayProductos(arrayNuevo)
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key'
        }, {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre'
        }, {
            title: 'Precio',
            dataIndex: 'precio',
            key: 'precio'
        }, {
            title: 'Unidad de medida',
            dataIndex: 'unidadMedida',
            key: 'unidadMedida'
        }, {
            title: 'Producto almacen',
            dataIndex: 'productoalmacen',
            key: 'productoalmacen'
        }, {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones'
        },
    ]

    const crearColumna = (dato, key) => {
        return {
            key: key + 1,
            nombre: dato.nombre,
            precio: dato.precioVenta,
            unidadMedida: dato.unidad,
            productoalmacen: dato.id_producto_almacen,
            acciones: <> < FormOutlined className='seleccionarComponente pr-2' onClick={() => editarProductos(dato)} />
                <MinusSquareOutlined className='seleccionarComponente' onClick={() => eliminarProducto(dato.id_producto)} />
            </>
        }
    }

    return (
        <div className='p-3 mt-3 shadow-sm ' >
            <label> Producto </label>
            <div style={{ width: 350 }} >
                <div className='row'>
                    <div className='col-md-8 col-sm-12' >
                        <Input value={buscar} onChange={(e) => setBuscar(e.target.value)} />
                    </div>
                    <div className='col-md-4 col-sm-12' >
                        <Button type='primary' onClick={buscarProducto} >Buscar</Button>
                    </div>
                </div>
            </div>
            <Table pagination={false} loading={loading} columns={columns} dataSource={array ? array.map((dato, key) => {
                return (
                    crearColumna(dato, key)
                )
            }) : []} />
        </div>
    )
}
