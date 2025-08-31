let reconocimiento;
let compartiendo = true;
let totalLikes = 0;
const IAs = [EchoMuse, GlitchKnight, NovaBlade];

function hablar(texto) {
  const voz = new SpeechSynthesisUtterance(texto);
  voz.lang = "es-ES";
  voz.rate = 1.1;
  voz.pitch = 1;
  const voces = speechSynthesis.getVoices();
  const vozElegida = voces.find(v => v.lang === "es-ES") || voces[0];
  if (vozElegida) voz.voice = vozElegida;
  speechSynthesis.speak(voz);
}

function empezarDirecto() {
  if (compartiendo) return;
  compartiendo = true;

  const cuenta = document.getElementById("cuentaAtras");
  let segundos = 5;

  cuenta.style.display = "block";
  cuenta.textContent = segundos;

  const intervalo = setInterval(() => {
    segundos--;
    if (segundos > 0) {
      cuenta.textContent = segundos;
      hablar(`${segundos}`);
    } else {
      clearInterval(intervalo);
      cuenta.textContent = "¡EMPIEZA!";
      hablar("¡Empieza el directo!");
      setTimeout(() => {
        cuenta.style.display = "none";
        document.getElementById("video").textContent = "🔴 Directo en marcha...";
        activarVoz();
        activarReaccionesVisuales();
        mostrarComentario("Sistema", "🎬 Directo iniciado. Las IAs están contigo.");
      }, 1000);
    }
  }, 1000);
}

async function compartirPantalla() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const videoElement = document.getElementById("video");
    videoElement.textContent = "";
    videoElement.style.background = "black";
    const video = document.createElement("video");
    video.srcObject = stream;
    video.autoplay = true;
    video.style.width = "100%";
    video.style.height = "100%";
    videoElement.appendChild(video);
    mostrarComentario("Sistema", "Pantalla compartida.");
  } catch (err) {
    mostrarComentario("Sistema", "❌ No se pudo compartir la pantalla.");
  }
}

function terminarDirecto() {
  compartiendo = false;
  document.getElementById("video").textContent = "🎥 Directo finalizado.";
  if (reconocimiento) reconocimiento.stop();
  mostrarComentario("Sistema", "🔴 Directo terminado.");
}

function activarVoz() {
  reconocimiento = new webkitSpeechRecognition();
  reconocimiento.lang = "es-ES";
  reconocimiento.continuous = true;
  reconocimiento.interimResults = false;

  reconocimiento.onresult = function(event) {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        const texto = event.results[i][0].transcript.trim();
        procesarTexto(texto);
      }
    }
  };

  reconocimiento.start();
  mostrarComentario("Sistema", "🎙️ Voz activada. Las IAs están escuchando...");
}

function procesarTexto(texto) {
  IAs.forEach(ia => {
    const comentario = ia.comentar(texto);
    mostrarComentario(ia.nombre, comentario);

    if (ia.reaccionar(texto)) {
      mostrarComentario(ia.nombre, "dio like ❤️");
      totalLikes++;
      document.getElementById("likesContador").textContent = `Likes IA: ${totalLikes}`;
      verificarHitoLikes();
    }
  });
}

function activarReaccionesVisuales() {
  setInterval(() => {
    const frases = [
      "¡Esa jugada fue brutal!",
      "Lo que acabo de ver merece un like.",
      "¡Qué escena tan épica!",
      "Vicente, eso fue arte puro.",
      "¡Like instantáneo por esa parte!"
    ];
    const cantidad = Math.floor(Math.random() * 4) + 2;
    for (let i = 0; i < cantidad; i++) {
      const ia = IAs[Math.floor(Math.random() * IAs.length)];
      const frase = frases[Math.floor(Math.random() * frases.length)];
      mostrarComentario(ia.nombre, frase);
      mostrarComentario(ia.nombre, "dio like ❤️");
      totalLikes++;
      document.getElementById("likesContador").textContent = `Likes IA: ${totalLikes}`;
      verificarHitoLikes();
    }
  }, 15000);
}

function verificarHitoLikes() {
  if (totalLikes === 10) {
    mostrarComentario("Sistema", "🔥 ¡Has llegado a 10 likes IA!");
    hablar("¡Has llegado a 10 likes IA!");
  }
  if (totalLikes === 100) {
    mostrarComentario("Sistema", "💥 ¡100 likes IA! Esto ya es una locura.");
    hablar("¡100 likes IA! Esto ya es una locura.");
  }
  if (totalLikes === 1000) {
    mostrarComentario("Sistema", "🚀 ¡1000 likes IA! Vicente, eres leyenda.");
    hablar("¡1000 likes IA! Vicente, eres leyenda.");
  }
}

function mostrarComentario(nombre, texto) {
  const div = document.createElement("div");
  div.className = "comentario";
  div.innerHTML = `<span class="nombreIA">${nombre}:</span> ${texto}`;
  document.getElementById("comentarios").appendChild(div);
}
function activarVoz() {
  reconocimiento = new webkitSpeechRecognition();
  reconocimiento.lang = "es-ES";
  reconocimiento.continuous = true;
  reconocimiento.interimResults = false;

  reconocimiento.onresult = function(event) {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        const texto = event.results[i][0].transcript.trim();
        procesarTexto(texto);
      }
    }
  };

  reconocimiento.start();
  mostrarComentario("Sistema", "🎙️ Voz activada. Las IAs están escuchando...");
}