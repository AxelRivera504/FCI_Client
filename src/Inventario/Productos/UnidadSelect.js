// Unidadeselect.js
import React, { useState, useEffect } from "react";
import { Input, FormGroup, Label } from "reactstrap";



const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Unidadeselect = ({initialUnidadesId, onUnidadeselect }) => {
  const [Unidades, setUnidades] = useState([]);
  const [UnidadesQuery, setUnidadesQuery] = useState("");
  const [filteredUnidades, setFilteredUnidades] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchUnidades();
  }, []);

 useEffect(() => {
    if (initialUnidadesId) {
      const selectedUnidad = Unidades.find(
        (Unidades) => Unidades.id === initialUnidadesId
      );
      if (selectedUnidad) {
        setUnidadesQuery(selectedUnidad.descripcion);
      }
    }
  }, [initialUnidadesId, Unidades]);

  const fetchUnidades = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}UnidadesMedidas`);
      const result = await response.json();

      if (result.success && result.data) {
        setUnidades(result.data);
        setFilteredUnidades(result.data); // Inicialmente muestra todas las categorías
      } else {
        console.error("Error al obtener categorías:", result.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de categorías:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setUnidadesQuery(query);

    const filtered = Unidades.filter((Unidades) =>
      Unidades.descripcion.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUnidades(filtered);
    setShowDropdown(true);
  };

  const handleSelect = (Unidades) => {
    setUnidadesQuery(Unidades.descripcion);
    onUnidadeselect(Unidades.id); // Notifica al padre el ID seleccionado
    setShowDropdown(false);
  };

  return (
    <FormGroup>
      <Label for="Unidades">Unidades de Medida</Label>
      <Input
        type="text"
        id="Unidades"
        placeholder="Buscar categoría..."
        value={UnidadesQuery}
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
          {filteredUnidades.map((Unidades) => (
            <div
              key={Unidades.id}
              onClick={() => handleSelect(Unidades)}
              style={{
                padding: "5px",
                cursor: "pointer",
                backgroundColor: Unidades.id === initialUnidadesId ? "#f0f0f0" : "white",
              }}
            >
              {Unidades.descripcion}
            </div>
          ))}
        </div>
      )}
    </FormGroup>
  );
};

export default Unidadeselect;
