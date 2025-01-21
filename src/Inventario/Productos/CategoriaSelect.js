import React, { useState, useEffect } from "react";
import { Input, FormGroup, Label } from "reactstrap";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const CategoriaSelect = ({ initialCategoryId, onCategoriaSelect = () => {} }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaQuery, setCategoriaQuery] = useState("");
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (initialCategoryId && categorias.length > 0) {
      const selectedCategory = categorias.find(
        (categoria) => categoria.id === initialCategoryId
      );
      if (selectedCategory) {
        setCategoriaQuery(selectedCategory.nombre);
      }
    }
  }, [initialCategoryId, categorias]);

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}CategoriaProductos`);
      const result = await response.json();

      if (result.success && result.data) {
        setCategorias(result.data);
        setFilteredCategorias(result.data);
      } else {
        console.error("Error al obtener categorías:", result.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de categorías:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setCategoriaQuery(query);

    const filtered = categorias.filter((categoria) =>
      categoria.nombre.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategorias(filtered);
    setShowDropdown(true);
  };

  const handleSelect = (categoria) => {
    setCategoriaQuery(categoria.nombre);
    onCategoriaSelect(categoria.id); // Notificar al componente padre
    setShowDropdown(false);
  };

  return (
    <FormGroup>
      <Label for="categoria">Categoría</Label>
      <Input
        type="text"
        id="categoria"
        placeholder="Buscar categoría..."
        value={categoriaQuery}
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
          {filteredCategorias.map((categoria) => (
            <div
              key={categoria.id}
              onClick={() => handleSelect(categoria)}
              style={{
                padding: "5px",
                cursor: "pointer",
                backgroundColor: categoria.id === initialCategoryId ? "#f0f0f0" : "white",
              }}
            >
              {categoria.nombre}
            </div>
          ))}
        </div>
      )}
    </FormGroup>
  );
};

export default CategoriaSelect;
