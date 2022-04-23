import React from 'react'
import { Modal, ModalBody, Button, ModalFooter, ModalHeader } from 'reactstrap'

const ModalEnvarContrasenhia = ({ openModal, setOpenModal }) => {
    return (
        <Modal
            isOpen={openModal}
        >
            <ModalHeader>
                <h5>Reenviar contraseña</h5>
            </ModalHeader>
            <ModalBody>
                <h1>Modal</h1>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => setOpenModal(false)} >
                    Aceptar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalEnvarContrasenhia