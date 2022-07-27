import React, { useState } from 'react'
import { Button, DatePicker } from 'antd'
import TableSalidas from './TableSalidas'

const Salidas = () => {
    const [fecha, setFecha] = useState("")

    return (
        <>
            <div className='row' >
                <div className='col-md-3 col-sm-12 ' >
                    <DatePicker style={{ width: "100%" }} onChange={(e, date) => setFecha(date)} />
                </div>
            </div>
            <div className='row'>
                <TableSalidas fecha={fecha}/>
            </div>
        </>
    )
}

export default Salidas