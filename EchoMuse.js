const EchoMuse = {
  nombre: "EchoMuse",
  personalidad: "fan empática",
  generarComentario(texto) {
    return generarTextoIA({
      rol: "seguidora amable",
      tono: "positivo",
      contexto: texto
    });
  }
};