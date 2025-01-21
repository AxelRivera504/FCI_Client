import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap";

const ProductSelect = ({ proveedorId, disabled, onProductSelect }) => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Fetch products when the component is mounted or when proveedorId changes
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}Productos`);
        const result = await response.json();
        if (result.success && result.data) {
          setProductos(result.data);
          setFilteredProductos(
            result.data.filter((producto) => String(producto.idProveedores) === String(proveedorId))
          );
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    if (proveedorId) {
      fetchProductos();
    }
  }, [proveedorId]);

  useEffect(() => {
    // Filter products when searchQuery changes
    if (searchQuery.trim() === "") {
      setShowDropdown(false); // Ocultar lista si el buscador está vacío
    } else {
      const filtered = productos.filter(
        (producto) =>
          String(producto.idProveedores) === String(proveedorId) &&
          producto.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProductos(filtered);
      setShowDropdown(true); // Mostrar lista si hay búsqueda
    }
  }, [searchQuery, proveedorId, productos]);

  const handleSelect = (producto) => {
    setSearchQuery(producto.descripcion); // Dejar el nombre del producto seleccionado en el input
    setShowDropdown(false); // Ocultar lista
    onProductSelect(producto.id, producto.precio, producto.descripcion,producto.isv); // Notificar al padre
  };

  return (
    <FormGroup>
      <Label for="productSearch">Producto</Label>
      <Input
        type="text"
        id="productSearch"
        placeholder="Buscar producto..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => searchQuery.trim() && setShowDropdown(true)} // Mostrar lista al enfocar si hay búsqueda
        disabled={disabled}
      />
      {showDropdown && (
        <div
          style={{
            maxHeight: "150px",
            overflowY: "auto",
            border: "1px solid #ccc",
            marginTop: "5px",
            backgroundColor: "#fff",
            zIndex: 10,
          }}
        >
          {filteredProductos.map((producto) => (
            <div
              key={producto.id}
              onClick={() => handleSelect(producto)}
              style={{
                padding: "5px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
              }}
            >
              {producto.descripcion}
            </div>
          ))}
        </div>
      )}
    </FormGroup>
  );
};

export default ProductSelect;
