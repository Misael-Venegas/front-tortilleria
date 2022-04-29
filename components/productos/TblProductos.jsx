import React from 'react'

export const TblProductos = () => {
    return (
        <div className='p-3 mt-3 shadow ' >
            <label> Producto </label>
            <div  style={{ width: 350 }} >
                <div className='row'>
                    <div className='col-md-8 col-sm-12' >
                        <input type="text" className='form-control' />
                    </div>
                    <div className='col-md-4 col-sm-12' >
                        <button className='btn btn-primary float-right' >Buscar</button>
                    </div>
                </div>
            </div>
            <table className="table table-striped mt-5">
                <thead className="thead-dark">
                    <tr>
                        <th>id Producto</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Unidad de medida</th>
                        <th>Producto almacen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    )
}
