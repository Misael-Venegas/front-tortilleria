import React, { useState } from 'react'
import { Modal, ModalBody, Button, ModalFooter, ModalHeader } from 'reactstrap'
import { useLazyQuery, gql } from '@apollo/client'


const CAMBIAR_CONTRASENHIA = gql`
    query ($correo: String!, $key: Float!) {
        recuperarContranhia(correo: $correo, key: $key)
    }
  `;


const ModalEnvarContrasenhia = ({ openModal, setOpenModal }) => {

    const [correo, setCorreo] = useState("")
    const [cambiarPswd, { data, error, loading }] = useLazyQuery(CAMBIAR_CONTRASENHIA)

    const enviarContraseña = async () => {
        console.log(correo)
        if (correo == "") {
            console.log("El correo esta vacio")
            return
        }

        await cambiarPswd({
            variables: {
                correo,
                key: Math.random()
            }
        })

    }

    return (
        <Modal
            isOpen={openModal}
        >
            <ModalHeader>
                <h5>Reenviar contraseña</h5>
            </ModalHeader>
            <ModalBody  >
                <span>Correo electrónico</span>
                <input className='form-control' onChange={(e) => setCorreo(e.target.value)} ></input>
            </ModalBody>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {" "}
                    {error.message}{" "}
                </div>
            )}
            {
                data && data.recuperarContranhia && (
                    <div className="alert alert-success" role="alert">
                        Se envió un correo con una contraseña nueva para ingresar al sistema
                    </div>
                )

            }
            <ModalFooter>
                <Button onClick={() => setOpenModal(false)} >Cerrar</Button>
                <Button onClick={enviarContraseña} disabled={loading} >
                    {loading && (
                        <span
                            className="spinner-grow spinner-grow-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    )}
                    Enviar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalEnvarContrasenhia