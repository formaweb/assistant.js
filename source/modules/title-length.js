Assistant.Analysis.createModule('titleLength', function(api) {
  var identifier = 'titleLength',
      element = this,
      maximum = 65,
      minimum = 35;

  function analysis() {
    var value = element.value,
        count = value.length;

    if (count < 1) {
      return api.clear(element, identifier);
    }

    if (count < minimum) {
      return api.emit(element, identifier, 'title.length.short', {
        count: count,
        minimum: minimum
      }, 'error');
    }

    if (count > maximum) {
      return api.emit(element, identifier, 'title.length.long', {
        count: count - maximum,
        maximum: maximum
      }, 'warning');
    }

    return api.emit(element, identifier, 'title.length.enough', {
      maximum: maximum,
      minimum: minimum
    }, 'passed');
  }

  // IDEA: api.event(this, 'blur focus keyup now', analysis);

  this.addEventListener('blur', analysis);
  this.addEventListener('focus', analysis);
  this.addEventListener('keyup', analysis);
  analysis();
}, ['title']);

Assistant.Analysis.executeModule('titleLength');
