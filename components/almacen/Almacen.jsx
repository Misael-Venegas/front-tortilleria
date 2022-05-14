import React from "react";
import AgreagarProductoAlmacen from "./AgregarProductoAlmacen";
import { AlmacenProvider } from "./ContextAlmacen";

const Almacen = () => {
  return (
    <AlmacenProvider>
      <AgreagarProductoAlmacen />
    </AlmacenProvider>
  );
};

export default Almacen;
