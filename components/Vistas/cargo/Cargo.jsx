import React, { useState } from 'react'
import { Table, Button, Input } from 'antd'
import ModalAgregarCargo from './ModalAgregarCargo';

const Cargo = () => {

    const [verModalNuevoCargo, setverModalNuevoCargo] = useState(false)

    const { Search } = Input;
    const buscar = (e) => {
        console.log(e)
    }

    const columns = [{
        title: "#",
        dataIndex: "key",
        name: "key",
    }, {
        title: "Nombre cargo",
        dataIndex: "nombre_cargo",
        name: "nombre_cargo"
    }, {
        title: "Opciones",
        dataIndex: "opciones",
        name: "opciones"
    }
    ]

    return (
        <>
            <div className='row' >
                <div className='col-md-6 col-sm-12' >
                    <Search style={{ width: "60%" }} placeholder="Ingresa el cargo" enterButton onSearch={buscar} />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setverModalNuevoCargo(true)} >Agregar cargo</Button>
                </div>
            </div>
            <Table className='pt-5' columns={columns} />
            <ModalAgregarCargo setVerModal={setverModalNuevoCargo} verModal={verModalNuevoCargo} />
        </>
    )
}

export default Cargo