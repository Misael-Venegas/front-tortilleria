import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Modal, ModalBody, Button, ModalFooter, ModalHeader } from "reactstrap";
import AlmacenContext from "./ContextAlmacen";

const ModalEliminacion = ({ openModal, setOpenModal }) => {
  const { eliminarProductoBD } = useContext(AlmacenContext);
  /*
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);
*/
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
  /**if (isBrowser) {
    return ReactDOM.createPortal(
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
      </Modal>,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  } */
};

export default ModalEliminacion;
