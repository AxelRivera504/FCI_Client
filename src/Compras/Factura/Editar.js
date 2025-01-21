import React, { Fragment } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";

export default class EditarProveedorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Nombre: props.row?.Nombre || "",
      Apellido: props.row?.Apellido || "",
      Direccion: props.row?.Direccion || "",
      Telefono: props.row?.Telefono || "",
      Gmail: props.row?.Gmail || "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit(this.state); 
  };

  render() {
    const { Nombre, Apellido, Direccion, Telefono, Gmail } = this.state;
    const { handleGoBack } = this.props;

    return (
      <Fragment>
        <Container fluid>
          <Row>
            <Col md="8" className="mx-auto">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Editar Proveedor</CardTitle>
                  <Form>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="Nombre">Nombre</Label>
                          <Input
                            type="text"
                            id="Nombre"
                            name="Nombre"
                            value={Nombre}
                            onChange={this.handleInputChange}
                            placeholder="Nombre"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="Apellido">Apellidos</Label>
                          <Input
                            type="text"
                            id="Apellido"
                            name="Apellido"
                            value={Apellido}
                            onChange={this.handleInputChange}
                            placeholder="Apellido"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="Telefono">Telefono</Label>
                          <Input
                            type="number"
                            id="Telefono"
                            name="Telefono"
                            value={Telefono}
                            onChange={this.handleInputChange}
                            placeholder="Telefono"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="Gmail">Gmail</Label>
                          <Input
                            type="text"
                            id="Gmail"
                            name="Gmail"
                            value={Gmail}
                            onChange={this.handleInputChange}
                            placeholder="Gmail"
                          />
                        </FormGroup>
                      </Col>
                      <Row/>
                    <Row>
                      <Col md="6">
                      <FormGroup>
                          <Label for="exampleSelect">Departamento</Label>
                          <Input type="select" name="Departamento" id="exampleSelect">
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
                          <Input type="select" name="Direccion" id="exampleSelect">
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
                          <Label for="Direccion">Direccion</Label>
                          <Input
                            type="text"
                            id="Direccion"
                            name="Direccion"
                            value={Direccion}
                            onChange={this.handleInputChange}
                            placeholder="Direccion"
                          />
                        </FormGroup>
                      </Col>
                    </Row>             
                    </Row>
                    <div className="d-flex justify-content-end">
                      <Button color="primary" className="mt-1" onClick={this.handleSubmit}>
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
