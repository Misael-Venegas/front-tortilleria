import React, { useState } from 'react'
const TextoCorteDeCaja = ({ arrayCorte, fecha }) => {
    let totalVenta = 0;
    return (
        <div className='pt-5 text-center' >
            <p>*************************************************************************************</p>
            <p>Corte de caja con fecha de {fecha} </p>
            <p>Lista generada</p>
            <ul>
                {

                    arrayCorte.map((venta, key) => {
                        totalVenta += parseFloat(venta.total)
                        return (
                            <li key={key} >{venta.nombre_sucursal} &nbsp; {venta.nombre_producto} {venta.cantidad}kg &nbsp;  ${venta.total} &nbsp; {venta.empleado} </li>
                        )

                    })
                }
            </ul>
            <p>Total de ingresos generados ${totalVenta} </p>
            <p>*************************************************************************************</p>
        </div>
    )
}

export default TextoCorteDeCaja