import React, { Fragment } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";

export default class CrearInventarioForm extends React.Component {
  render() {
    const { handleGoBack } = this.props; 

    return (
      <Fragment>
        <Container fluid>
          <Row>
            <Col md="8" className="mx-auto"> {/* Centrar el formulario */}
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Crear Producto</CardTitle>
                  <Form>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                       <Label for="exampleSelect">Producto</Label>
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
                          <Label for="productName">Stock</Label>
                          <Input type="text" id="productName" placeholder="Nombre del producto" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="productStock">Comprometido</Label>
                          <Input type="number" id="productPrice" placeholder="Precio del producto" />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="productDisponible">Disponible</Label>
                          <Input type="number" id="productPrice" placeholder="Precio del producto" />
                        </FormGroup>
                      </Col>
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
