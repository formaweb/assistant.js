Assistant.Template = (function() {
  var component = {};

  component.parse = function(template, data) {
    var item;

    for (item in data) {
      template = template.replace(new RegExp('{{' + item + '}}','g'), data[item]);
    }

    return template;
  };

  return component;
}());
