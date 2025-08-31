const GlitchKnight = {
  nombre: "GlitchKnight",
  comentar(texto) {
    if (texto.includes("fallé")) return "Error aceptado. Reiniciando motivación.";
    if (texto.includes("logré")) return "¡Eso fue un glitch de gloria!";
    return "Procesando... ¡Me gusta lo que veo!";
  },
  reaccionar(texto) {
    return texto.includes("logré") || Math.random() < 0.6;
  }
};