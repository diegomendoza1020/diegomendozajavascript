var preguntas = [
    {
      pregunta: '¿Como se llamó el tour que marcó el regreso de Soda Stereo luego de "El Ultimo Concierto" en 1996? \n\n A) Me Veras Volver\n\n B) (En) El Septimo Dia\n\n C) Fuerza Natural ' ,
      respuesta: "A"
    },
    {
      pregunta: 'En 1975, la banda britanica Queen publicó una cancion que el paradigma de la musica en aquel entonces, ¿Como se llamó? \n\n A) Radio Rhapsody \n\n B) Queen Rhapsody \n\n C) Bohemian Rhapsody   ',
      respuesta: "C"
    },
    {
      pregunta: '¿Qué instrumento tocó Dave Grohl en Nirvana?\n\n A) Guitarra \n\n B) Bateria \n\n C) Bajo  ',
      respuesta: "B"
    }
  ];
  localStorage.setItem("preguntas", JSON.stringify(preguntas));


  var preguntasAlmacenadas = localStorage.getItem("preguntas");
  

  if (preguntasAlmacenadas) {
    preguntas = JSON.parse(preguntasAlmacenadas);
  }

  var indicePreguntaActual = 0;
  var puntaje = 0;
  

  function mostrarPregunta() {
    var preguntaElemento = document.getElementById("pregunta");
    preguntaElemento.textContent = preguntas[indicePreguntaActual].pregunta;
  }
  

  function comprobarRespuesta() {
    var respuestaUsuario = document.getElementById("respuesta").value.toLowerCase();
    var respuestaCorrecta = preguntas[indicePreguntaActual].respuesta.toLowerCase();
    var resultadoElemento = document.getElementById("resultado");
  
    if (respuestaUsuario === respuestaCorrecta) {
      resultadoElemento.textContent = "¡Muy bien!";
      puntaje++;
    } else {
      resultadoElemento.textContent = "¡Incorrecto, la respuesta correcta es  " + respuestaCorrecta + "!";
    }
  
   
    if (indicePreguntaActual < preguntas.length - 1) {
      indicePreguntaActual++;
      mostrarPregunta();
    } else {
      resultadoElemento.textContent = "Juego terminado. Puntaje total: " + puntaje + " de " + preguntas.length;
      document.getElementById("respuesta").disabled = true;
      document.getElementById("botonResponder").disabled = true;
    }
  }
  
  
  var botonResponder = document.getElementById("botonResponder");
  

  botonResponder.addEventListener("click", comprobarRespuesta);
  

  mostrarPregunta();
  

  

