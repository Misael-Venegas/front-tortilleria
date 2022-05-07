import { useContext, useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import GastoOperacionContext from "./ContextGastoOperacion";

const searchForm = {
  producto: "-1",
  fecha: "",
  usuario: "-1",
  total: "",
};

const OBTENERPRODUCTOSALMACEN = gql`
  query getAlmacen {
    getAlmacen {
      id_Producto_Almacen
      nombre
      categoria
      unidad_Medida
      status
      stock
    }
  }
`;

const BusquedaGasto = () => {
  const { filtrarDatos, listUsuariosOption } = useContext(
    GastoOperacionContext
  );
  const [form, setForm] = useState(searchForm);
  const [listOption, setListOption] = useState(null);
  const [getAlmacen, { data, loading, error }] = useLazyQuery(
    OBTENERPRODUCTOSALMACEN
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filtrarDatos(form);
  };

  useEffect(() => {
    const cargaDatos = async () => {
      try {
        await getAlmacen();
        if (data) {
          setListOption(data.getAlmacen);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    cargaDatos();
  }, [getAlmacen, data]);

  return (
    <div className="ml-2">
      <h5>Busqueda</h5>
      <form className="form-row" onSubmit={handleSubmit}>
        <div className="form-group col-md-3">
          <select
            className="form-control col-12"
            name="producto"
            onChange={handleChange}
            value={form.producto}
          >
            <option value="-1">Productos...</option>
            {listOption &&
              listOption.map((v) => (
                <option
                  key={v.id_Producto_Almacen}
                  value={v.id_Producto_Almacen}
                >
                  {v.nombre} {v.unidad_Medida}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group col-md-3">
          <input
            id="fecha"
            className="form-control col-12"
            type="date"
            placeholder="fecha"
            name="fecha"
            onChange={handleChange}
            value={form.fecha}
          />
        </div>
        <div className="form-group col-md-2">
          <select
            className="form-control col-12"
            name="usuario"
            onChange={handleChange}
            value={form.usuario}
          >
            <option value="-1">Usuarios...</option>
            {listUsuariosOption &&
              listUsuariosOption.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.email}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group col-md-1">
          <input
            className="form-control col-12"
            type="text"
            placeholder="Total Compra"
            id="total"
            name="total"
            onChange={handleChange}
            value={form.total}
          />
        </div>
        <div className="form-group col-md-1">
          <input
            type="submit"
            value={"Buscar"}
            className="btn btn-secondary ms-3"
          />
        </div>
      </form>
    </div>
  );
};

export default BusquedaGasto;
