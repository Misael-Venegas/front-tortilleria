import { useContext, useState } from "react";
import { UncontrolledAlert } from "reactstrap";
import GastoOperacionContext from "./ContextGastoOperacion";

const initialForm = {
  producto: -1,
  cantidad: 0,
  precio: 0,
  fecha: "",
  usuario: "",
  id_Usuario: null,
};

const AgregarGastoForm = () => {
  const [form, setForm] = useState(initialForm);
  const { listOption, createData, seGuardo, mesaje } = useContext(
    GastoOperacionContext
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (form.producto >= 0 && form.id_Usuario) {
      createData(form);
      handleReset();
    } else {
      alert("No ha llenado todos los campos correctamente");
    }
    e.preventDefault();
  };

  const handleReset = (e) => {
    setForm(initialForm);
  };

  let optionTemplate = listOption.map((v) => (
    <option key={v.id_Producto_Almacen} value={v.id_Producto_Almacen}>
      {v.nombre}
      {": medida("}
      {v.unidad_Medida}
      {")"}
    </option>
  ));

  return (
    <div className="p-3 border bg-light">
      <h5>Datos del Gasto de Operacion</h5>
      {seGuardo && (
        <UncontrolledAlert color="success" className="mt-3">
          {mesaje}
        </UncontrolledAlert>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="">Producto</label>
          <select
            className="form-control col-12"
            name="producto"
            onChange={handleChange}
            value={form.producto}
          >
            <option value="-1">Seleccione...</option>
            {optionTemplate}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            className="form-control col-12"
            type="number"
            placeholder="Cantidad"
            id="cantidad"
            name="cantidad"
            onChange={handleChange}
            value={form.cantidad}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precio">Precio Compra</label>
          <input
            id="precio"
            className="form-control col-12"
            type="number"
            placeholder="Precio Compra"
            name="precio"
            onChange={handleChange}
            value={form.precio}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fecha">Fecha</label>
          <input
            id="fecha"
            className="form-control col-12"
            type="date"
            placeholder="fecha"
            name="fecha"
            onChange={handleChange}
            value={form.fecha}
            required
          />
        </div>
        <div className="form-row pt-2">
          <div className="col">
            <label htmlFor="">Usuario</label>
            <input
              className="form-control"
              type="text"
              placeholder="Usuario"
              name="usuario"
              onChange={handleChange}
              value={form.usuario}
            />
          </div>
          <div className="col-2">
            
          <label htmlFor="">Id</label>
            <input
              type="text"
              className="form-control"
              name="id_Usuario"
              onChange={handleChange}
              value={form.id_Usuario}
            />
          </div>
        </div>
        <div className="mb-3"></div>
        <input
          type="submit"
          value="Registrar"
          className="btn btn-dark mt-2 mr-2"
        />
        <input
          type="reset"
          value="Limpiar"
          onClick={handleReset}
          className="btn btn-secondary ms-3 mt-2"
        />
      </form>
    </div>
  );
};

export default AgregarGastoForm;
