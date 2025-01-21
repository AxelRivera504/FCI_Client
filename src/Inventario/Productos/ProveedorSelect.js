import React, { useState, useEffect } from "react";
import { Input, FormGroup, Label } from "reactstrap";



const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Proveedoreselect = ({initialProveedorId, onproveedoreselect }) => {
  const [proveedores, setproveedores] = useState([]);
  const [proveedorQuery, setproveedorQuery] = useState("");
  const [filteredproveedores, setFilteredproveedores] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchproveedores();
  }, []);
   useEffect(() => {
    if (initialProveedorId) {
      const selectedProveedor = proveedores.find(
        (proveedor) => proveedor.id === initialProveedorId
      );
      if (selectedProveedor) {
        setproveedorQuery(selectedProveedor.nombre);
      }
    }
  }, [initialProveedorId, proveedores]);

  const fetchproveedores = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}Proveedor`);
      const result = await response.json();

      if (result.success && result.data) {
        setproveedores(result.data);
        setFilteredproveedores(result.data); // Inicialmente muestra todas las categorías
      } else {
        console.error("Error al obtener categorías:", result.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de categorías:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setproveedorQuery(query);

    const filtered = proveedores.filter((proveedor) =>
      proveedor.nombre.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredproveedores(filtered);
    setShowDropdown(true);
  };

  const handleSelect = (proveedor) => {
    setproveedorQuery(proveedor.nombre);
    onproveedoreselect(proveedor.id); // Notifica al padre el ID seleccionado
    setShowDropdown(false);
  };

  return (
    <FormGroup>
      <Label for="proveedor">Proveedor</Label>
      <Input
        type="text"
        id="proveedor"
        placeholder="Buscar proveedor..."
        value={proveedorQuery}
        onChange={handleSearch}
        onFocus={() => setShowDropdown(true)} 
      />
      {showDropdown && (
        <div
          style={{
            maxHeight: "150px",
            overflowY: "auto",
            border: "1px solid #ccc",
            zIndex: 10,
          }}
        >
          {filteredproveedores.map((proveedor) => (
            <div
              key={proveedor.id}
              onClick={() => handleSelect(proveedor)}
              style={{
                padding: "5px",
                cursor: "pointer",
                backgroundColor: proveedor.id === initialProveedorId ? "#f0f0f0" : "white",
              }}
            >
              {proveedor.nombre}
            </div>
          ))}
        </div>
      )}
    </FormGroup>
  );
};

export default Proveedoreselect;
