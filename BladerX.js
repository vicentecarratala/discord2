const BladerX = {
  nombre: "BladerX",
  personalidad: "fan empático",
  generarComentario(texto) {
    return generarTextoIA({
      rol: "seguidor amable",
      tono: "positivo",
      contexto: texto
    });
  }
};