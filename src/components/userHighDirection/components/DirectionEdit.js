import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";
import axios from "../../../shared/plugins/axios";

export const DirectionEdit = ({
  isOpenUpdate,
  handleClose,
  name,
  surname,
  secondSurname,
  
}) => {
  const [values, setValues] = useState({ name: name, surname: surname, secondSurname: secondSurname });

  //console.log(person)
  const handleCloseForm = () => {
    handleClose(false);
    setValues({});
  };

  useEffect(() => {
    setValues({
      name: name,
      surname: surname,
      secondSurname: secondSurname
    });
  }, [name, surname, secondSurname]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <>
      <Modal show={isOpenUpdate} onHide={handleCloseForm}>
        <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
          <Modal.Title>Modificar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row">
            <Form.Group className="col-md-6 mb-4">
              <Form.Label className="form-label">Nombre</Form.Label>
              <Form.Control
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="col-md-6 mb-4">
              <Form.Label className="form-label">Primer apellido</Form.Label>
              <Form.Control
                name="surname"
                value={values.surname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="col-md-6 mb-4">
              <Form.Label className="form-label">Segundo apellido</Form.Label>
              <Form.Control
                name="secondSurname"
                value={values.secondSurname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-4 mt-3">
              <Row>
                <Col className="text-end">
                  <Button variant="secondary" type="button" onClick={handleCloseForm}>
                    Cerrar
                  </Button>
                  <Button
                    style={{ background: "#042B61", borderColor: "#042B61" }}
                    className="ms-3"
                    type="submit"
                    disabled={false}
                  >
                    Guardar
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};