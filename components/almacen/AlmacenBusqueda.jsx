import { useContext, useState } from "react";
import AlmacenContext from "./ContextAlmacen";

const searchForm = {
  nombreBusqueda: "",
  categoriaBusqueda: "",
};
const AlmacenBusqueda = () => {
  const {filtrarDatos} = useContext(AlmacenContext);
  const [form, setForm] = useState(searchForm);

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

  return (
    <div className="ml-2">
      <h5>Busqueda</h5>
      <form className="form-inline" onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <input
            className="form-control col-12"
            type="text"
            placeholder="Nombre Producto"
            id="nombreBusqueda"
            name="nombreBusqueda"
            onChange={handleChange}
            value={form.nombreBusqueda}
          />
        </div>
        <div className="form-group mb-2 ml-2">
          <select
            className="form-control col-12"
            name="categoriaBusqueda"
            onChange={handleChange}
            value={form.categoriaBusqueda}
          >
            <option value="">Sin Categoria</option>
            <option value="Insumo">Insumo</option>
            <option value="Utilitarios">Utilitarios</option>
            <option value="Refaccion">Refaccion</option>
          </select>
        </div>
        <div className="form-group mb-2 ml-3">
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

export default AlmacenBusqueda;
