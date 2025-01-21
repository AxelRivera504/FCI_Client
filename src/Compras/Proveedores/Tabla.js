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
import EditarProveedorForm from "./Editar"; 

class DynamicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, Nombre: "Josshn", Apellido: "John", Departamento: "Doe", Ciudad: 28, Direccion: "Active", Telefono: 28, Gmail: "Active"},
        {id:2, Nombre: "Jssohn", Apellido: "John", Departamento: "Doe", Ciudad: 28, Direccion: "Active", Telefono: 28, Gmail: "Active"},
        {id:3, Nombre: "Johssn", Apellido: "John", Departamento: "Doe", Ciudad: 28, Direccion: "Active", Telefono: 28, Gmail: "Active"},
      ],
      isEditing: false,
      selectedRow: null,
    };
  }

  handleEdit = (row) => {
    this.setState({ isEditing: true, selectedRow: row });
  };

  handleDelete = (row) => {
    const updatedData = this.state.data.filter((item) => item.id !== row.id);
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
        <EditarProveedorForm
          row={selectedRow}
          onSubmit={this.handleSave}
          handleGoBack={this.handleGoBack}
        />
      );
    }

    const columns = [
      {
        name: "ID",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Nombre",
        selector: (row) => row.Nombre,
        sortable: true,
      },
      {
        name: "Apellido",
        selector: (row) => row.Apellido,
        sortable: true,
      },
      {
        name: "Departamento",
        selector: (row) => row.Departamento,
        sortable: true,
      },
      {
        name: "Ciudad",
        selector: (row) => row.Ciudad,
        sortable: true,
      },
      {
        name: "Direccion",
        selector: (row) => row.Direccion,
        sortable: true,
      },
      {
        name: "Telefono",
        selector: (row) => row.Telefono,
        sortable: true,
      },
      {
        name: "Gmail",
        selector: (row) => row.Gmail,
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
