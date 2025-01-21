import React, { Fragment } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";

export default class CrearProveedorForm extends React.Component {
  render() {
    const { handleGoBack } = this.props; 
    return (
      <Fragment>
        <Container fluid>
          <Row>
            <Col md="8" className="mx-auto"> {/* Centrar el formulario */}
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Crear Proveedor</CardTitle>
                  <Form>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="productCode">Nombre</Label>
                          <Input type="text" id="productCode" placeholder="Nombre" />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="productName">Apellido</Label>
                          <Input type="text" id="productName" placeholder="Apellido" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="productPrice">Telefono</Label>
                          <Input type="number" id="productPrice" placeholder="Telefono" />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="productPrice">Gmail</Label>
                          <Input type="number" id="productPrice" placeholder="Gmail" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                        <Label for="exampleSelect">Departamento</Label>
                          <Input type="select" name="Categoria" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                      <FormGroup>
                          <Label for="exampleSelect">Ciudad</Label>
                          <Input type="select" name="Categoria" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      </Row>
                      <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="productPrice">Direccion</Label>
                          <Input type="number" id="productPrice" placeholder="Precio del producto" />
                        </FormGroup>
                      </Col>
                      <Row/>
                    </Row>
                  
                    <div className="d-flex justify-content-end">
                      <Button color="primary" className="mt-1">
                        Guardar
                      </Button>
                      <Button color="secondary" className="mt-1 ms-2" onClick={handleGoBack}>
                        Volver
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
