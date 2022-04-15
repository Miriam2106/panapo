import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container, Form, Collapse, Card, Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../../shared/plugins/alert";
import axios from "../../../../shared/plugins/axios";
import * as yup from "yup";
import { useFormik } from "formik";

export const ProjectStart = ({
  isOpenStart, 
  handleClose,
  getProspectProject,
  getProyectos,
  id,
  cotizacion,
  description,
  months,
  name,
  numberBeca,
  client,
  project,
  statusProject,
  priceClient,
  status
}) => {

  const [values, setValues] = useState({
    id: id,
    cotizacion: cotizacion,
    description: description,
    months: months,
    name: name,
    numberBeca: numberBeca,
    client: client,
    project: project,
    statusProject: statusProject,
    priceClient: priceClient,
    status: status
  });
  
  const [isOpenData, setIsOpenData] = useState(true);
  const [isOpenTeam, setIsOpenTeam] = useState(true);
  const [isOpenProg, setIsOpenProg] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState(false);

  const handleCloseForm = () => {
    // resetForm();
    handleClose(false);
  };

  useEffect(() => {


    setIsLoading(true);
    // getProspectProject();
  }, []);


  return (
    <>
      <Modal show={isOpenStart} onHide={handleCloseForm} size="lg">
        <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
          <Modal.Title>Iniciar proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* DATOS DEL PROYECTO */}
          <Form > {/*onSubmit={formik.handleSubmit}*/}
            <Card className="mb-3" bg="white">
              <Card.Header onClick={() => setIsOpenData(!isOpenData)}
                aria-controls="example-collapse-text"
                aria-expanded={isOpenData}
                type="button">
                <Row>
                  <Col as="h6" className="text-bold">Datos del proyecto</Col>
                  <Col className="text-end">
                    <Col>
                      {isOpenData ? (
                        <FeatherIcon icon="minus"
                          color="grey" />
                      ) : (
                        <FeatherIcon icon="plus"
                          color="grey" />
                      )}
                    </Col>
                  </Col>
                </Row>
              </Card.Header>
              <Collapse in={isOpenData}>
                <div id="example-collapse-text">
                  <Card.Body>
                    <div className="row">
                      <Form.Group className="col-md-4 mb-4" >
                        <Form.Label className="font-weight-normal">Acrónimo del proyecto<span className="text-danger">*</span></Form.Label>
                        <Form.Control name="acronym" type="text" placeholder="Ejemplo: PANAPO"/>
                        {/* {formik.errors.acronym ? (
                          <span className="text-danger">{formik.errors.acronym}</span>
                        ) : null} */}
                      </Form.Group>
                      <Form.Group className="col-md-4 mb-4" >
                        <Form.Label className="font-weight-normal">Estado del proyecto<span className="text-danger">*</span></Form.Label>
                        <Form.Control name="statusProject" type="text" value="Activo" readOnly />
                      </Form.Group>
                      <Form.Group className="col-md-4 mb-4" >
                        <Form.Label className="font-weight-normal">Prioridad<span className="text-danger">*</span></Form.Label>
                        <Form.Select aria-label="Seleccionar tipo de cliente" name="priority"
                        >
                          <option value="">Seleccione una opción</option>
                          <option value="Alta">Alta</option>
                          <option value="Media">Media</option>
                          <option value="Baja">Baja</option>
                        </Form.Select>
                        {/* {formik.errors.priority ? (
                          <span className='text-danger'>{formik.errors.priority}</span>
                        ) : null} */}
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4" >
                        <Form.Label className="font-weight-normal">Fecha de inicio<span className="text-danger">*</span></Form.Label>
                        <Form.Control name="dateStart" type="date" />
                        {/* {formik.errors.dateStart ? (
                          <span className='text-danger'>{formik.errors.dateStart}</span>
                        ) : null} */}
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4" >
                        <Form.Label className="font-weight-normal">Fecha de fin<span className="text-danger">*</span></Form.Label>
                        <Form.Control name="dateEnd" type="date" />
                        {/* {formik.errors.dateEnd ? (
                          <span className='text-danger'>{formik.errors.dateEnd}</span>
                        ) : null} */}
                      </Form.Group>
                    </div>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
            {/* EQUIPO DE TRABAJO  */}
            <Card className="mb-3" bg="white">
              <Card.Header onClick={() => setIsOpenTeam(!isOpenTeam)}
                aria-controls="example-collapse-text"
                aria-expanded={isOpenTeam}
                type="button">
                <Row>
                  <Col as="h6" className="text-bold">Equipo de trabajo</Col>
                  <Col className="text-end">
                    <Col>
                      {isOpenTeam ? (
                        <FeatherIcon icon="minus" color="grey" />
                      ) : (
                        <FeatherIcon icon="plus" color="grey" />
                      )}
                    </Col>
                  </Col>
                </Row>
              </Card.Header>
              <Collapse in={isOpenTeam}>
                <div id="example-collapse-text">
                  <Card.Body>
                    <div className="row">
                      <Form.Group className="col-md-6 mb-4"  >
                        <Form.Label className="font-weight-normal">Responsable de proyecto<span className="text-danger">*</span></Form.Label>
                        <Form.Select >
                          <option>Seleccione una opción</option>
                          {/* {
                            clients.map((cliente) => (
                              <option key={cliente.id} value={cliente.id}>{cliente.name + " " + cliente.surname + " " + cliente.secondSurname}</option>
                            ))
                          } */}
                        </Form.Select>
                        {/* <Form.Control name="client" value={formik.values.client?.name} onChange={formik.handleChange} type="text" /> */}
                        {/* {formik.errors.client ? (
                          <span className='text-danger'>{formik.errors.client}</span>
                        ) : null} */}
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4"  >
                        <Form.Label className="font-weight-normal">Responsable de desarrollo<span className="text-danger">*</span></Form.Label>
                        <Form.Select >
                          <option>Seleccione una opción</option>
                          {/* {
                            clients.map((cliente) => (
                              <option key={cliente.id} value={cliente.id}>{cliente.name + " " + cliente.surname + " " + cliente.secondSurname}</option>
                            ))
                          } */}
                        </Form.Select>
                        {/* <Form.Control name="client" value={formik.values.client?.name} onChange={formik.handleChange} type="text" /> */}
                        {/* {formik.errors.client ? (
                          <span className='text-danger'>{formik.errors.client}</span>
                        ) : null} */}
                      </Form.Group>
                    </div>
                    {/* ANALISTAS PROGRAMADORES */}
                    <br />
                    <Card className="mb-3" bg="white">
                      <Card.Header onClick={() => setIsOpenProg(!isOpenProg)}
                        aria-controls="example-collapse-text"
                        aria-expanded={isOpenProg}
                        type="button">
                        <Row>
                          <Col as="h6" className="text-bold">Analistas programadores</Col>
                          <Col className="text-end">
                            <Col>
                              {isOpenProg ? (
                                <FeatherIcon icon="minus" color="grey" />
                              ) : (
                                <FeatherIcon icon="plus" color="grey" />
                              )}
                            </Col>
                          </Col>
                        </Row>
                      </Card.Header>
                      <Collapse in={isOpenProg}>
                        <div id="example-collapse-text">
                          <Card.Body>
                            <div className="row">
                                <Form.Group className="col-md-6 mb-4">
                                  <Form.Select >
                                    <option>Seleccione una opción</option>                                   
                                  </Form.Select>
                                </Form.Group>
                                <Form.Group className="col-md-6 mb-4 text-end">                                
                                    <Button type="button" style={{ background: "#042B61", borderColor: "#042B61" }}><FeatherIcon icon="plus" color="white" />Añadir </Button>                                 
                                </Form.Group>                                                            
                            </div>
                          </Card.Body>
                        </div>
                      </Collapse>
                    </Card>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
            <Form.Group className="mb-4 mt-3">
              <Row>
                <Col className="text-end">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleCloseForm}
                  >
                    Cerrar
                  </Button>
                  <Button
                    style={{ background: "#042B61", borderColor: "#042B61" }}
                    className="ms-3"
                    type="submit"

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