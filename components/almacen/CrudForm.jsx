import React, { useState, useEffect, useContext } from "react";
import AlmacenContext from "./ContextAlmacen";

const initialForm = {
  nombreProducto: "",
  categoria: "Insumo",
  medida: "",
  status: 1,
  stock: "",
  id: null,
};

const CrudForm = () => {
  const { dataEdit, createData, updateData, setDataEdit } =
    useContext(AlmacenContext);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataEdit) {
      //console.log("Datos Edit");
      setForm(dataEdit);
    } else {
      // console.log("Datos");
      setForm(initialForm);
    }
  }, [dataEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* if (!form.name || !form.constellation) {
      alert("No debe haber campos vacios");
      return;
    }*/
    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }
    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataEdit(null);
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-12 ">
          <h4>
            {dataEdit ? "Editar Datos del Producto" : "Datos del Producto"}
          </h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="nombreProducto">Nombre Producto</label>
            <input
              className="form-control col-12"
              type="text"
              placeholder="Nombre Producto"
              id="nombreProducto"
              name="nombreProducto"
              onChange={handleChange}
              value={form.nombreProducto}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoria">Categoria Producto</label>
            <select
              className="form-control col-12"
              name="categoria"
              onChange={handleChange}
              value={form.categoria}
            >
              <option value="Insumo">Insumo</option>
              <option value="Utilitarios">Utilitarios</option>
              <option value="Refaccion">Refaccion</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="medida">Unidad Medida</label>
            <input
              id="medida"
              className="form-control col-12"
              type="text"
              placeholder="Unidad Medida"
              name="medida"
              onChange={handleChange}
              value={form.medida}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              className="form-control col-12"
              type="text"
              placeholder="Stock"
              name="stock"
              onChange={handleChange}
              value={form.stock}
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
            value={dataEdit ? "cancelar" : "Limpiar"}
            onClick={handleReset}
            className="btn btn-secondary ms-3 mt-2"
          />
        </form>
      </div>
    </div>
  );
};

export default CrudForm;
