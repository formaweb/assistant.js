Assistant.Message = (function() {
  var component = {},
      attribute, containerClass;

  attribute = 'data-' + Assistant.settings.attribute + '-identifier';
  containerClass = '.' + Assistant.settings.containerClass;

  component.clear = function(element, identifier) {
    var container = element.parentNode.querySelector(containerClass),
        current = '[' + attribute + '="' + identifier + '"]';

    current = container.querySelector(current) || false;

    if (current) {
      current.remove();
    }
  };

  component.emit = function(element, identifier, token, data, status) {
    var container = element.parentNode.querySelector(containerClass),
        template = '<li class="{{status}}" {{attribute}}="{{identifier}}">{{message}}</li>';

    if (!container) {
      return;
    }

    template = Assistant.Template.parse(template, {
      attribute: attribute,
      identifier: identifier,
      message: Assistant.Internationalization.translate(token, data),
      status: Assistant.status[status]
    });

    component.clear(element, identifier);
    container.insertAdjacentHTML('beforeend', template);
  };

  return component;
}());
