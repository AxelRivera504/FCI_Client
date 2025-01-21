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
  Input,
} from "reactstrap";
import DataTable from "react-data-table-component";
import EditarProductoForm from "./Editar";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class DynamicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
      searchTerm: "",
      isEditing: false,
      selectedRow: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}UnidadesMedidas`);
      const result = await response.json();

      if (result.success && result.data) {
        const formattedData = result.data.map((item) => ({
          id: item.id,
          UnidadMedida: item.unidadMedida,
          Descripcion: item.descripcion,
          Equivalente: item.equivalente,
        }));

        this.setState({ data: formattedData, filteredData: formattedData });
      } else {
        console.error("Error al obtener datos:", result.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    this.setState((prevState) => ({
      searchTerm,
      filteredData: prevState.data.filter(
        (item) =>
          item.UnidadMedida.toLowerCase().includes(searchTerm) ||
          item.Descripcion.toLowerCase().includes(searchTerm) ||
          item.Equivalente.toLowerCase().includes(searchTerm)
      ),
    }));
  };

  handleEdit = (row) => {
    this.setState({ isEditing: true, selectedRow: row });
  };

  handleDelete = (row) => {
    const updatedData = this.state.data.filter((item) => item.id !== row.id);
    this.setState({ data: updatedData, filteredData: updatedData });
    alert(`Producto con ID ${row.id} eliminado.`);
  };

  handleSave = (updatedRow) => {
    const updatedData = this.state.data.map((item) =>
      item.id === updatedRow.id ? { ...item, ...updatedRow } : item
    );
    this.setState({ data: updatedData, filteredData: updatedData, isEditing: false, selectedRow: null });
  };

  handleGoBack = () => {
    this.setState({ isEditing: false, selectedRow: null });
  };

  render() {
    const { filteredData, isEditing, selectedRow, searchTerm } = this.state;

    const { handleShowForm } = this.props;
    if (isEditing) {
      return (
        <EditarProductoForm
          row={selectedRow}
          onSubmit={this.handleSave}
          handleGoBack={this.handleGoBack}
        />
      );
    }

    const columns = [
      {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
        wrap: true,
      },
      {
        name: "Unidad de Medida",
        selector: (row) => row.UnidadMedida,
        sortable: true,
        wrap: true,
      },
      {
        name: "Equivalente",
        selector: (row) => row.Equivalente,
        sortable: true,
        wrap: true,
      },
      {
        name: "Descripcion",
        selector: (row) => row.Descripcion,
        sortable: true,
        wrap: true,
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
              Categoría de productos
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
            {/* Input de búsqueda */}
            <Input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={this.handleSearch}
              style={{ marginBottom: "15px" }}
            />
            <DataTable
              data={filteredData}
              columns={columns}
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 15]}
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
