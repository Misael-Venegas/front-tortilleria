import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Input, Button, Select, message } from 'antd'
import { MinusOutlined, SaveOutlined } from '@ant-design/icons'
const CREAR_USUARIOS = gql`
mutation createusuario($input: usuarioInput!) {
    createusuario(input: $input) {
      id
      nombre
      apellidoP
      apellidoM
      telefono
      email
      password
      tipo
    }
  }`

const ELIMINAR_USUARIO = gql`
mutation eliminarUsuario($id: Int!) {
    eliminarUsuario(id: $id)
  }
`;

const UPDATE_USER = gql`
   mutation editarUsuario($input: editarUsuarioInput!){
    editarUsuario(input: $input)

   }
`;
const DatosUsuarios = ({ setActualizar,
    selectTipo, setSelectTipo,
    nombre, setNombre,
    paterno, setPaterno,
    materno, setMaterno,
    telefono, setTelefono,
    email, setEmail,
    contrasenhia, setContrasenhia, idUsuario, setIdUsuario
}) => {

    const [nuevoUsuario, { loading: loadingCreate, error }] = useMutation(CREAR_USUARIOS)
    const [eliminarUsr, { data, loading: loadingDelete }] = useMutation(ELIMINAR_USUARIO)
    const [editarUsr] = useMutation(UPDATE_USER);


    const crearUsuario = async () => {
        //  console.log(nombre, paterno, materno, telefono, email, contrasenhia, selectTipo)
        if (idUsuario !== "") {
            editarUsuario()
            return
        }
        if (nombre === "" || paterno === "" || materno === "" || telefono === "" || email === "" || contrasenhia === "" || selectTipo === "") {
            message.error("Error: Campos vacíos")
            return
        }

        try {
            await nuevoUsuario({
                variables: {
                    input: {
                        nombre,
                        apellidoP: paterno,
                        apellidoM: materno,
                        telefono,
                        email,
                        password: contrasenhia,
                        tipo: parseInt(selectTipo)
                    }
                }
            })
            setActualizar(Math.random())
            message.success("El usuario se guardo de manera correcta")
            limpiarCampos()
        } catch (error) {
            message.error(error.message)
        }
    }

    const editarUsuario = async () => {
        try {
            await editarUsr({
                variables: {
                    input: {
                        id: idUsuario,
                        nombre,
                        apellidoP: paterno,
                        apellidoM: materno,
                        telefono,
                        email,
                        password: contrasenhia,
                        tipo: parseInt(selectTipo)
                    }
                }
            })
            setActualizar(Math.random())
            message.success("los datos se actualizaron de manera correcta")
            limpiarCampos()
        } catch (error) {
            message.error(error.message)
        }
    }

    const limpiarCampos = () => {
        setIdUsuario("")
        setNombre("")
        setPaterno("")
        setMaterno("")
        setTelefono("")
        setEmail("")
        setContrasenhia("")
        setSelectTipo("")
    }

    const eliminarUsuario = async () => {

        if (idUsuario === "") {
            message.error("Error: Selecciona un elemento de la tabla para poder completar esta acción")
            return
        }

        try {
            await eliminarUsr({
                variables: {
                    id: parseInt(idUsuario)
                }
            })

            setActualizar(Math.random())
            setIdUsuario("")
            message.success("El usuario se eliminó de manera correcta")
        } catch (error) {
            message.error(error.message)
        }
    }
    const { Option } = Select
    return (
        <>
            <div className="p-3 border rounded" style={{ minHeight: "89vh" }}>
                <p>Nuevo Usuario</p>

                <label className='pt-1' >Nombre</label>
                <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />

                <label className='pt-2' >Apellido Paterno</label>
                <Input value={paterno} onChange={(e) => setPaterno(e.target.value)} />

                <label className='pt-2' >Apelido Materno</label>
                <Input value={materno} onChange={(e) => setMaterno(e.target.value)} />

                <label className='pt-2' >Telefono</label>
                <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} />

                <label className='pt-2'>Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />

                <label className='pt-2'>Contrasena</label>
                <Input.Password value={contrasenhia} onChange={(e) => setContrasenhia(e.target.value)} />

                <div className="form-row pt-4">
                    <div className="col-2">
                        <Input readOnly value={selectTipo} /></div>
                    <div className="col">
                        <Select style={{ width: "100%" }} value={selectTipo} onChange={(e) => setSelectTipo(e)} >
                            <Option value="" >Selecciona...</Option>
                            <Option value="1">Administrador</Option>
                            <Option value="2">Cajero</Option>
                            <Option value="3">Repartidor</Option>
                        </Select>
                    </div>
                </div>



                <div className="form-row pt-4">
                    <div className="col">
                        <Button type='primary' onClick={crearUsuario} loading={loadingCreate} icon={<SaveOutlined style={{ fontSize: 16 }} />} > <span>Guardar</span> </Button>
                    </div>
                    <div className="col" >
                        <Button type='primary' onClick={eliminarUsuario} danger className='float-right' loading={loadingDelete} icon={<MinusOutlined />} >Eliminar</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DatosUsuarios