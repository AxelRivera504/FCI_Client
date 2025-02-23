import axios from 'axios'
import env from '../../environment/environment.development'   

function FacturaVentaService() {
    const api= env.webApis.Api;
  
    const axiosInstance = axios.create({
      baseURL: api
    })
    
    async function ListarFacturas() {
        try {

          const response = await axiosInstance.get("FacturaVentas");

          const data = response.data.data.map((item) => {
            return {
                FacturaId: item.facturaId,
                FechaFactura: item.fechaFactura,
                Subtotal: item.subtotal,
                Total: item.total,
                Impuesto: item.impuesto,
                Cliente: item.cliente, 
                EstadoFactura: item.estadoFactura,
                FacturaDetalle: item.facturaDetalle.map((detalle) => {
                    return {
                        DetalleId: detalle.detalleId,
                        CodigoProducto: detalle.codigoProducto,
                        DescripcionProducto: detalle.descripcionProducto,
                        CantidadProducto: detalle.cantidadProducto,
                        SubtotalDetalle: detalle.subtotalDetalle,
                        DescuentoDetalle: detalle.descuentoDetalle,
                        TotalDetalle: detalle.totalDetalle
                    }
                })
            }
          });

          return data;

        } catch (error) {

          console.error("Error fetching invoices:", error);
          return [];

        }
      }

      return {
        ListarFacturas
      }
}

export default FacturaVentaService;