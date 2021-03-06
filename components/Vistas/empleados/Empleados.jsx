import React, { useState } from 'react'
import TablaEpleados from './TablaEpleados';
import ModalAgregarEmpleado from './ModalAgregarEmpleado';
const Empleados = () => {
    const [modalNuevoEmpleado, setOpenModalNuevoEmpleado] = useState(false)

    const [actualizarTabla, setActualizarTabla] = useState(3.1416)
    return (
        <>

            <TablaEpleados actualizarTabla={actualizarTabla} setActualizarTabla={setActualizarTabla} setOpenModalNuevoEmpleado={setOpenModalNuevoEmpleado} />
            <ModalAgregarEmpleado modalNuevoEmpleado={modalNuevoEmpleado} setOpenModalNuevoEmpleado={setOpenModalNuevoEmpleado} setActualizarTabla={setActualizarTabla} />
        </>
    )
}

export default Empleados