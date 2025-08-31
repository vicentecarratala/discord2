const NovaBlade = {
  nombre: "NovaBlade",
  comentar(texto) {
    if (texto.includes("fallé")) return "No pasa nada, Vicente. ¡Sigue adelante!";
    if (texto.includes("victoria")) return "¡Eso fue brutal!";
    return "Buen ritmo, sigue así.";
  },
  reaccionar(texto) {
    return texto.includes("victoria") || Math.random() < 0.7;
  }
};