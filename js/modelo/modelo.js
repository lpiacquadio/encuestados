/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntasCargadas = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.todoEliminado = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.votoAgregado = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    let id = 0;
    if (this.preguntas && this.preguntas.length) {
      id = this.preguntas[this.preguntas.length -1].id;
    }
    return id;
  },

  obtenerPregunta: function (nombre) {
    let toReturn
    this.preguntas.forEach(pregunta => {
      if(pregunta.textoPregunta === nombre) {
        toReturn = pregunta;
      }
    })
    return toReturn;
  },

  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },
  
  cargarPreguntas: function() {
    let preguntas = localStorage.getItem('preguntas');
    this.preguntas = preguntas ? JSON.parse(preguntas) : [];
    this.preguntasCargadas.notificar();
  },

  eliminarPregunta: function(id) {
    let preguntas = this.preguntas.filter(pregunta => {
      return pregunta.id != id;
    });
    this.preguntas = preguntas;
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  eliminarTodo: function() {
    this.preguntas = [];
    localStorage.removeItem('preguntas');
    this.todoEliminado.notificar();
  },

  editarPregunta: function(id, nombre) {
    let preguntas = this.preguntas
    preguntas.forEach(pregunta => {
      if(pregunta.id == id) {
        pregunta.textoPregunta = nombre;
      }
    });
    this.preguntas = preguntas;
    this.guardar(this.preguntas);
    this.preguntaEditada.notificar();
  },

  agregarVoto: function(pregunta, textoRespuesta) {
    pregunta.cantidadPorRespuesta.forEach(respuesta => {
      if(respuesta.textoRespuesta === textoRespuesta) {
        respuesta.cantidad += 1;
      }
    });
    this.guardar(this.preguntas);
    this.votoAgregado.notificar();
  },

  guardar: function() {
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  }

};
