const GlitchKnight = {
  nombre: "GlitchKnight",
  personalidad: "fan amable",
  generarComentario(texto) {
    return generarTextoIA({
      rol: "seguidor amable",
      tono: "positivo",
      contexto: texto
    });
  }
};