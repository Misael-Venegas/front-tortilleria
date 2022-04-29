import React, { useState } from 'react'

const TblVentas = ({ arrayVentas, ventas }) => {
    return (
        <>
            <div className='p-4' >
                <table className='table table-secondary shadow'>
                    <thead>
                        <tr>
                            <th>
                                ID Producto
                            </th>
                            <th>
                                Producto
                            </th>
                            <th>
                                Precio venta
                            </th>
                            <th>Cantidad</th>
                            <th>
                                Total
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arrayVentas.map((venta, key) => {
                            
                                return (
                                    <tr key={key} className="table-light" >
                                        <td>
                                            {venta.id}
                                        </td>
                                        <td>
                                            {venta.producto}
                                        </td>
                                        <td>
                                            {venta.precio}
                                        </td>
                                        <td>
                                            {venta.cantidad}
                                        </td>
                                        <td>
                                            {venta.total}
                                        </td>
                                        <td></td>

                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>

                <div className='row'>
                    <div className='col'>
                        <div className='float-right pt-3 d-flex justify-content-betwen '>
                            <h4 className='pr-3'>Total a pagar  </h4>
                            <input type="20" className='form-control' style={{ width: 100 }} disabled={true} value={ventas} />
                        </div>
                    </div>

                </div>

                <div className='row' >
                    <div className='col'>
                        <div className='float-right pt-4' >
                            <button className='btn btn-danger mr-3' >Cancelar</button>
                            <button className='btn btn-success' >Cobrar</button>
                        </div>
                    </div>

                </div>


            </div>
        </>
    )

}

export default TblVentas