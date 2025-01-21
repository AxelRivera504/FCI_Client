import React, { Component, Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import DataTable from "react-data-table-component";
import EditarInventarioForm from "./Editar"; // Importa el componente de formulario de edición

class DynamicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { CodigoProducto: 1, Descripcion: "John", Stock: 40, Comprometido: 28, Disponible: 12 },
        { CodigoProducto: 2, Descripcion: "Jane", Stock: 49, Comprometido: 34, Disponible: 15 },
        { CodigoProducto: 3, Descripcion: "Mike", Stock: 59, Comprometido: 45, Disponible: 14 },
      ],
      isEditing: false,
      selectedRow: null,
    };
  }

  handleEdit = (row) => {
    this.setState({ isEditing: true, selectedRow: row });
  };

  handleDelete = (row) => {
    const updatedData = this.state.data.filter((item) => item.Codigo !== row.Codigo);
    this.setState({ data: updatedData });
    alert(`Producto con código ${row.Codigo} eliminado.`);
  };

  handleSave = (updatedRow) => {
    const updatedData = this.state.data.map((item) =>
      item.Codigo === updatedRow.Codigo ? { ...item, ...updatedRow } : item
    );
    this.setState({ data: updatedData, isEditing: false, selectedRow: null });
  };

  handleGoBack = () => {
    this.setState({ isEditing: false, selectedRow: null });
  };

  render() {
    const { data, isEditing, selectedRow } = this.state;

    const { handleShowForm } = this.props; 
    if (isEditing) {
      return (
        <EditarInventarioForm
          row={selectedRow}
          onSubmit={this.handleSave}
          handleGoBack={this.handleGoBack}
        />
      );
    }

    const columns = [
      {
        name: "Codigo",
        selector: (row) => row.CodigoProducto,
        sortable: true,
      },
      {
        name: "Descripcion",
        selector: (row) => row.Descripcion,
        sortable: true,
      },
      {
        name: "Stock",
        selector: (row) => row.Stock,
        sortable: true,
      },
      {
        name: "Comprometido",
        selector: (row) => row.Comprometido,
        sortable: true,
      },
      {
        name: "Disponible",
        selector: (row) => row.Disponible,
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button color="primary" size="sm" onClick={() => this.handleEdit(row)}>
              <i className="lnr-pencil" />
            </Button>
            <Button color="danger" size="sm" onClick={() => this.handleDelete(row)}>
              <i className="pe-7s-trash" />
            </Button>
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ];

    return (
      <Fragment>
        <Card className="mb-3">
          <CardHeader className="card-header-tab">
            <div className="card-header-title font-size-lg text-capitalize fw-normal">
              <i className="header-icon lnr-laptop-phone me-3 text-muted opacity-6">{" "}</i>
              Productos
            </div>
            <div className="btn-actions-pane-right actions-icon-btn">
              <UncontrolledButtonDropdown>
                <DropdownToggle className="btn-icon btn-icon-only" color="link">
                  <i className="pe-7s-menu btn-icon-wrapper" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link">
                  <DropdownItem header>Opciones</DropdownItem>
                  <DropdownItem onClick={handleShowForm}>
                    <i className="dropdown-icon lnr-inbox"> </i>
                    <span>Nuevo</span>
                  </DropdownItem>
                  <DropdownItem>
                    <i className="dropdown-icon lnr-file-empty"> </i>
                    <span>Reporte de Inventario</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          </CardHeader>
          <CardBody>
            <DataTable
              data={data}
              columns={columns}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="400px"
            />
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

export default DynamicTable;
