/*
 Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  eliminarPregunta: function (id) {
    this.modelo.eliminarPregunta(id);
  },
  eliminarTodo: function () {
    this.modelo.eliminarTodo();
  },
  editarPregunta: function (id, nombre) {
    this.modelo.editarPregunta(id, nombre);
  },
  agregarVoto: function(pregunta, textoRespuesta) {
    this.modelo.agregarVoto(pregunta, textoRespuesta);
  },
  cargarPreguntas: function() {
    this.modelo.cargarPreguntas();
  },
};