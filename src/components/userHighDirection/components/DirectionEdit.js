import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";
import * as yup from "yup";
import axios from "../../../shared/plugins/axios";
import { useFormik } from "formik";

export const DirectionEdit = ({
  isOpenUpdate,
  handleClose,
  name,
  surname,
  secondSurname,
  getDirectives
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

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      secondSurname: "",
      email: ""
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Campo obligatorio"),
      surname: yup.string().required("Campo obligatorio"),
      secondSurname: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: (values) => {
      const person = {
        password: values.email,
        person: {
          name: values.name,
          surname: values.surname,
          secondSurname: values.secondSurname,
          email: values.email,
          profession: {
            id: 3,
            description: "Directivo"
          },
          status: {
            id: 1,
            description: "Activo"
          }
        },
        authorities: [
          {
            id: 1,
            description: "Directivo"
          }
        ],
        status: {
          id: 1,
          description: "Activo"
        }
      };
      Alert.fire({
        title: titleConfirmacion,
        text: msjConfirmacion,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#198754",
        cancelButtonColor: "#dc3545",
        showCancelButton: true,
        reverseButtons: true,
        showLoaderOnConfirm: true,
        icon: "warning",
        preConfirm: () => {
          return axios({ url: "/user/", method: "POST", data: JSON.stringify(person) })
            .then((response) => {
              console.log(response)
              if (!response.error) {
                getDirectives();
                Alert.fire({
                  title: titleExito,
                  text: msjExito,
                  confirmButtonColor: "#198754",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleCloseForm();
                  }
                });
              }
              return response;
            }).catch((error) => {
              console.log(error)
              Alert.fire({
                title: titleError,
                text: msjError,
                cancelButtonColor: "#198754",
                icon: "error",
                confirmButtonText: "Aceptar"
              });
            });
        },
        backdrop: true,
        allowOutsideClick: !Alert.isLoading
      });
    },
  });

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