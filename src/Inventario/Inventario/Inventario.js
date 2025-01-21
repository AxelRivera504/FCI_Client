import React, { Component, Fragment } from "react";
import DynamicTable from "./Tabla"; // Importa la tabla
import CrearInventarioForm from "./Crear"; // Importa el formulario de creación

export default class Productos extends Component {
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
          <CrearInventarioForm handleGoBack={this.handleGoBack} />
        ) : (
          <DynamicTable handleShowForm={this.handleShowForm} />
        )}
      </Fragment>
    );
  }
}
