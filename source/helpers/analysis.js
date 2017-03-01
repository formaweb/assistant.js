Assistant.Analysis = (function() {
  var component = {},
      modules = {};

  component.createModule = function(name, callback, requirements) {
    if (typeof name != 'string') {
      throw new Error('Name need to be a string.');
    }

    if (typeof callback != 'function') {
      throw new Error('Module need to be a function.');
    }

    modules[name] = callback;
  };

  // Preciso fazer com que funcione para mais de um campo.
  // Executar apenas se cumprir os requerimentos.

  component.executeModule = function(name) {
    if (!modules[name]) {
      throw new Error('Module not found.');
    }

    var el = document.querySelector('[data-assistant="title"]');

    modules[name].call(el, {
      clear: Assistant.Message.clear,
      emit: Assistant.Message.emit
    });
  };

  return component;
}());
