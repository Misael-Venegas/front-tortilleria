import React, { useEffect } from 'react'
import { useLazyQuery, gql } from "@apollo/client";

const OBTNER_USUARIOS = gql`
query getUsuarios {
  getUsuarios {
    id
    nombre
    apellidoP
    apellidoM
    telefono
    email
    password
    tipo
  }
}
`
const TablaUsuarios = ({ actualizar, llenarDatosUsuario }) => {

    const [obtenerUsuarios, { data, loading, error }] = useLazyQuery(OBTNER_USUARIOS)

    useEffect(() => {

        try {
            obtenerUsuarios()
        } catch (error) {
            console.log(error.message);
        }


    }, [actualizar])

    return (
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido paterno</th>
                    <th>Apellido materno</th>
                    <th>Telefono</th>
                    <th>email</th>

                </tr>
            </thead>
            <tbody>
                {
                    data && data.getUsuarios &&
                    data.getUsuarios.map((usuario, index) => {
                        return (

                            <tr key={index} onClick={() => llenarDatosUsuario(usuario)} className="seleccionarComponente" >
                                <td>{index+1}</td>

                                <td>{usuario.nombre}</td>

                                <td>{usuario.apellidoP}</td>

                                <td>{usuario.apellidoM}</td>

                                <td>{usuario.telefono}</td>

                                <td>{usuario.email}</td>
                            </tr>
                        )
                    }
                    )
                }

            </tbody>
        </table>
    )
}

export default TablaUsuarios