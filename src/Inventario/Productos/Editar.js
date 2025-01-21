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

export default class EditarProductoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.row?.id || 0,
      codigoProducto: props.row?.codigoProducto || "",
      imagenUrl: props.row?.imagen || null,
      codigoBarra: props.row?.codigoBarra || "",
      nombre: props.row?.nombre || "",
      descripcion: props.row?.descripcion || "",
      precio: props.row?.precio || "",
      selectedCategoria: props.row?.idCategoria || "",
      selectedUnidad: props.row?.idUnidadMedida || "",
      selectedImpuesto: props.row?.idISV || "",
      alert: null,
      errors: {},
    };
  }


  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.row !== this.props.row) {
      this.setState({
        id: this.props.row?.id || 0,
        codigoProducto: this.props.row?.codigoProducto || "",
        imagenUrl: this.props.row?.imagen || null,
        codigoBarra: this.props.row?.codigoBarra || "",
        descripcion: this.props.row?.descripcion || "",
        precio: this.props.row?.precio || "",
        selectedCategoria: this.props.row?.idCategoria || "",
        selectedUnidad: this.props.row?.idUnidadMedida || "",
        selectedImpuesto: this.props.row?.idISV || "",
      });
    }
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
      id,
      codigoProducto,
      imagenUrl,
      codigoBarra,

      descripcion,
      precio,
      selectedCategoria,
      selectedUnidad,
      selectedImpuesto,
    } = this.state;

    const payload = {
      id,
      codigoProducto,
      imagen: imagenUrl,
      codigoBarra,

      descripcion,
      precio: parseFloat(precio),
      idCategoria: selectedCategoria,
      idISV: selectedImpuesto,
      idUnidadMedida: selectedUnidad,
      usuarioEdita: 1,
      fechaEdicion: null,
    };

    try {
      const response = await fetch(`${API_BASE_URL}Productos/Editar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.data.codeStatus === 0) {
        this.showAlert("¡Éxito!", "Producto actualizado exitosamente.", "success",
          () => {
            const { handleGoBack } = this.props; // Usa handleGoBack para regresar a la tabla
            handleGoBack();
          }
        );
      } else {
        this.showAlert("Error", result.data.messageStatus || "Error al actualizar el producto.", "danger");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
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
    const { codigoProducto, codigoBarra, descripcion, precio, alert, errors } = this.state;

    return (
      <Fragment>
        {alert}
        <Container fluid>
          <Row>
            <Col md="8" className="mx-auto">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Editar Producto</CardTitle>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col md="6">
                        <ImageUploader
                          initialImage={this.state.imagenUrl}
                          onUploadSuccess={this.handleImageUploadSuccess}
                        />
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
                          initialCategoryId={this.state.selectedCategoria} // ID inicial de la categoría
                          onCategoriaSelect={(categoriaId) => this.setState({ selectedCategoria: categoriaId })}
                        />

                      </Col>
                      <Col md="6">
                      <Impuestoselect
  initialCategoryId={this.state.selectedImpuesto}
  onImpuestoeselect={(ImpuestoId) => this.setState({ selectedImpuesto: ImpuestoId })}
/>



                      </Col>
                      <Col md="6">
                        <Unidadselect
                          initialUnidadesId={this.state.selectedUnidad}
                          onUnidadeselect={(unidadId) => this.setState({ selectedUnidad: unidadId })}
                        />
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
