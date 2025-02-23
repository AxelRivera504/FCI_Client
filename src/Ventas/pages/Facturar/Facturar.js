import React, { Fragment, useState, Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
  Table,
} from "reactstrap";
import DataTable from "react-data-table-component";
import useFacturar from "../../pages/Facturar/useFacturar"; 
import PageTitle from "../../../Layout/AppMain/PageTitle";
import DynamicPageTitle from "../../../Layout/AppMain/DynamicPageTitle";

// Importaciones de layout
import ThemeOptions from "../../../Layout/ThemeOptions";
import AppHeader from "../../../Layout/AppHeader";
import AppSidebar from "../../../Layout/AppSidebar";
import AppFooter from "../../../Layout/AppFooter";

const Facturar = () => {
  const {
    facturas,
    columns,
    columnsDetails,
    isv,
    descuento,
    totalFactura
  } = useFacturar();

  const [numFactura, setnumFactura] = useState([]);
  const [correlativo, setcorrelativo] = useState([]);

  return (
    <Fragment>
      <ThemeOptions />
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <TransitionGroup>
              <CSSTransition
                component="div"
                classNames="TabsAnimation"
                appear={true}
                timeout={1500}
                enter={false}
                exit={false}
              >
                <div>
                <DynamicPageTitle
                  heading="Facturación"
                  subheading="Interfaz que permite generar, registrar y emitir facturas."
                  icon="pe-7s-display1 icon-gradient bg-premium-dark"
                >
                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label style={{ fontSize: "12px", fontWeight: "bold" }}>Total:</label>
                    <Input type="text" value={`L ${totalFactura.toFixed(2)}`} readOnly style={{ width: "100px" }} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label style={{ fontSize: "12px", fontWeight: "bold" }}>ISV:</label>
                    <Input type="text" value={`L ${isv.toFixed(2)}`} readOnly style={{ width: "100px" }} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <label style={{ fontSize: "12px", fontWeight: "bold" }}>Descuento:</label>
                    <Input type="text" value={`L ${descuento.toFixed(2)}`} readOnly style={{ width: "100px" }} />
                  </div>

                </div>
                </DynamicPageTitle>
                  <Row>
                    <Col className="mx-auto">
                      <Card className="main-card mb-3">
                        <CardBody>
                          <CardTitle>Información de factura</CardTitle>
                          <Form>
                            <Row>
                              <Col md="4">
                                <FormGroup>
                                  <Label for="correlativo">
                                    Correlativo
                                  </Label>
                                  <Input
                                    type="text"
                                    id="correlativo"
                                    disabled
                                    placeholder="Correlativo fiscal"
                                    value={correlativo}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="4">
                                <FormGroup>
                                  <Label for="cai">CAI</Label>
                                  <Input
                                    type="text"
                                    id="cai"
                                    disabled
                                    placeholder="Clave de autorización de impresión"
                                    value={correlativo}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="4">
                                <FormGroup>
                                  <Label for="cajero">Cajero</Label>
                                  <Input
                                    type="text"
                                    id="cajero"
                                    disabled
                                    placeholder="Cajero"
                                    value={correlativo}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-sm-6">
                      <Card className="main-card mb-3">
                          <CardBody>
                            <CardTitle>Selección Forma de Pago</CardTitle>
                            <Form>
                              <FormGroup>
                              <Input type="select" name="select" id="exampleSelect">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </Input>
                            </FormGroup>
                            </Form>
                        </CardBody>
                      </Card>
                      <Card className="main-card mb-3">
                          <CardBody>
                            <CardTitle>Selección productos</CardTitle>
                            <Form>
                              <FormGroup>
                              <Input type="select" name="select" id="exampleSelect">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </Input>
                            </FormGroup>
                            </Form>
                            <Row>
                            <Col className="col-sm-6">
                                <FormGroup>
                                    <Label for="descripProducto">Descripción</Label>
                                    <Input
                                      type="text"
                                      id="descripProducto"
                                      disabled
                                      placeholder="Seleccione un producto"
                                      value={correlativo}
                                    />
                                  </FormGroup>
                              </Col>
                              <Col className="col-sm-6">
                                <FormGroup>
                                    <Label for="cantidadProducto">Cantidad</Label>
                                    <Input
                                      type="text"
                                      id="cantidadProducto"
                                      disabled
                                      placeholder="Seleccione un producto"
                                      value={correlativo}
                                    />
                                  </FormGroup>
                              </Col>
                            </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="col-sm-6">
                      <Card className="main-card mb-3" style={{height:"329px"}}>
                          <CardBody>
                            <CardTitle>Información del cliente</CardTitle>
                            <Row>
                              <Col className="col-sm-10">
                              <Form>
                                <FormGroup>
                                <Label for="exampleSelect">Selecciona o busca un cliente</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                </Input>
                              </FormGroup>
                            </Form>
                            </Col>
                            <Col className="col-sm-2">
                              <Button color="primary" className="mb-2" style={{ position:"relative", top: "30px"}}> 
                                Agregar
                              </Button>
                            </Col>
                            </Row>
                            <br></br>
                            <Row>
                              <Col className="col-sm-6">
                                <FormGroup>
                                    <Label for="cliente">Cliente</Label>
                                    <Input
                                      type="text"
                                      id="cliente"
                                      disabled
                                      placeholder="Seleccione un cliente"
                                      value={correlativo}
                                    />
                                  </FormGroup>
                              </Col>
                              <Col className="col-sm-6">
                                <FormGroup>
                                    <Label for="dnirtn">DNI - RTN</Label>
                                    <Input
                                      type="text"
                                      id="dnirtn"
                                      disabled
                                      placeholder="Seleccione un cliente"
                                      value={correlativo}
                                    />
                                  </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="col-sm-6">
                                <FormGroup>
                                    <Label for="nacionalidad">Nacionalidad</Label>
                                    <Input
                                      type="text"
                                      id="nacionalidad"
                                      disabled
                                      placeholder="Seleccione un cliente"
                                      value={correlativo}
                                    />
                                  </FormGroup>
                              </Col>
                              <Col className="col-sm-6">
                                <FormGroup>
                                    <Label for="fechaNac">Fecha Nacimiento</Label>
                                    <Input
                                      type="text"
                                      id="fechaNac"
                                      disabled
                                      placeholder="Seleccione un cliente"
                                      value={correlativo}
                                    />
                                  </FormGroup>
                              </Col>
                            </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                  <Card className="main-card mb-3" style={{height:"329px"}}>
                    <CardBody>
                      <CardTitle>Productos factura</CardTitle>
                      <DataTable
                        data={facturas}
                        columns={columns}
                        expandableRows
                        expandableRowsComponent={({ data }) => (
                          <div style={{ padding: "10px", background: "#f8f9fa" }}>
                            <DataTable data={data.FacturaDetalle} columns={columnsDetails} />
                          </div>
                        )}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="400px"
                      />
                    </CardBody>
                  </Card>
                  </Row>
                  </div>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Facturar;
