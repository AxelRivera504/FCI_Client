import React, { Fragment } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default class CrearImpuestoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Impuesto: "",
      Descripcion: 0,
      alert: null,
      errors: {}, // Objeto para rastrear errores de validación // Para mostrar notificaciones
    };
  }


  validateFields = () => {
    const { Impuesto, Descripcion } = this.state;
    const errors = {};

    if (!Impuesto || isNaN(Impuesto) || Number(Impuesto) <= 0) {
      errors.Impuesto = "El impuesto debe ser un número mayor a 0.";
    }

    if (!Descripcion || typeof Descripcion !== "string" || !Descripcion.trim()) {
      errors.descripcion = "La descripción es obligatoria.";
    }

    this.setState({ errors });

    // Retorna true si no hay errores
    return Object.keys(errors).length === 0;
  };


  // Manejar los cambios en los inputs
  handleChange = (e) => {
    const { id, value } = e.target;
    const parsedValue = id === "Impuesto" ? Number(value) : value;

    this.setState((prevState) => {
      const updatedErrors = { ...prevState.errors };
      if (parsedValue !== "" && (id !== "Impuesto" || parsedValue > 0)) {
        delete updatedErrors[id];
      }
      return { [id]: parsedValue, errors: updatedErrors };
    });
  };



  // Manejar el envío del formulario
  handleSubmit = async (e) => {
    e.preventDefault();
    const { Impuesto, Descripcion } = this.state;

    if (!this.validateFields()) {
      this.showAlert("Error", "Por favor, complete todos los campos obligatorios.", "danger");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}Impuestos/Crear`, // Endpoint para la creación
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Impuesto,
            Descripcion,
            usuarioCrea: 1, // Valor fijo
            usuarioEdita: 0, // Inicializado en 0
            fechaCreacion: new Date().toISOString(), // Fecha actual en formato ISO
            fechaEdicion: null, // Inicialmente null
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.data.codeStatus === 0) {

          this.showAlert("¡Éxito!", data.data.messageStatus || "Categoría creada exitosamente.", "success",
            () => {
              const { handleGoBack } = this.props; // Usa handleGoBack para regresar a la tabla
              handleGoBack();
            }
          );
          this.setState({ Impuesto: "", Descripcion: "", errors: {} });

          // Limpia los inputs
        } else {
          // Error controlado desde el procedimiento almacenado
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

  // Mostrar alertas con SweetAlert
  showAlert = (title, message, type, callback) => {
    const alert = (
      <SweetAlert
        title={title}
        type={type}
        onConfirm={() => {
          this.setState({ alert: null });
          if (callback) callback(); // Ejecuta la función de callback
        }}
      >
        {message}
      </SweetAlert>
    );
    this.setState({ alert });
  };
  render() {
    const { handleGoBack } = this.props;
    const { Impuesto, Descripcion, alert, errors } = this.state;

    return (
      <Fragment>
        {alert}
        <Container fluid>
          <Row>
            <Col md="8" className="mx-auto">
              {/* Centrar el formulario */}
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Crear Impuestos Pago</CardTitle>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="Impuesto">Impuesto</Label>
                          <Input
                            type="number"
                            id="Impuesto"
                            value={Impuesto}
                            onChange={this.handleChange}
                            style={{ borderColor: errors.Impuesto ? "red" : undefined }}
                            placeholder="Ingrese el impuesto"
                          />
                          {errors.Impuesto && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {errors.Impuesto}
                            </span>
                          )}
                        </FormGroup>

                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="Descripcion">Descripcion</Label>
                          <Input
                            type="text"
                            id="Descripcion"
                            value={Descripcion}
                            onChange={this.handleChange}
                            style={{ borderColor: errors.Descripcion ? "red" : undefined }}

                          />
                          {errors.Descripcion && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {errors.Descripcion}
                            </span>
                          )}
                        </FormGroup>
                      </Col>

                    </Row>

                    <div className="d-flex justify-content-end">
                      <Button color="primary" className="mt-1" type="submit">
                        Guardar
                      </Button>
                      <Button
                        color="secondary"
                        className="mt-1 ms-2"
                        onClick={handleGoBack}
                      >
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
