import React, { useState } from 'react'
import { Input, Button } from 'antd'
import TablaEpleados from './TablaEpleados';
import ModalAgregarEmpleado from './ModalAgregarEmpleado';
const Empleados = () => {
    const { Search } = Input;
    const [modalNuevoEmpleado, setOpenModalNuevoEmpleado] = useState(false)
    const buscarEmpleado = (e) => {
        console.log(e)
    }
    const [actualizarTabla, setActualizarTabla] = useState(3.1416)
    return (
        <>
            <div className='row' >
                <div className='col-md-4 col-sm-12' >
                    <Search onSearch={buscarEmpleado} enterButton allowClear placeholder='Ingresa el nombre del empleado' />
                </div>
                <div className='col-md-8 col-sm-12' >
                    <Button className='float-right' type='primary' onClick={() => setOpenModalNuevoEmpleado(true)} >Agregar empleado</Button>
                </div>
            </div>
            <TablaEpleados actualizarTabla={actualizarTabla} />
            <ModalAgregarEmpleado modalNuevoEmpleado={modalNuevoEmpleado} setOpenModalNuevoEmpleado={setOpenModalNuevoEmpleado} setActualizarTabla={setActualizarTabla} />
        </>
    )
}

export default Empleados