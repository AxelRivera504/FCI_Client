handleAddProduct = () => {
  const { selectedProduct, productPrice, productName, cantidad, addedProducts, iSV } = this.state;

  if (selectedProduct && cantidad) {
    // Validar ISV (si no está definido, usar un valor predeterminado como 0.15 para 15%)
    const isvRate = parseFloat(iSV || 0.15);

    // Calcular el ISV y el subtotal por producto
    const totalISV = parseFloat(productPrice) * parseFloat(cantidad) * isvRate;
    const subtotal = parseFloat(productPrice) * parseFloat(cantidad) + totalISV;

    addedProducts.push({
      name: productName,
      price: productPrice,
      cantidad,
      totalISV: totalISV.toFixed(2),
      subtotal: subtotal.toFixed(2),
    });

    this.setState(
      {
        addedProducts,
        selectedProduct: "",
        productPrice: "",
        productName: "",
        cantidad: "",
        iSV: "",
      },
      this.calculateTotals
    );
  }
};

calculateTotals = () => {
  const { addedProducts, descuentoPorcentaje, descuentoCifra } = this.state;

  // Calcular subtotal general e ISV total
  const subtotal = addedProducts.reduce((sum, product) => sum + parseFloat(product.subtotal), 0);
  const totalISV = addedProducts.reduce((sum, product) => sum + parseFloat(product.totalISV), 0);

  // Aplicar descuentos
  let descuento = 0;
  if (descuentoPorcentaje) {
    descuento += (subtotal * parseFloat(descuentoPorcentaje)) / 100;
  }
  if (descuentoCifra) {
    descuento += parseFloat(descuentoCifra);
  }

  // Calcular total general
  const total = subtotal - descuento;

  this.setState({ subtotal, totalISV, total });
};
