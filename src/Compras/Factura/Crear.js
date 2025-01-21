import React, { Component, Fragment } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Proveedorselect from "../../Inventario/Productos/ProveedorSelect";
import ProductSelect from "./ProductoSelect";
import {
  Button, Form, FormGroup, Label, Input, Row, Col, Card, CardBody, CardTitle, Container, Table,
} from "reactstrap";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default class CrearFacturaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null,
      selectedProveedor: null,
      selectedProduct: "",
      productId:"",
      productPrice: "",
      productIsv: "",
      cantidad: "",
      iSV: "",
      productName: "",
      productList: [],
      filteredProducts: [],
      addedProducts: [],
      clientQuery: "",
      filteredClients: [],
      descuentoPorcentaje: "",
      descuentoCifra: "",
      numFactura:"",
      subtotal: 0,
      totalItem: 0,
      totalISV: 0,
      descuentoItem: "",
      total: 0,
    };
  }

  validateFields = () => {
    const {
      selectedDate,
      selectedProveedor,
      addedProducts,
      numFactura,
    
    } = this.state;
  
    const errors = [];
  
    if (!selectedDate) errors.push("La fecha del documento es obligatoria.");
    if (!selectedProveedor) errors.push("Debe seleccionar un proveedor.");
    if (addedProducts.length === 0) errors.push("Debe agregar al menos un producto.");
    if (!numFactura) errors.push("Debe agregar el numero de factura.");
 
  
    if (errors.length > 0) {
      alert(errors.join("\n")); // Puedes reemplazar esto por un modal o mensajes específicos en la interfaz.
      return false;
    }
  
    return true;
  };
  
  handleSave = () => {
    if (this.validateFields()) {
      // Aquí puedes realizar las acciones para guardar, como enviar los datos al servidor
      alert("Datos guardados correctamente.");
    }
  };
  

  handleInputChange = (e) => {
    const { id, value } = e.target;
    const { subtotal } = this.state;
  
    if (id === "descuentoPorcentaje") {
      const descuentoCifra = (subtotal * parseFloat(value || 0)) / 100;
      this.setState(
        { descuentoPorcentaje: value, descuentoCifra: descuentoCifra.toFixed(2) },
        this.calculateTotals
      );
    } else if (id === "descuentoCifra") {
      const descuentoPorcentaje = (parseFloat(value || 0) / subtotal) * 100;
      this.setState(
        { descuentoCifra: value, descuentoPorcentaje: descuentoPorcentaje.toFixed(2) },
        this.calculateTotals
      );
    } else {
      this.setState({ [id]: value }, this.calculateTotals);
    }
  };
  
  handleAddProduct = () => {
    const {
      productId,
      selectedProduct,
      productPrice,
      productName,
      cantidad,
      addedProducts,
      productIsv,

      descuentoItem,
    } = this.state;

    if (selectedProduct && cantidad) {
      let isvRate = 0;


      if (!productIsv || parseFloat(productIsv) === 0) {
        isvRate = 0;
      } else {
        isvRate = parseFloat(productIsv) / 100;
      }
     
       
      const descuentoRate = parseFloat(descuentoItem || 0) / 100;


      const descuento = parseFloat(productPrice) * descuentoRate;
      const precioConDescuento = parseFloat(productPrice) - descuento;
      const totalISV = precioConDescuento * parseFloat(cantidad) * isvRate;
      const totalItem = precioConDescuento * parseFloat(cantidad);
      const subtotal = totalItem + totalISV;

      addedProducts.push({
        id:productId,
        name: productName,
        price: productPrice,
        cantidad,
        totalItem: totalItem.toFixed(2),
        totalISV: totalISV.toFixed(2),
        subtotal: subtotal.toFixed(2),
        descuento: descuento.toFixed(2),
      });

      this.setState(
        {
          productId:"",
          numFactura:"",
          addedProducts,
          selectedProduct: "",
          productPrice: "",
          productName: "",
          cantidad: "",
          descuentoItem: "",
          productIsv: "",
        },
        this.calculateTotals
      );
    }
  };


  calculateTotals = () => {
    const { addedProducts, descuentoPorcentaje, descuentoCifra } = this.state;
    const subtotal = addedProducts.reduce((sum, product) => sum + parseFloat(product.subtotal), 0);
  
    let descuento = 0;
    if (descuentoPorcentaje) {
      descuento += (subtotal * parseFloat(descuentoPorcentaje)) / 100;
    }
    if (descuentoCifra) {
      descuento += parseFloat(descuentoCifra);
    }
    const total = subtotal - descuento;
    const totalISV = addedProducts.reduce((sum, product) => sum + parseFloat(product.totalISV), 0);
  
    this.setState({ subtotal, totalISV, total });
  };
  


  handleProveedorChange = (proveedorId) => {
    this.setState({ selectedProveedor: proveedorId });
  };

  filterProducts = () => {
    // Mostrar todos los productos sin filtrarlos
    this.setState((prevState) => ({
      filteredProducts: prevState.productList,
    }));
  };

  fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}Productos`);
      const result = await response.json();
      if (result.success && result.data) {
        // Asegúrate de que los datos incluyen el campo "Impuesto"
        this.setState({ productList: result.data, filteredProducts: result.data });
      } else {
        console.error("Error al obtener productos:", result.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    const { handleGoBack } = this.props;
    const {
      filteredProducts,
      addedProducts,
      productPrice,
      numFactura,
      productName,
      cantidad,
      iSV,
      productIsv,
      descuentoItem,
      selectedDate,
      selectedProveedor,
      selectedProduct,
      subtotal,
      totalISV,
      totalItem,
      total,
    } = this.state;

    return (
      <Fragment>
        <Container fluid>
          <Row>
            <Col md="8" className="mx-auto">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Factura Compras</CardTitle>
                  <Form>
                    <Row>
                      <Col md="6">
                      
                      <Label for="fechaDocumento">Fecha Documento</Label>
                        <FormGroup>
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date) =>
                              this.setState({ selectedDate: date })
                            }
                            placeholderText="Selecciona una fecha"
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                          />
                        </FormGroup>
                      </Col>
                    
                      <Col md="6">
                      <Label for="fechaVencimiento">Fecha Vencimiento</Label>
                        <FormGroup>
                          
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date) =>
                              this.setState({ selectedDate: date })
                            }
                            placeholderText="Selecciona una fecha"
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="numFactura">Número de Factura</Label>
                          <Input
                            type="text"
                            id="numFactura"
                            placeholder="Número de Factura"
                            value={numFactura}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <Proveedorselect
                          onproveedoreselect={this.handleProveedorChange}
                        />
                      </Col>
                    </Row>

                    <hr />
                    <Row>
                      <Col md="6">
                        <ProductSelect
                          proveedorId={selectedProveedor}
                          disabled={!selectedProveedor}
                          onProductSelect={(productId, productPrice, productName, productIsv) =>
                            this.setState({
                              productId,
                              selectedProduct: productId,
                              productPrice,
                              productName,
                              productIsv,
                            })
                          }
                        />

                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label for="precio">Precio</Label>
                          <Input
                            type="number"
                            id="productPrice"
                            value={productPrice}
                            onChange={this.handleInputChange}
                            disabled={!selectedProduct}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label for="cantidad">Cantidad</Label>
                          <Input
                            type="number"
                            id="cantidad"
                            value={cantidad}
                            onChange={this.handleInputChange}
                            disabled={!selectedProduct}
                            placeholder="Cantidad"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label for="ISV">ISV</Label>
                          <Input
                            type="number"
                            id="productIsv"
                            value={productIsv}
                            onChange={this.handleInputChange}
                            disabled={!selectedProduct}
                            placeholder="ISV"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="9">
                        <FormGroup>
                          <Label for="descuentoPor">Descuento Aplicados</Label>
                          <Row>
                            <Col md="4">
                              <Input
                                type="number"
                                id="descuentoItem"
                                disabled={!selectedProduct}
                                onChange={this.handleInputChange}
                                value={descuentoItem}
                                placeholder="Porcentaje"
                              />
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>

                    </Row>
                    <hr />
                    <Button
                      color="primary"
                      className="mb-3"
                      onClick={this.handleAddProduct}
                      disabled={!selectedProduct || !cantidad}
                    >
                      Agregar Producto
                    </Button>

                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Producto</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th>Descuento</th>
                          <th>Total ISV</th>
                          <th>Total Item</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addedProducts.map((product, index) => (
                          <tr key={index}>
                            <td>  {product.id}</td>
                            <td>{product.name}</td>
                            <td>L. {product.price}</td>
                            <td>{product.cantidad}</td>
                            <td>L. {product.descuento}</td>
                            <td>L. {product.totalISV}</td>
                            <td>L. {product.totalItem}</td>
                            <td>L. {product.subtotal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <hr />

                    <Col md="8">
                      <Col md="6">
                        <FormGroup>
                          <Label>Descuento (%)</Label>
                          <Input
                            type="number"
                            id="descuentoPorcentaje"
                            value={this.state.descuentoPorcentaje}
                            onChange={this.handleInputChange}
                            placeholder="Porcentaje"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label>Descuento (Cifra)</Label>
                          <Input
                            type="number"
                            id="descuentoCifra"
                            value={this.state.descuentoCifra}
                            onChange={this.handleInputChange}
                            placeholder="Cifra"
                          />
                        </FormGroup>
                      </Col>
                    </Col>

                    <Col md="6">
                      <Table bordered>
                        <tbody>
                          <tr>
                            <th>Subtotal</th>
                            <td>L. {subtotal.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <th>Impuesto ISV</th>
                            <td>L. {totalISV.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td><strong>L. {total.toFixed(2)}</strong></td>
                          </tr>
                        </tbody>
                      </Table>

                    </Col>

                    <hr />
                    <div className="d-flex justify-content-end">
                      <Button color="primary" className="mt-1" onClick={this.handleSave}>
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
