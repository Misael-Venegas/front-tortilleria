import { useState } from "react";

const initialForm = {
  producto: "-1",
  cantidad: 0,
  descripcion: "",
  fecha: new Date().toLocaleDateString(),
  id: null,
};

const MermasAgregar = () => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id === null) {
      console.log(form);
      // createData(form);
    }
    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
  };

  return (
    <div className="p-3 border bg-light">
      <h4>Mermas</h4>
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
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            className="form-control col-12"
            type="text"
            placeholder="cantidad"
            name="cantidad"
            onChange={handleChange}
            value={form.cantidad}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            className="form-control"
            type="textarea"
            placeholder="Descripción"
            name="descripcion"
            onChange={handleChange}
            value={form.descripcion}
            required
          />
        </div>
        <input
          type="submit"
          value="Enviar"
          className="btn btn-dark mt-2 mr-2"
        />
        <input
          type="reset"
          value="Limpiar"
          onClick={handleReset}
          className="btn btn-secondary ms-3 mt-2"
        />
      </form>
      {/*seGuardo && (
    <UncontrolledAlert color="success" className="mt-3">{mesaje}</UncontrolledAlert>
  )*/}
    </div>
  );
};

export default MermasAgregar;
