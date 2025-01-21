import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import bg1 from "../../../assets/utils/images/originals/ccc.jpeg";
import bg2 from "../../../assets/utils/images/originals/bbb.jpeg";
import bg3 from "../../../assets/utils/images/originals/abstract.jpg";

const Login = () => {
  const history = useHistory(); // Hook para manejar la navegación

  const handleLogin = () => {
    history.replace("/dashboards/crm");
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    initialSlide: 0,
    autoplay: true,
    adaptiveHeight: true,
  };

  return (
    <Fragment>
      <div className="h-100">
        <Row className="h-100 g-0">
          <Col lg="4" className="d-none d-lg-block">
            <div className="slider-light">
              <Slider {...settings}>
                <div
                  className="h-100 d-flex justify-content-center align-items-center bg-plum-plate"
                  style={{ backgroundImage: `url(${bg1})` }}
                />
                <div
                  className="h-100 d-flex justify-content-center align-items-center bg-premium-dark"
                  style={{ backgroundImage: `url(${bg3})` }}
                />
                <div
                  className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning"
                  style={{ backgroundImage: `url(${bg2})` }}
                />
              </Slider>
            </div>
          </Col>
          <Col lg="8" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
            <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
              <Row className="divider" />
              <div>
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleEmail">Usuario</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Ingrese su Usuario..." />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="examplePassword">Contraseña</Label>
                        <Input
                          type="password"
                          name="password"
                          id="examplePassword"
                          placeholder="Ingrese su contraseña..."
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="divider" />
                  <div className="d-flex align-items-center">
                    <div className="ms-auto">
                      <a
                        href="https://colorlib.com/"
                        onClick={(e) => e.preventDefault()}
                        className="btn-lg btn btn-link"
                      >
                        Crear Usuario
                      </a>{" "}
                      <Button color="primary" size="lg" onClick={handleLogin}>
                        Ingresar
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Login;
