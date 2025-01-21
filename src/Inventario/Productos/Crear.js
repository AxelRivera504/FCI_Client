import React, { Fragment } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
} from "reactstrap";
import ImageUploader from "./CargadorImagen";
import CategoriaSelect from "./CategoriaSelect";
import Unidadselect from "./UnidadSelect";
import Impuestoselect from "./ImpuestoSelect";
import SweetAlert from "react-bootstrap-sweetalert";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default class CrearProductoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoProducto: "",
      imagenUrl: null,
      codigoBarra: "",
      descripcion: "",
      precio: "",
      selectedCategoria: "",
      selectedUnidad: "",
      selectedImpuesto: "",
      alert: null,
      errors: {}, // Objeto para rastrear errores de validación
    };
  }

  handleInputChange = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => {
      const updatedErrors = { ...prevState.errors };
      if (value.trim() !== "") {
        delete updatedErrors[id];
      }
      return { [id]: value, errors: updatedErrors };
    });
  };
  handleImageUploadSuccess = (url) => {
    this.setState({ imagenUrl: url });
  };

  validateFields = () => {
    const { codigoProducto, codigoBarra, nombre, descripcion, precio } = this.state;
    const errors = {};

    if (!codigoProducto) errors.codigoProducto = "El código del producto es obligatorio.";
    if (!codigoBarra) errors.codigoBarra = "El código de barra es obligatorio.";

    if (!descripcion) errors.descripcion = "La descripción es obligatoria.";
    if (!precio) errors.precio = "El precio es obligatorio.";

    this.setState({ errors });

    // Devuelve true si no hay errores
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    // Validar los campos antes de enviar
    if (!this.validateFields()) {
      this.showAlert("Error", "Por favor, complete todos los campos obligatorios.", "danger");
      return;
    }

    const {
      codigoProducto,
      imagenUrl,
      codigoBarra,
      nombre,
      descripcion,
      precio,
      selectedCategoria,
      selectedUnidad,
      selectedImpuesto,
    } = this.state;

    const payload = {
      codigoProducto,
      imagen: imagenUrl,
      codigoBarra,
      descripcion,
      precio: parseFloat(precio),
      idCategoria: selectedCategoria,
      idISV: selectedImpuesto,
      idUnidadMedida: selectedUnidad,
      usuarioCrea: 1,
      usuarioEdita: 0,
      fechaCreacion: null,
      fechaEdicion: null,
    };

    try {
      const response = await fetch(`${API_BASE_URL}Productos/Crear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.data.codeStatus === 0) {
        this.showAlert("¡Éxito!", "Producto creado exitosamente.", "success");
        this.setState({
          codigoProducto: "",
          imagenUrl: null,
          codigoBarra: "",
          descripcion: "",
          precio: "",
          selectedImpuesto: "",
          selectedCategoria: "",
          selectedUnidad: "",
          selectedImpuesto: "",
          errors: {},
        });
      } else {
        this.showAlert("Error", result.data.messageStatus || "Error al crear el producto.", "danger");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      this.showAlert("Error", "No se pudo conectar con el servidor.", "danger");
    }
  };

  showAlert = (title, message, type) => {
    const alert = (
      <SweetAlert
        title={title}
        type={type}
        onConfirm={() => this.setState({ alert: null })}
      >
        {message}
      </SweetAlert>
    );
    this.setState({ alert });
  };
  handleCategoriaChange = (categoriaId) => {
    this.setState({ selectedCategoria: categoriaId });
  };

  handleImpuestoesChange = (ImpuestoId) => {
    this.setState({ selectedImpuesto: ImpuestoId });
  };

  handleUnidadesChange = (unidadId) => {
    this.setState({ selectedUnidad: unidadId });
  };


  render() {
    const { handleGoBack } = this.props;
    const { codigoProducto, codigoBarra, nombre, descripcion, precio, alert, errors } = this.state;

    return (
      <Fragment>
        {alert}
        <Container fluid>
          <Row>
            <Col md="8" className="mx-auto">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Crear Producto</CardTitle>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col md="6">
                        <ImageUploader onUploadSuccess={this.handleImageUploadSuccess} />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="codigoBarra">Código de barra</Label>
                          <Input
                            type="text"
                            id="codigoBarra"
                            value={codigoBarra}
                            onChange={this.handleInputChange}
                            placeholder="Código de barra"
                            style={{ borderColor: errors.codigoBarra ? "red" : undefined }}
                          />
                          {errors.codigoBarra && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {errors.codigoBarra}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="codigoProducto">Código del Producto</Label>
                          <Input
                            type="text"
                            id="codigoProducto"
                            value={codigoProducto}
                            onChange={this.handleInputChange}
                            placeholder="Código del producto"
                            style={{ borderColor: errors.codigoProducto ? "red" : undefined }}
                          />
                          {errors.codigoProducto && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {errors.codigoProducto}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="descripcion">Descripcion</Label>
                          <Input
                            type="text"
                            id="descripcion"
                            value={descripcion}
                            onChange={this.handleInputChange}
                            placeholder="Descripcion"
                            style={{ borderColor: errors.descripcion ? "red" : undefined }}
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
                          <Label for="precio">Precio</Label>
                          <Input
                            type="number"
                            id="precio"
                            value={precio}
                            onChange={this.handleInputChange}
                            placeholder="Precio del producto"
                            style={{ borderColor: errors.precio ? "red" : undefined }}
                          />
                          {errors.precio && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {errors.precio}
                            </span>
                          )}
                        </FormGroup>
                      </Col>

                    </Row>
                    <Row>

                      <Col md="6">
                        <CategoriaSelect
                          initialCategoryId={this.state.selectedCategoria}
                          onCategoriaSelect={this.handleCategoriaChange} />
                      </Col>
                      <Col md="6">
                        <Impuestoselect
                          initialImpuestoId={this.state.selectedImpuesto}
                          impuestoselect={this.handleImpuestoesChange}
                        />

                      </Col>
                      <Col md="6">
                        <Unidadselect
                          initialUnidadesId={this.state.selectedUnidad}
                          onUnidadeselect={this.handleUnidadesChange} />
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
