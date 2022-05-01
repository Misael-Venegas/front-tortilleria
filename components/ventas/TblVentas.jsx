import React, { useState } from 'react'

const TblVentas = ({ arrayVentas, ventas, setArrayVentas, arrayGVentas, setArrayGVentas, setVentas }) => {
    const eliminarProducto = (dato) => {
        console.log(dato)
        const index = arrayVentas.findIndex(producto => parseInt(producto.id) === parseInt(dato.id))
        arrayVentas.splice(index, 1);
        arrayGVentas.splice(index, 1);
        const auxiliar = arrayVentas;
        const auxiliarGVentas = arrayGVentas;
        setArrayVentas([])
        setArrayVentas([...auxiliar])
        setArrayGVentas([])
        setArrayGVentas([...auxiliarGVentas])
        setVentas(ventas - dato.total)
    }
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
                                            {venta.cantidad} kl
                                        </td>
                                        <td>
                                            {venta.total}
                                        </td>
                                        <td>
                                            <img src="./img/menos-30.png" alt="delete" className='seleccionarComponente' onClick={() => eliminarProducto(venta)} />
                                        </td>

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
            </div>
        </>
    )

}

export default TblVentas