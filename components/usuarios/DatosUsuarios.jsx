import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { UncontrolledAlert } from 'reactstrap'

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


    const [seGuardo, setSeGuardo] = useState(false)
    const [nuevoUsuario, { loading, error }] = useMutation(CREAR_USUARIOS)
    const [mesaje, setMensaje] = useState("");
    const [verError, setVerError] = useState(false)
    const [mensajeError, setMensajeError] = useState("")
    const [eliminarUsr, { data }] = useMutation(ELIMINAR_USUARIO)
    const [editarUsr] = useMutation(UPDATE_USER);


    const crearUsuario = async () => {
        //  console.log(nombre, paterno, materno, telefono, email, contrasenhia, selectTipo)
        if (idUsuario !== "") {
            editarUsuario()
            return
        }
        if (nombre === "" || paterno === "" || materno === "" || telefono === "" || email === "" || contrasenhia === "" || selectTipo === "") {
            setMensajeError("Error: Campos vacíos")
            setVerError(true)

            setTimeout(() => {
                setVerError(false)
            }, 2000);
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
            setSeGuardo(true)
            setMensaje("El usuario se guardo de manera correcta")
            limpiarCampos()
            setTimeout(() => {
                setSeGuardo(false)
            }, 2000);
        } catch (error) {
            setMensajeError(error.message)
            setVerError(true)

            setTimeout(() => {
                setVerError(false)
            }, 2000);
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
            setMensaje("los datos se actualizaron de manera correcta")
            setSeGuardo(true)
            limpiarCampos()
            setTimeout(() => {
                setSeGuardo(false)
            }, 2000);
        } catch (error) {
            setMensajeError(error.message)
            setVerError(true)

            setTimeout(() => {
                setVerError(false)
            }, 2000);
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
            setMensajeError("Error: Selecciona un elemento de la tabla para poder completar esta acción")
            setVerError(true)

            setTimeout(() => {
                setVerError(false)
            }, 2000);
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
            setMensaje("El usuario se eliminó de manera correcta")
            setSeGuardo(true)
            limpiarCampos()
            setTimeout(() => {
                setSeGuardo(false)
            }, 2000);

        } catch (error) {
            setMensajeError(error.message)
            setVerError(true)
            setTimeout(() => {
                setVerError(false)
            }, 2000);
        }
    }

    return (
        <>
            {
                seGuardo && <UncontrolledAlert color="success">
                    {mesaje}
                </UncontrolledAlert>
            }
            {
                verError && <UncontrolledAlert color="danger">
                    {mensajeError}
                </UncontrolledAlert>
            }
            <div className="p-3 border bg-light">
                <p>Nuevo Usuario</p>

                <label className='pt-1' >Nombre</label>
                <input type="text" value={nombre} className="form-control" onChange={(e) => setNombre(e.target.value)} />

                <label className='pt-1' >Apellido Paterno</label>
                <input type="text" value={paterno} className="form-control" onChange={(e) => setPaterno(e.target.value)} />

                <label >Apelido Materno</label>
                <input type="text" value={materno} className="form-control" onChange={(e) => setMaterno(e.target.value)} />

                <label>Telefono</label>
                <input type="number" value={telefono} className="form-control" onChange={(e) => setTelefono(e.target.value)} />

                <label >Email</label>
                <input type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} />

                <label >Contrasena</label>
                <input type="password" value={contrasenhia} className="form-control" onChange={(e) => setContrasenhia(e.target.value)} />

                <div className="form-row pt-2">
                    <div className="col-2">
                        <input type="text" className="form-control" readOnly value={selectTipo} /></div>
                    <div className="col">
                        <select className="form-control" value={selectTipo} onChange={(e) => setSelectTipo(e.target.value)} >
                            <option value="" >Selecciona...</option>
                            <option value="1">Administrador</option>
                            <option value="2">Cajero</option>
                            <option value="3">Repartidor</option>
                        </select>
                    </div>
                </div>

                <label>Tipo</label>

                <div className="form-row">
                    <div className="col">
                        <button className="btn btn-primary" onClick={crearUsuario} >Guardar</button>
                    </div>
                    <div className="col" >
                        <button className="btn btn-danger" onClick={eliminarUsuario}>Eliminar</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DatosUsuarios