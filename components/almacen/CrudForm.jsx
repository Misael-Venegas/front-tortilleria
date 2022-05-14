import React, { useState, useEffect, useContext } from "react";
import AlmacenContext from "./ContextAlmacen";
import { UncontrolledAlert } from "reactstrap";
import { message, Input, InputNumber, Select, Button, Form } from "antd";

const initialForm = {
  nombreProducto: "",
  categoria: "Insumo",
  medida: "",
  status: 1,
  stock: "",
  id: null,
};

const CrudForm = () => {
  const { dataEdit, createData, updateData, setDataEdit, seGuardo, mesaje } =
    useContext(AlmacenContext);
  const [form, setForm] = useState(initialForm);
  const [formAuxiliar] = Form.useForm();

  useEffect(() => {
    if (dataEdit) {
      setForm(dataEdit);
      formAuxiliar.setFieldsValue({
        nombreProducto: dataEdit["nombre"],
      });
      formAuxiliar.setFieldsValue({
        categoria: dataEdit["categoria"],
      });
      formAuxiliar.setFieldsValue({
        medida: dataEdit["unidad_Medida"],
      });
      formAuxiliar.setFieldsValue({
        stock: dataEdit["stock"],
      });
    } else {
      setForm(initialForm);
    }
  }, [dataEdit]);

  const handleChange = (e) => {
    setForm({ ...form, ["nombreProducto"]: e.target.value });
  };
  const handleChangeMedida = (e) => {
    setForm({ ...form, ["medida"]: e.target.value });
  };
  const handleSelect = (e) => {
    setForm({ ...form, ["categoria"]: e });
  };
  const handleNumber = (e) => {
    setForm({ ...form, ["stock"]: e });
  };

  const handleSubmit = (e) => {
    if (form.id === null) {
      if (form.stock >= 1) {
        createData(form);
      } else {
        message.error("Error: El Stock debe ser mayor a 0");
        return;
      }
    } else {
      if (form.stock >= 1) {
        updateData(form);
      } else {
        message.error("Error: El Stock debe ser mayor a 0");
        return;
      }
    }
    handleReset();
  };
  const handleReset = (e) => {
    formAuxiliar.resetFields();
    setForm(initialForm);
    setDataEdit(null);
  };

  return (
    <div className="p-3  mt-1 border bg-light shadow-sm rounded">
      <p>{dataEdit ? "Editar Datos del Producto" : "Datos del Producto"}</p>
      <Form
        layout={"vertical"}
        form={formAuxiliar}
        name="control-hooks"
        onFinish={handleSubmit}
      >
        <Form.Item name="nombreProducto" label="Nombre Producto">
          <Input
            onChange={handleChange}
            value={form.cantidadAnt}
            style={{ width: "100%" }}
            required
          />
        </Form.Item>
        <Form.Item name="categoria" label="Producto Categoria">
          <Select
            onChange={handleSelect}
            value={form.categoria}
            placeholder="Seleccione..."
            defaultValue="Insumo"
          >
            <Select.Option value="Insumo">Insumo</Select.Option>
            <Select.Option value="Utilitarios">Utilitarios</Select.Option>
            <Select.Option value="Refaccion">Refaccion</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="medida" label="Unidad Medida">
          <Input
            onChange={handleChangeMedida}
            value={form.medida}
            style={{ width: "100%" }}
            required
          />
        </Form.Item>
        <Form.Item name="stock" label="Stock">
          <InputNumber
            onChange={handleNumber}
            value={form.stock}
            style={{ width: "100%" }}
            required
          />
        </Form.Item>
        <div className="form-row pt-4">
          <div className="col">
            <Button
              type="primary"
              htmlType="submit"
              className="btn btn-primary float-left"
            >
              {dataEdit ? "Actualizar" : "Guardar"}
            </Button>
          </div>
          <div className="col">
            <Button
              type="primary"
              htmlType="reset"
              onClick={handleReset}
              className="btn btn-danger float-right"
              danger
            >
              {dataEdit ? "Cancelar" : "Limpiar"}
            </Button>
          </div>
        </div>
      </Form>
      {seGuardo && (
        <UncontrolledAlert color="success" className="mt-3">
          {mesaje}
        </UncontrolledAlert>
      )}
    </div>
  );
};

export default CrudForm;
