import React, { Fragment, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
} from "reactstrap";
import DataTable from "react-data-table-component";
import useIndex from "../../pages/index/useIndex"; 
import DropdownMenuComponent from "../DropDownMenuComponent/DropDownMenuComponent";

const MasterDetailTable = () => {
    const {
        facturas,
        columns,
        columnsDetails,
        dropdownOptions,
        selectedOption,
        handleSelectOption
    } = useIndex();

    return (
      <Fragment>
        <Card className="mb-3">
          <CardHeader className="card-header-tab">
            <div className="card-header-title font-size-lg text-capitalize fw-normal">
              <i className="header-icon lnr-laptop-phone me-3 text-muted opacity-6">{" "}</i>
              Factura
            </div>
            <div className="btn-actions-pane-right actions-icon-btn">
              <DropdownMenuComponent options={dropdownOptions} onSelect={handleSelectOption} />
            </div>
          </CardHeader>
          <CardBody>
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
      </Fragment>
    );
}

export default MasterDetailTable;
