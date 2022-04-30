import React, { useEffect, useState } from 'react'
import { useLazyQuery, gql, useMutation } from '@apollo/client'
import SuccesMessage from '../globales/SuccesMessage';

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

    const [mostarError, setMostarError] = useState(false)
    const [mensajeError, setMensajeError] = useState("")
    const [buscar, setBuscar] = useState("")
    const [array, setArrayProductos] = useState([])
    const [arrayAuxiliar, setArrayAuxiliar] = useState([])
    const [obtrenerProductos, { loading }] = useLazyQuery(GET_PRODUCTS, {
        onCompleted: (data) => {
            setArrayProductos(data.getProductos)
            setArrayAuxiliar(data.getProductos)
        }
    })
    const [mostrarSucces, setMostrarSucces] = useState(false);
    const [deleteProducto, { loading: loadingDelete }] = useMutation(DELETE_PRODUCTO);
    useEffect(() => {
        try {
            obtrenerProductos({
                variables: {
                    key: Math.random()
                }
            })
        } catch (error) {
            setMensajeError(error.message)
            setMostarError(true)
            setTimeout(() => {
                setMostarError(false)
            }, 2000);
        }
    }, [actualizar])

    const eliminarProducto = async (id) => {
        try {
            await deleteProducto({
                variables: {
                    id_producto: parseInt(id)
                }
            })

            setMensajeError("Producto eliminado")
            setMostrarSucces(true)
            setTimeout(() => {
                setMostrarSucces(false)
            }, 2000);
            setActualizar(Math.random())
        } catch (error) {
            setMensajeError(error.message)
            setMostarError(true)
            setTimeout(() => {
                setMostarError(false)
            }, 2000);
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

    return (
        <div className='p-3 mt-3 shadow ' >
            {
                mostarError && <Message msg={mensajeError} bgColor={"alert alert-danger"} />
            }
            {
                mostrarSucces && <SuccesMessage meg={mensajeError} />
            }
            <label> Producto </label>
            <div style={{ width: 350 }} >
                <div className='row'>
                    <div className='col-md-8 col-sm-12' >
                        <input type="text" className='form-control' value={buscar} onChange={(e) => setBuscar(e.target.value)} />
                    </div>
                    <div className='col-md-4 col-sm-12' >
                        <button className='btn btn-primary float-right' onClick={buscarProducto} >Buscar</button>
                    </div>
                </div>
            </div>
            <table className="table table-striped mt-5">
                <thead className="thead-dark">
                    <tr>
                        <th>id Producto</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Unidad de medida</th>
                        <th>Producto almacen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        array && array.map((dato, key) => {
                            return (
                                <tr key={key} >
                                    <td>
                                        {dato.id_producto}
                                    </td>
                                    <td>
                                        {dato.nombre}
                                    </td>
                                    <td>
                                        {dato.precioVenta}
                                    </td>
                                    <td>
                                        {dato.unidad}
                                    </td>
                                    <td>
                                        {dato.id_producto_almacen}
                                    </td>
                                    <td>
                                        <img src="./img/editIcon.png" width="25px" alt="edit" className='seleccionarComponente pr-2' onClick={() => editarProductos(dato)} />
                                        <img src="./img/menos-30.png" alt="delete" className='seleccionarComponente' onClick={() => eliminarProducto(dato.id_producto)} />

                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
