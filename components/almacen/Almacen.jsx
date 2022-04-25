import React from "react";
import Container from "../principal/Container";
import AgreagarProductoAlmacen from "./AgregarProductoAlmacen";
import { AlmacenProvider } from "./ContextAlmacen";

const Almacen = () => {
  return (
    <Container>
      <AlmacenProvider>
        <AgreagarProductoAlmacen />
      </AlmacenProvider>
    </Container>
  );
};

export default Almacen;
