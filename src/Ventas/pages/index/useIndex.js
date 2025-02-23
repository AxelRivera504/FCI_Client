import React, { useState, useEffect } from 'react';
import FacturaVentaService from '../../services/FacturaVentaService';

const useIndex = () => {
    const [facturas, setFacturas] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedFactura, setSelectedFactura] = useState(null);
    const facturaService = new FacturaVentaService();

    useEffect(() => {
        FacturaVentasListado();
    }, []);

    const FacturaVentasListado = async () => {
        try {
            const data = await facturaService.ListarFacturas();
            setFacturas(data);
        } catch (error) {
            console.error("Error al obtener las facturas:", error);
        }
    };

    const handleSelectOption = (option) => {
        console.log("Opción seleccionada:", option.label);
        setSelectedOption(option.label);
        if (option.label === "Nuevo") {
            handleNewFactura();
        }
    };

    const handleEditFactura = (factura) => {
        console.log("Editando factura:", factura);
        setSelectedFactura(factura);
    };

    const handleDeleteFactura = async (factura) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar la factura ${factura.FacturaId}?`);
        if (!confirmDelete) return;

        try {
            await facturaService.EliminarFactura(factura.FacturaId);
            setFacturas(facturas.filter(f => f.FacturaId !== factura.FacturaId));
            console.log("Factura eliminada:", factura.FacturaId);
        } catch (error) {
            console.error("Error al eliminar la factura:", error);
        }
    };

    const handleNewFactura = () => {
        console.log("Crear nueva factura");
        setSelectedFactura(null);
    };

    const columns = [
        { name: "Factura", selector: row => row.FacturaId, sortable: true },
        { name: "Cliente", selector: row => row.Cliente, sortable: true },
        { name: "Fecha Factura", selector: row => row.FechaFactura, sortable: true },
        { name: "Subtotal", selector: row => row.Subtotal, sortable: true },
        { name: "Impuesto", selector: row => row.Impuesto, sortable: true },
        { name: "Total", selector: row => row.Total, sortable: true },
        { name: "EstadoFactura", selector: row => row.EstadoFactura, sortable: true },
        {
            name: "Acciones",
            cell: (row) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <button className="btn btn-primary btn-sm" onClick={() => handleEditFactura(row)}>
                        <i className="lnr-pencil" />
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteFactura(row)}>
                        <i className="pe-7s-trash" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const columnsDetails = [
        { name: "Detalle", selector: row => row.DetalleId, sortable: true },
        { name: "Código del producto", selector: row => row.CodigoProducto, sortable: true },
        { name: "Producto", selector: row => row.DescripcionProducto, sortable: true },
        { name: "Cantidad", selector: row => row.CantidadProducto, sortable: true },
        { name: "Subtotal", selector: row => row.SubtotalDetalle, sortable: true },
        { name: "Descuento", selector: row => row.DescuentoDetalle, sortable: true },
        { name: "Total", selector: row => row.TotalDetalle, sortable: true },
    ];

    const dropdownOptions = [
        { label: "Nuevo", icon: "lnr-inbox" },
        { label: "Reporte de Inventario", icon: "lnr-file-empty" },
        { label: "Exportar CSV", icon: "lnr-download" }
    ];

    return {
        facturas,
        columns,
        columnsDetails,
        dropdownOptions,
        selectedOption,
        selectedFactura,
        handleSelectOption,
        handleEditFactura,
        handleDeleteFactura,
        handleNewFactura
    };
};

export default useIndex;
