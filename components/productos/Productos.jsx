import React from "react";
import Container from "../principal/Container";
import FormProductos from "./FormProductos";
import { TblProductos } from "./TblProductos";

const Almacen = () => {
  return (
    <Container>

      <div className="row">
        <div className="col-md-4 col-sm-12">
          <FormProductos />
        </div>

        <div className="col-md-8 col-sm-12">
          <TblProductos />
        </div>
      </div>
    </Container>
  );
};

export default Almacen;
