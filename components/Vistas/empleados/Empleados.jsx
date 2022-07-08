import React, { useState } from 'react'
import { Input, Button, Table } from 'antd'
import TablaEpleados from './TablaEpleados';
import ModalAgregarEmpleado from './ModalAgregarEmpleado';
const Empleados = () => {
    const { Search } = Input;
    const [modalNuevoEmpleado, setOpenModalNuevoEmpleado] = useState(false)
    const buscarEmpleado = (e) => {
        console.log(e)
    }
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
            <TablaEpleados />
            <ModalAgregarEmpleado modalNuevoEmpleado={modalNuevoEmpleado} setOpenModalNuevoEmpleado={setOpenModalNuevoEmpleado} />
        </>
    )
}

export default Empleados