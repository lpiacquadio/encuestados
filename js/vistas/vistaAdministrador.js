/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var self = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    self.reconstruirLista();
  });

  this.modelo.preguntasCargadas.suscribir(function() {
    self.reconstruirLista();
  });

  this.modelo.preguntaEliminada.suscribir(function() {
    self.reconstruirLista();
  });

  this.modelo.todoEliminado.suscribir(function() {
    self.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function() {
    self.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.controlador.cargarPreguntas();
    this.limpiarFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta) {
    var self = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    nuevoItem = $('<li>').addClass('list-group-item');
    nuevoItem.attr('id', pregunta.id);
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);

    var textoRespuestas = '';
    pregunta.cantidadPorRespuesta.forEach(respuesta => {
      textoRespuestas += respuesta.textoRespuesta + ', ';
    })
    textoRespuestas = textoRespuestas.slice(0,-2);
    interiorItem.find('small').text(textoRespuestas);
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    preguntas.forEach(pregunta => {
      lista.append(this.construirElementoPregunta(pregunta));
    })
  },

  configuracionDeBotones: function() {
    var e = this.elementos;
    var self = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('#respuesta [name="option[]"]').each(function() {
        if($(this).val() !== '') {
          respuestas.push({ textoRespuesta: $(this).val(), cantidad: 0 });
        }
      })
      self.limpiarFormulario();
      self.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos

    e.botonAgregarRespuesta.click(function() {
      $("#respuesta").append('<input type="text" class="form-control" name="option[]" />');
    });

    e.botonEliminarPregunta.click(function() {
      var preguntaSeleccionada = $(".list-group-item.active").attr("id");
      self.controlador.eliminarPregunta(preguntaSeleccionada);
    });

    e.botonEditarPregunta.click(function() {
      var preguntaSeleccionada = $(".list-group-item.active").attr("id");
      if(preguntaSeleccionada) {
        var nuevoNombre = window.prompt("Ingresa el nuevo titulo de la pregunta:");
        if(nuevoNombre && nuevoNombre !== '') {
          self.controlador.editarPregunta(preguntaSeleccionada, nuevoNombre);
        }
      }
    });

    e.eliminarTodo.click(function(params) {
      self.controlador.eliminarTodo();
    })
  },

  limpiarFormulario: function() {
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
