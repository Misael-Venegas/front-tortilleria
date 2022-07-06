import React from 'react'
import { Modal, Input } from 'antd'
const ModalAgregarCargo = ({ setVerModal, verModal }) => {
    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title="Nuevo cargo"
            onCancel={() => setVerModal(false)}
            cancelText="Cancelar"
            okText="Guardar"
            keyboard={false}
            maskClosable={false}
        >
            <span>Nombre</span>
            <Input />
        </Modal>
    )
}

export default ModalAgregarCargo