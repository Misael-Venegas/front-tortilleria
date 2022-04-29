import React, { useState } from 'react'
const PanelVenta = ({ setArrayVentas, arrayVentas, setVentas, ventas }) => {
    const [producto, setProducto] = useState("1")
    const [cantidad, setCantidad] = useState(1)
    const [id, setIdProducto] = useState(0);

    const agregarVentas = () => {
        try {
            if (cantidad === "") {
                console.log("Ingrese un dato numerico")

            }
            parseInt(cantidad)
        } catch (error) {
            console.log("Ingrese un dato numerico")
            return
        }
        setIdProducto(id + 1);
        const crearProducto = {
            id: id,
            producto: producto === "1" ? "Tortilla" : "Masa",
            precio: 20,
            cantidad,
            total: (cantidad * 20)
        }
        setVentas(ventas + crearProducto.total)
        setArrayVentas([...arrayVentas, crearProducto])
        console.log(arrayVentas)
    }

    return (
        <>
            <div className='border shadow' style={{ width: 700, height: 100 }} >
                <div className='row m-1' >
                    <div className='col-md-6 col-sm-12'>
                        <div className='d-flex justify-content-between pt-4'>
                            <span className='pt-1' >Producto</span>
                            <select className='form-select' style={{ width: "50%" }} value={producto} onChange={(e) => setProducto(e.target.value)} >
                                <option value="1" >Tortilla</option>
                                <option value="2" >Masa</option>
                            </select>
                            <div className="form-check pt-1">
                                <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                                <label className="form-check-label" >
                                    A granel
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className='col-md-6 col-sm-12'>
                        <div className='d-flex justify-content-between pt-4' >
                            <span className='pt-1' > Cantidad:</span>
                            <input type="number" className='form-control' style={{ width: "100px" }}
                                value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                            <button className='btn btn-warning' onClick={agregarVentas} >Agregar</button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default PanelVenta