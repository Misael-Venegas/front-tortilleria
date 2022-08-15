import React, { useState } from 'react'
const TextoCorteDeCaja = ({ arrayCorte, fecha }) => {
    let totalVenta = 0;
    return (
        <div className='pt-5 text-center' >
            <p>*************************************************************************************</p>
            <p>Corte de caja con fecha de {fecha} </p>
            <p>Lista generada</p>
            <div className="centrarComponentes" >

                <table>
                    <thead>
                        <tr>
                            <th className='text-left' >Sucursal</th>
                            <th className='text-left' >Producto&nbsp;</th>
                            <th className='text-left'>Cantidad&nbsp;</th>
                            <th className='text-left'>Total&nbsp;</th>
                            <th className='text-left'>Vendedor</th>
                            <th className='text-left' > Hora </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arrayCorte.map((venta, key) => {
                                totalVenta += parseFloat(venta.total)
                                return (
                                    <tr key={key}>
                                        <td>{venta.nombre_sucursal} &nbsp;&nbsp;</td>
                                        <td>{venta.nombre_producto} &nbsp;&nbsp; </td>
                                        <td>{venta.cantidad}kg &nbsp;&nbsp; </td>
                                        <td>${venta.total} &nbsp;&nbsp;</td>
                                        <td>{venta.empleado}&nbsp;&nbsp;</td>
                                        <td>{venta.hora_venta} &nbsp; &nbsp; </td>
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>
            </div>

            <p className='pt-3' > <b>Total de ingresos generados ${totalVenta} </b> </p>
            <p>*************************************************************************************</p>
        </div>
    )
}

export default TextoCorteDeCaja