import React, { Fragment } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';


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

export default class Login extends React.Component {
  render() {
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={0} enter={false} exit={false}>
            <Container fluid>
              <Row>
                <Col md="6">
                  <Card className="main-card mb-3">
                    <CardBody>
                      <CardTitle>Controls Types</CardTitle>
                      <Form>
                        <FormGroup>
                          <Label for="exampleEmail">Email</Label>
                          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder"/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="examplePassword">Password</Label>
                          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder"/>
                        </FormGroup>
                        <Button color="primary" className="mt-1">
                          Submit
                        </Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
        
            </Container>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
