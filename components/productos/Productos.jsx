import React, { useState } from "react";
import Container from "../principal/Container";
import FormProductos from "./FormProductos";
import { TblProductos } from "./TblProductos";

const Almacen = () => {

  const [actualizar, setActualizar] = useState(3.1416)

  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState(0)
  const [uMedida, setUMedida] = useState("")
  const [tipo, setTipo] = useState("")
  const [idProducto, setidProducto] = useState("")

  const editarProductos = (producto) => {
    setNombre(producto.nombre)
    setPrecio(producto.precioVenta)
    setUMedida(producto.unidad)
    setTipo(producto.id_producto_almacen)
    setidProducto(producto.id_producto)
  }

  return (
    <Container>

      <div className="row">
        <div className="col-md-4 col-sm-12">
          <FormProductos setActualizar={setActualizar}
            nombre={nombre} setNombre={setNombre}
            precio={precio} setPrecio={setPrecio}
            setUMedida={setUMedida} uMedida={uMedida}
            setTipo={setTipo} tipo={tipo}
            setidProducto={setidProducto} idProducto={idProducto}
          />
        </div>

        <div className="col-md-8 col-sm-12">
          <TblProductos actualizar={actualizar}
            setActualizar={setActualizar}
            editarProductos={editarProductos}
          />
        </div>
      </div>
    </Container>
  );
};

export default Almacen;
