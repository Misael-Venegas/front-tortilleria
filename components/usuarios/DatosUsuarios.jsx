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

    console.log(idUsuario)
    const [nuevoUsuario, { loading, error }] = useMutation(CREAR_USUARIOS)
    const [eliminarUsr, { data }] = useMutation(ELIMINAR_USUARIO)
    
    const crearUsuario = async () => {
      //  console.log(nombre, paterno, materno, telefono, email, contrasenhia, selectTipo)
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
            setTimeout(() => {
                setSeGuardo(false)
            }, 1000);
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarUsuario = async () => {

        if (idUsuario === "") {
            console.log("id vacio")
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
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                seGuardo && <UncontrolledAlert color="success">
                    El usuario se registró de manera correcta
                </UncontrolledAlert>
            }
            {
                error && <UncontrolledAlert color="danger">
                    {error.message}
                </UncontrolledAlert>
            }
            <div className="p-3 border bg-light">
                <p>Nuevo Usuario</p>

                <input type="text" value={nombre} className="form-control" onChange={(e) => setNombre(e.target.value)} />
                <label >Nombre</label>

                <input type="text" value={paterno} className="form-control" onChange={(e) => setPaterno(e.target.value)} />
                <label>Apellido Paterno</label>

                <input type="text" value={materno} className="form-control" onChange={(e) => setMaterno(e.target.value)} />
                <label >Apelido Materno</label>

                <input type="number" value={telefono} className="form-control" onChange={(e) => setTelefono(e.target.value)} />
                <label>Telefono</label>

                <input type="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} />
                <label >Email</label>

                <input type="password" value={contrasenhia} className="form-control" onChange={(e) => setContrasenhia(e.target.value)} />
                <label >Contrasena</label>


                <div className="form-row">
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