import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { message, Input, InputNumber, Select, Button } from 'antd'

const CREATE_PRODUCTO = gql`
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
    const { Option } = Select
    const [add_producto, { loading }] = useMutation(CREATE_PRODUCTO)
    const [update_producto, { loading: loadingP }] = useMutation(UPDATE_PRODUCTO)
    const guardarDato = async () => {

        if (idProducto !== "") {
            editarProductos()
            return
        }

        if (nombre === "" || uMedida === "" || tipo === "") {
            message.error("Error: Campos vacios")
            return
        }

        if (precio <= 0 || precio === "") {
            message.error("Error: El precio debe ser mayor a cero")
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
            message.success("El producto se registro de manera correcta")
            limpiarCampos()
        } catch (error) {
            message.error(error.message)
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
            message.success("Producto actualizado")
            limpiarCampos()
        } catch (error) {
            message.error(error.message)
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
        <div className="p-3 mt-3 border bg-light shadow-sm rounded " style={{ minHeight: "75vh" }} >
            <p>Datos del producto</p>

            <label className='pt-1' >Nombre del producto</label>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />

            <label className='pt-1' >Precio de venta</label><br />
            <InputNumber style={{ width: "100%" }} stringMode value={precio} onChange={(e) => setPrecio(e)} />
            <br />
            <label className='pt-1'>Unidad de medida</label>
            <Input value={uMedida} onChange={(e) => setUMedida(e.target.value)} />

            <label className='pt-1'>Tipo</label> <br />

            <Select style={{ width: "100%" }} value={tipo} onChange={(e) => setTipo(e)}  >
                <Option value="" >Selecciona...</Option>
                <Option value="1">Maiz</Option>
                <Option value="2">Plasticos</Option>
                <Option value="3">Refacciones</Option>
            </Select>



            <div className="form-row pt-4">
                <div className="col">
                    <Button className="btn btn-primary float-left" onClick={guardarDato} type='primary' >Guardar</Button>
                </div>
                <div className="col" >
                    <Button className="btn btn-danger float-right" onClick={limpiarCampos} type='primary' danger >Limpiar</Button>
                </div>
            </div>

        </div>
    )
}

export default FormProductos