import React, { useState, useEffect } from "react";
import { Input, FormGroup, Label } from "reactstrap";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ImpuestoSelect = ({ initialCategoryId, onImpuestoeselect = () => {} }) => {
  const [impuestos, setImpuestos] = useState([]);
  const [impuestoQuery, setImpuestoQuery] = useState("");
  const [filteredImpuestos, setFilteredImpuestos] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchImpuestos();
  }, []);

  useEffect(() => {
    if (initialCategoryId && impuestos.length > 0) {
      const selectedCategory = impuestos.find((impuesto) => impuesto.id === initialCategoryId);
      if (selectedCategory) {
        setImpuestoQuery(selectedCategory.seleccion); // Muestra el nombre del impuesto seleccionado
      }
    }
  }, [initialCategoryId, impuestos]);
  

  const fetchImpuestos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}Impuestos`);
      const result = await response.json();

      if (result.success && result.data) {
        setImpuestos(result.data);
        setFilteredImpuestos(result.data);
      } else {
        console.error("Error al obtener categorías:", result.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de categorías:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setImpuestoQuery(query);

    const filtered = impuestos.filter((impuesto) =>
      impuesto.seleccion.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredImpuestos(filtered);
    setShowDropdown(true);
  };

  const handleSelect = (impuesto) => {
    setImpuestoQuery(impuesto.seleccion);
    onImpuestoeselect(impuesto.id); // Notificar al componente padre
    setShowDropdown(false);
  };

  return (
    <FormGroup>
      <Label for="impuesto">Impuestos</Label>
      <Input
        type="text"
        id="impuesto"
        placeholder="Buscar impuestos..."
        value={impuestoQuery}
        onChange={handleSearch}
        onFocus={() => setShowDropdown(true)} // Mostrar el dropdown al hacer foco
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
          {filteredImpuestos.map((impuesto) => (
            <div
              key={impuesto.id}
              onClick={() => handleSelect(impuesto)}
              style={{
                padding: "5px",
                cursor: "pointer",
                backgroundColor:
                  impuesto.id === initialCategoryId ? "#f0f0f0" : "white",
              }}
            >
              {impuesto.seleccion}
            </div>
          ))}
        </div>
      )}
    </FormGroup>
  );
};

export default ImpuestoSelect;
