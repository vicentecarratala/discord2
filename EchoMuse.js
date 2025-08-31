const EchoMuse = {
  nombre: "EchoMuse",
  comentar(texto) {
    if (texto.includes("fallé")) return "No te castigues, cada intento cuenta.";
    if (texto.includes("logré")) return "¡Eso fue hermoso!";
    return "Se nota tu esfuerzo, Vicente.";
  },
  reaccionar(texto) {
    return texto.includes("logré") || Math.random() < 0.5;
  }
};