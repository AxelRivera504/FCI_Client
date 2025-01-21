import React, { Component, Fragment } from "react";
import DynamicTable from "./Tabla"; // Importa la tabla
import CrearProductoForm from "./Crear"; // Importa el formulario de creación

export default class MetodosPago extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreating: false, 
    };
  }

  handleShowForm = () => {
    this.setState({ isCreating: true });
  };

  handleGoBack = () => {
    this.setState({ isCreating: false });
  };

  render() {
    const { isCreating } = this.state;

    return (
      <Fragment>
        {isCreating ? (
          <CrearProductoForm handleGoBack={this.handleGoBack} />
        ) : (
          <DynamicTable handleShowForm={this.handleShowForm} />
        )}
      </Fragment>
    );
  }
}
