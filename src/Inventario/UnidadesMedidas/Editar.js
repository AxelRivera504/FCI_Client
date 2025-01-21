import React, { Fragment } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default class EditarProductoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.row?.id || 0,
      equivalente: props.row?.equivalente || 0,
      unidadMedida: props.row?.unidadMedida || 0,
      descripcion: props.row?.Descripcion || "",
      alert: null,
      errors: {}, // Inicializar errores
    };
  }

  validateFields = () => {
    const { equivalente,unidadMedida, descripcion } = this.state;
    const errors = {};

    if (!unidadMedida.trim()) errors.unidadMedida = "El unidadMedida es obligatorio.";
    if (!descripcion.trim()) errors.descripcion = "La descripción es obligatoria.";
    if (!equivalente.trim()) errors.equivalente = "El equivalente es obligatorio.";

    this.setState({ errors });

    // Retorna true si no hay errores
    return Object.keys(errors).length === 0;
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => {
      const updatedErrors = { ...prevState.errors };
      if (value.trim() !== "") {
        delete updatedErrors[id];
      }
      return { [id]: value, errors: updatedErrors };
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { id, unidadMedida, descripcion,equivalente } = this.state;

    if (!this.validateFields()) {
      this.showAlert("Error", "Por favor, complete todos los campos obligatorios.", "danger");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}CategoriaProductos/Editar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          unidadMedida,
          equivalente,
          descripcion,
          usuarioCrea: 0, // Valor fijo
          usuarioEdita: 1, // Inicializado en 1
          fechaCreacion: null, // No es necesario para edición
          fechaEdicion: new Date().toISOString(), // Fecha actual
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data.codeStatus === 0) {
          this.showAlert(
            "¡Éxito!",
            data.data.messageStatus || "Categoría actualizada exitosamente.",
            "success",
            () => {
              const { handleGoBack } = this.props; // Usa handleGoBack para regresar a la tabla
              handleGoBack();
            }
          );
        } else {
          this.showAlert("Error", data.data.messageStatus || "Hubo un problema al guardar.", "danger");
        }
      } else {
        const error = await response.json();
        this.showAlert("Error", error.message || "Hubo un problema al guardar.", "danger");
      }
    } catch (error) {
      this.showAlert("Error", "No se pudo conectar con el servidor.", "danger");
    }
  };

  showAlert = (title, message, type, callback) => {
    const alert = (
      <SweetAlert
        title={title}
        type={type}
        onConfirm={() => {
          this.setState({ alert: null });
          if (callback) callback();
        }}
      >
        {message}
      </SweetAlert>
    );
    this.setState({ alert });
  };

  render() {
    const { unidadMedida, descripcion,equivalente, alert, errors } = this.state;
    const { handleGoBack } = this.props;

    return (
      <Fragment>
        {alert}
        <Container fluid>
          <Row>
            <Col md="8" className="mx-auto">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Editar Categoría</CardTitle>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                    <Col md="6">
                        <FormGroup>
                          <Label for="descripcion">Descripción</Label>
                          <Input
                            type="text"
                            id="descripcion"
                            value={descripcion}
                            onChange={this.handleChange}
                            style={{ borderColor: errors.descripcion ? "red" : undefined }}
                            placeholder="Ingrese la descripción"
                          />
                          {errors.descripcion && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {errors.descripcion}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="unidadMedida">unidadMedida</Label>
                          <Input
                            type="text"
                            id="unidadMedida"
                            value={unidadMedida}
                            onChange={this.handleChange}
                            style={{ borderColor: errors.unidadMedida ? "red" : undefined }}
                            placeholder="Ingrese el unidadMedida"
                          />
                          {errors.unidadMedida && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {errors.unidadMedida}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="equivalente">Equivalente</Label>
                          <Input
                            type="text"
                            id="equivalente"
                            value={equivalente}
                            onChange={this.handleChange}
                            style={{ borderColor: errors.equivalente ? "red" : undefined }}
                            placeholder="Ingrese la descripción"
                          />
                          {errors.equivalente && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {errors.equivalente}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      
                    </Row>
                    <div className="d-flex justify-content-end">
                      <Button color="primary" className="mt-1" type="submit">
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
