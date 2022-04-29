import React, { useContext, useRef } from "react";
import { Modal, ModalBody, Button, ModalFooter, ModalHeader } from "reactstrap";
import AlmacenContext from "./ContextAlmacen";

const ModalEliminacion = ({ openModal, setOpenModal }) => {
  const { eliminarProductoBD } = useContext(AlmacenContext);

  return (
    <Modal isOpen={openModal}>
      <ModalHeader>
        <p>Ventana de Confirmación</p>
      </ModalHeader>
      <ModalBody>
        <span>¿Desea eliminar el producto seleccionado?</span>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
        <Button onClick={() => eliminarProductoBD()}>Confirmar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalEliminacion;
