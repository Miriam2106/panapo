import React from 'react'
import { Row, Col, Container, Card, Button } from "react-bootstrap";

export const ChangeRol = () => {
  return (
    <div className="content-wrapper screenHeight">
      <Container fluid>
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="font-weight-bold">Mis roles</h1>
              </div>
            </div>
          </div>
        </section>
        <Row className="mt-3">
          <Col>
          <div>Aquí van las cards con los roles</div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
