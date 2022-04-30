import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Message from '../globales/Message'
import SuccesMessage from '../globales/SuccesMessage'

const CREATE_USER = gql`
mutation agregarProducto($input: inputProductos!) {
    agregarProducto(input: $input)
  }
`

const UPDATE_PRODUCTO = gql`
 mutation  editarProducto($input: editarProuctosInput!){
    editarProducto(input: $input)
 }
`

const FormProductos = ({ setActualizar, nombre, setNombre, precio, setPrecio, setUMedida, uMedida, setTipo, tipo, setidProducto, idProducto }) => {


    const [mostarError, setMostarError] = useState(false)
    const [mensajeError, setMensajeError] = useState("")
    const [mensajeSucces, setMensajeSucces] = useState(false)
    const [add_producto, { loading }] = useMutation(CREATE_USER)
    const [update_producto, { loading: loadingP }] = useMutation(UPDATE_PRODUCTO)
    const guardarDato = async () => {

        if (idProducto !== "") {
            editarProductos()
            return
        }

        if (nombre === "" || uMedida === "" || tipo === "") {
            setMensajeError("Error: Campos vacios")
            setMostarError(true)
            setTimeout(() => {
                setMostarError(false)
            }, 2000);
            return
        }

        if (precio <= 0 || precio === "") {
            setMensajeError("Error: El precio debe ser mayor a cero")
            setMostarError(true)
            setTimeout(() => {
                setMostarError(false)
            }, 2000);
            return
        }

        try {
            await add_producto({
                variables: {
                    input: {
                        nombre,
                        precioVenta: parseFloat(precio),
                        unidad: uMedida,
                        id_producto_almacen: parseInt(tipo)
                    }
                }
            })
            setMensajeError("El producto se registro de manera correcta")
            setMensajeSucces(true)
            setTimeout(() => {
                setMensajeSucces(false)
            }, 2000);
            limpiarCampos()
        } catch (error) {
            setMensajeError(error.message)
            setMostarError(true)
            setTimeout(() => {
                setMostarError(false)
            }, 2000);
        }

    }

    const editarProductos = async () => {
        try {
            await update_producto({
                variables: {
                    input: {
                        id_producto: parseInt(idProducto),
                        nombre,
                        precioVenta: parseFloat(precio),
                        unidad: uMedida,
                        id_producto_almacen: parseInt(tipo)
                    }
                }
            })
            setMensajeError("Producto actualizado")
            setMensajeSucces(true)
            limpiarCampos()
            setTimeout(() => {
                setMensajeSucces(false)
            }, 2000);

        } catch (error) {
            setMensajeError(error.message)
            setMostarError(true)
            setTimeout(() => {
                setMostarError(false)
            }, 2000);
        }
    }

    const limpiarCampos = () => {
        setidProducto("")
        setUMedida("")
        setTipo("")
        setPrecio("")
        setNombre("")
        setActualizar(Math.random())
    }

    return (
        <div className="p-3 mt-3 border bg-light shadow rounded ">
            {
                mostarError && <Message msg={mensajeError} bgColor={"alert alert-danger"} />
            }
            {
                mensajeSucces && <SuccesMessage meg={mensajeError} />
            }
            <p>Datos del producto</p>

            <label className='pt-1' >Nombre del producto</label>
            <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />

            <label className='pt-1' >Precio de venta</label>
            <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} />

            <label className='pt-1'>Unidad de medida</label>
            <input type="text" className="form-control" value={uMedida} onChange={(e) => setUMedida(e.target.value)} />

            <label className='pt-1'>Tipo</label>
            <div className="form-row pt-2">
                <div className="col">
                    <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)}  >
                        <option value="" >Selecciona...</option>
                        <option value="1">Maiz</option>
                        <option value="2">Plasticos</option>
                        <option value="3">Refacciones</option>
                    </select>
                </div>
            </div>



            <div className="form-row pt-4">
                <div className="col">
                    <button className="btn btn-primary float-left " onClick={guardarDato}  >Guardar</button>
                </div>
                <div className="col" >
                    <button className="btn btn-danger float-right" >Eliminar</button>
                </div>
            </div>

        </div>
    )
}

export default FormProductos