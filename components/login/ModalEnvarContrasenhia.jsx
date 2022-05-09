import React, { useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { Modal, message, Input } from 'antd';

const CAMBIAR_CONTRASENHIA = gql`
    query ($correo: String!, $key: Float!) {
        recuperarContranhia(correo: $correo, key: $key)
    }
  `;


const ModalEnvarContrasenhia = ({ openModal, setOpenModal }) => {

    const [correo, setCorreo] = useState("")
    const [cambiarPswd, { loading, error }] = useLazyQuery(CAMBIAR_CONTRASENHIA, {
        onCompleted: (dat) => {
            console.log(dat)
            if (dat.recuperarContranhia === null) {
                message.error("El correo electrónico no existe")
            } else {
                message.success("Se envió un correo con una contraseña nueva para ingresar al sistema");
            }
        }
    })

    const enviarContraseña = async () => {
        console.log(correo)
        if (correo == "") {
            message.error("El correo esta vacio")
            return
        }

        try {
            await cambiarPswd({
                variables: {
                    correo,
                    key: Math.random()
                }
            })

        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <Modal
            onCancel={() => setOpenModal(false)}
            onOk={enviarContraseña}
            visible={openModal}
            title="Reenviar contraseña"
            destroyOnClose
            cancelText="Cancelar"
            okText="Aceptar"
        >
            <span>Correo electrónico</span>
            <Input onChange={(e) => setCorreo(e.target.value)} />
        </Modal>
    )
}

export default ModalEnvarContrasenhia