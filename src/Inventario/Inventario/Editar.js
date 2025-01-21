import React, { Fragment } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";

export default class EditarInventarioForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Codigo: props.row?.Codigo || "",
      Descripcion: props.row?.Descripcion || "",
      Stock: props.row?.Stock || "",
      Comprometido: props.row?.Comprometido || "",
      Disponible: props.row?.Disponible || "",
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
    const { Codigo, Stock,Comprometido, Disponible } = this.state;
    const { handleGoBack } = this.props;

    return (
      <Fragment>
        <Container fluid>
          <Row>
            <Col md="8" className="mx-auto">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Editar Inventario</CardTitle>
                  <Form>
                    <Row>
                     
                    <Col md="6">
                        <FormGroup>
                          <Label for="stock">Stock</Label>
                          <Input
                            type="number"
                            id="stock"
                            name="stock"
                            value={Stock}
                            onChange={this.handleInputChange}
                            placeholder="Stock"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col md="6">
                        <FormGroup>
                          <Label for="Comprometido">Comprometido</Label>
                          <Input
                            type="number"
                            id="comprometido"
                            name="comprometido"
                            value={Comprometido}
                            onChange={this.handleInputChange}
                            placeholder="Precio del producto"
                          />
                        </FormGroup>
                      </Col>
                    <Col md="6">
                        <FormGroup>
                          <Label for="Disponible">Disponible</Label>
                          <Input
                            type="number"
                            id="Disponible"
                            name="Disponible"
                            value={Disponible}
                            onChange={this.handleInputChange}
                            placeholder="Precio del producto"
                          />
                        </FormGroup>
                      </Col>
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
