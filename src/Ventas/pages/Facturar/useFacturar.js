import React, { useState, useEffect } from 'react';
import FacturaVentaService from '../../services/FacturaVentaService';

const useFacturar = () => {

    const [facturas, setFacturas] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedFactura, setSelectedFactura] = useState(null);
    const facturaService = new FacturaVentaService();

    const [isv, setIsv] = useState(0);
    const [descuento, setDescuento] = useState(0);
    const [totalFactura, setTotalFactura] = useState(0);

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
                    <button className="btn btn-primary btn-sm" >
                        <i className="lnr-pencil" />
                    </button>
                    <button className="btn btn-danger btn-sm">
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

    return {
        facturas,
        columns,
        columnsDetails,
        isv,
        descuento,
        totalFactura
    };
};

export default useFacturar;
