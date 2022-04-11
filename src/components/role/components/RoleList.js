import React, { useState, useEffect } from "react";
import { Button, Row, Col, Container, Form, Card, InputGroup, FormControl, Collapse } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import { RoleEdit } from "./RoleEdit";
import { CustomLoader } from "../../../shared/components/CustomLoader";
import { FilterComponent } from "../../../shared/components/FilterComponent";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";


export const RoleList = () => {
    const [filterText, setFilterText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const [values, setValues] = useState({});
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getRoles();
    }, []);

    const getRoles = () => {
        setRoles(rol);
        setIsLoading(false);
    };

    let rol = [
        {
            "description": "hola"
        }
    ];

    const columns = [
        {
            name: <h6>#</h6>,
            cell: (row, index) => <h6>{index + 1}</h6>,
        },
        {
            name: <h6>Rol</h6>,
            cell: (row) => <div className="txt4">{row.description}</div>,
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
        }
    ];

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
        <div className="content-wrapper" style={{"min-height": "100vh"}}>
            <Container fluid >
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="font-weight-bold">Gestión de roles</h1>
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
                                    <Col as="h6">Registrar roles</Col>
                                    <Col className="text-end">
                                        <Col>
                                            {isOpen ? (
                                                <FeatherIcon icon="minus" onClick={() => setIsOpen(!isOpen)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={isOpen} />
                                            ) : (
                                                <FeatherIcon icon="plus" onClick={() => setIsOpen(!isOpen)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={isOpen} />
                                            )}
                                        </Col>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isOpen}>
                                <div id="example-collapse-text">
                                    <Card.Body>
                                        <Form className="row">
                                            <Form.Group className="col-md-6" >
                                                <Form.Label>Nombre del rol</Form.Label>
                                                <Form.Control type="text" placeholder="Ejemplo: Maria" />
                                            </Form.Group>
                                        </Form>
                                        <br />
                                        <div className="d-grid gap-2">
                                            <Button type="submit" style={{ background: "#042B61", borderColor: "#042B61" }} size="lg">
                                                Registrar
                                            </Button>
                                            {/* <Button type="submit" className="button-style" size="lg">Registrar</Button> */}
                                        </div>
                                    </Card.Body>
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
                                    <Col as="h6">Roles</Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <DataTable
                                    columns={columns}
                                    data={roles}
                                    noDataComponent="No hay registros"
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    progressPending={isLoading}
                                    progressComponent={<CustomLoader />}
                                    subHeader
                                    subHeaderComponent={searchComponent}
                                />
                                <RoleEdit
                                    isOpenUpdate={isOpenUpdate}
                                    handleClose={() => setIsOpenUpdate(false)}
                                    setRoles={setRoles}
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