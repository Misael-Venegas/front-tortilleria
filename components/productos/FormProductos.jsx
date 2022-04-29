import React from 'react'

const FormProductos = () => {
    return (
        <div className="p-3 mt-3 border bg-light shadow rounded ">
            <p>Datos del producto</p>

            <label className='pt-1' >Nombre del producto</label>
            <input type="text" className="form-control" />

            <label className='pt-1' >Precio de venta</label>
            <input type="number" className="form-control" />

            <label className='pt-1'>Unidad de medida</label>
            <input type="text" className="form-control" />

            <label className='pt-1'>Tipo</label>
            <div className="form-row pt-2">
                <div className="col">
                    <select className="form-control"  >
                        <option value="" >Selecciona...</option>
                        <option value="1">Maiz</option>
                        <option value="2">Plasticos</option>
                        <option value="3">Refacciones</option>
                    </select>
                </div>
            </div>



            <div className="form-row pt-4">
                <div className="col">
                    <button className="btn btn-primary float-left "  >Guardar</button>
                </div>
                <div className="col" >
                    <button className="btn btn-danger float-right" >Eliminar</button>
                </div>
            </div>

        </div>
    )
}

export default FormProductos