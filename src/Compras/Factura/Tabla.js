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
        {
          id: 1,
          Cliente: "Josshn",
          Total: 300,
          Subtotal: 280,
          Fecha: "2024-12-01",
          Estado: "Activo",
          items: [
            { id: 1, descripcion: "Item A", cantidad: 2, precio: 100 },
            { id: 2, descripcion: "Item B", cantidad: 1, precio: 200 },
          ],
        },
        {
          id: 2,
          Cliente: "Jane",
          Total: 500,
          Subtotal: 450,
          Fecha: "2024-12-02",
          Estado: "Activo",
          items: [
            { id: 1, descripcion: "Item X", cantidad: 3, precio: 150 },
            { id: 2, descripcion: "Item Y", cantidad: 2, precio: 100 },
          ],
        },
        {
          id: 3,
          Cliente: "Mike",
          Total: 700,
          Subtotal: 650,
          Fecha: "2024-12-03",
          Estado: "Activo",
          items: [
            { id: 1, descripcion: "Item M", cantidad: 1, precio: 700 },
          ],
        },
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
        name: "Cliente",
        selector: (row) => row.Cliente,
        sortable: true,
      },
      {
        name: "Fecha",
        selector: (row) => row.Fecha,
        sortable: true,
      },
      {
        name: "Total",
        selector: (row) => row.Total,
        sortable: true,
      },
      {
        name: "Subtotal",
        selector: (row) => row.Subtotal,
        sortable: true,
      },
      {
        name: "Estado",
        selector: (row) => row.Estado,
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
              Factura
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
              expandableRows
              expandableRowsComponent={({ data }) => (
                <div style={{ padding: "10px", background: "#f8f9fa" }}>
                  <strong>Detalle de la factura:</strong>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.descripcion}</td>
                          <td>{item.cantidad}</td>
                          <td>{item.precio}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
