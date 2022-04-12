import React, { useState, useEffect } from "react";
import { Button, Row, Col, Container, Form, Collapse, Card, Table, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { ClientEdit } from "./ClientEdit";
import { ClientDetails } from "./ClientDetails"
import DataTable from "react-data-table-component";
import { CustomLoader } from "../../../shared/components/CustomLoader";
import { FilterComponent } from "../../../shared/components/FilterComponent";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";
import { Link, useNavigate } from 'react-router-dom';
import "../../../assets/css/main.css";

export const ClientList = () => {

    let value = "";
    const navigation = useNavigate();

    const setValue = (id) => {
        value = id;
    }

    const [clients, setClients] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({});

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenData, setIsOpenData] = useState(false);
    const [isOpenClient, setIsOpenClient] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenDetails, setIsOpenDetails] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getClients();
    }, []);


    let client = [
        {
            "name": "Marco",
            "surname": "Hernández",
            "lastname": "Goméz",
            "nameCompany": "PEMEX",
            "typeClient": "Interno",
        },
        {
            "name": "Sofía",
            "surname": "Montes",
            "lastname": "Herrea",
            "nameCompany": "PEMEX",
            "typeClient": "Externo",
        },
        {
            "name": "Josué",
            "surname": "Escobar",
            "lastname": "Tenorio",
            "nameCompany": "PEMEX",
            "typeClient": "Externo",
        },
        {
            "name": "Ximena",
            "surname": "Rodriguez",
            "lastname": "Padilla",
            "nameCompany": "PEMEX",
            "typeClient": "Interno",
        }
    ];

    const columns = [
        {
            name: <h6 width="20%">#</h6>,
            cell: (row, index) => <div><h6>{index + 1}</h6></div>,
        },
        {
            name: <h6 className="text-center">Nombre del cliente</h6>,
            cell: (row) => <div className="txt4">{row.name + " "} {row.surname + " "} {row.lastname}</div>,
        },
        {
            name: <h6 className="text-center">Tipo de cliente</h6>,
            cell: (row) => <div className="txt4">{row.typeClient}</div>,
        },
        {
            name: <div><h6>Detalles</h6></div>,
            cell: (row) => <div>
                <Button variant="primary" size="md"
                    onClick={() => {
                        setValues(row)
                        setIsOpenDetails(true)
                    }}>
                    <FeatherIcon icon="info" />
                </Button>
            </div>
        },
        {
            name: <div><h6>Modificar</h6></div>,
            cell: (row) => <div>
                <Button variant="warning" size="md"
                    onClick={() => {
                        setValues(row)
                        setIsOpenUpdate(true)
                    }}>
                    <FeatherIcon icon="edit" />
                </Button>
            </div>
        },
    ];

    const getClients = () => {
        setClients(client);
        setIsLoading(false);
    };

    const paginationOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
    };

    const searchComponent = React.useMemo(() => {
        const search = () => {
            if (filterText) {
                setFilterText("");
            }
        }
        return <FilterComponent filterText={filterText} onFilter={e => setFilterText(e.target.value)} onSearch={search} />
    }, [filterText]);


    return (
        <div className="content-wrapper screenHeight">
            <Container fluid>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="font-weight-bold">Gestión de clientes</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <Row>
                    <Col>
                        <Card className="mb-0">
                            <Card.Header onClick={() => setIsOpen(!isOpen)}
                                aria-controls="example-collapse-text"
                                aria-expanded={isOpen}
                                className="backgroundHeadCard"
                                type="button">
                                <Row>
                                    <Col as="h6">Registrar clientes</Col>
                                    <Col className="text-end">
                                        <Col>
                                            {isOpen ? (
                                                <FeatherIcon icon="minus" />
                                            ) : (
                                                <FeatherIcon icon="plus" />
                                            )}
                                        </Col>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isOpen}>
                                <div id="example-collapse-text">
                                    <Container fluid>
                                        <Card.Body>
                                            {/* DATOS DEL CLIENTE */}
                                            <Card className="mb-3" bg="white">
                                                <Card.Header onClick={() => setIsOpenData(!isOpenData)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={isOpenData}
                                                    type="button">
                                                    <Row>
                                                        <Col as="h6" className="text-bold">Datos del cliente</Col>
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
                                                            <Form className="row">
                                                                <Form.Group className="col-md-4" >
                                                                    <Form.Label>Nombre</Form.Label>
                                                                    <Form.Control type="text" placeholder="Ejemplo: María" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-4" >
                                                                    <Form.Label>Primer apellido</Form.Label>
                                                                    <Form.Control type="text" placeholder="Ejemplo: Valdez" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-4" >
                                                                    <Form.Label>Segundo apellido</Form.Label>
                                                                    <Form.Control type="text" placeholder="Ejemplo: Díaz" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Nombre de la empresa</Form.Label>
                                                                    <Form.Control type="text" placeholder="Ejemplo: NISSAN" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Teléfono</Form.Label>
                                                                    <Form.Control type="tel" placeholder="Ejemplo: Díaz" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Correo eléctronico</Form.Label>
                                                                    <Form.Control type="email" placeholder="Email" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Tipo de cliente</Form.Label>
                                                                    <Form.Select aria-label="Default select example">
                                                                        <option>Seleccione una opción</option>
                                                                        <option value="1">Interno</option>
                                                                        <option value="2">Externo</option>
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Form>
                                                        </Card.Body>
                                                    </div>
                                                </Collapse>
                                            </Card>
                                            {/* DATOS DEL REPRESENTANTE DEL CLIENTE CLIENTE */}
                                            <Card className="mb-3" bg="white">
                                                <Card.Header onClick={() => setIsOpenClient(!isOpenClient)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={isOpenClient}
                                                    type="button">
                                                    <Row>
                                                        <Col as="h6" className="text-bold">Datos del representante del cliente</Col>
                                                        <Col className="text-end">
                                                            <Col>
                                                                {isOpenClient ? (
                                                                    <FeatherIcon icon="minus" color="grey" />
                                                                ) : (
                                                                    <FeatherIcon icon="plus" color="grey" />
                                                                )}
                                                            </Col>
                                                        </Col>
                                                    </Row>
                                                </Card.Header>
                                                <Collapse in={isOpenClient}>
                                                    <div id="example-collapse-text">
                                                        <Card.Body>
                                                            <Form className="row">
                                                                <Form.Group className="col-md-4" >
                                                                    <Form.Label>Nombre</Form.Label>
                                                                    <Form.Control type="text" placeholder="Ejemplo: María" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-4" >
                                                                    <Form.Label>Primer apellido</Form.Label>
                                                                    <Form.Control type="text" placeholder="Ejemplo: Valdez" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-4" >
                                                                    <Form.Label>Segundo apellido</Form.Label>
                                                                    <Form.Control type="text" placeholder="Ejemplo: Díaz" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Teléfono</Form.Label>
                                                                    <Form.Control type="tel" placeholder="Ejemplo: Díaz" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Correo eléctronico</Form.Label>
                                                                    <Form.Control type="email" placeholder="Email" />
                                                                </Form.Group>
                                                            </Form>
                                                        </Card.Body>
                                                    </div>
                                                </Collapse>
                                            </Card>

                                            <div className="d-grid gap-2">
                                                <Button type="submit" style={{ background: "#042B61", borderColor: "#042B61" }} >
                                                    Registrar
                                                </Button>
                                                {/* <Button type="submit" className="button-style" size="lg">Registrar</Button> */}
                                            </div>
                                        </Card.Body>
                                    </Container>
                                </div>
                            </Collapse>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Header
                                className="backgroundHeadCard">
                                <Row>
                                    <Col as="h6">Clientes registrados</Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <DataTable
                                    columns={columns}
                                    data={clients}
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    progressPending={isLoading}
                                    progressComponent={<CustomLoader />}
                                    subHeader
                                    subHeaderComponent={searchComponent}
                                />
                                <ClientEdit
                                    isOpenUpdate={isOpenUpdate}
                                    handleClose={() => setIsOpenUpdate(false)}
                                    setClients={setClients}
                                    {...values}
                                />
                                <ClientDetails
                                    isOpenDetails={isOpenDetails}
                                    handleClose={() => setIsOpenDetails(false)}
                                    setClients={setClients}
                                    {...values}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}