Assistant.Analysis.createModule('titleLength', function(helper) {
  var identifier = 'titleLength',
      element = this,
      maximum = 65,
      minimum = 35;

  function analysis() {
    var value = element.value,
        count = value.length;

    if (count < 1) {
      return helper.clear(element, identifier);
    }

    if (count < minimum) {
      return helper.emit(element, identifier, 'title.length.short', {
        count: count,
        minimum: minimum
      }, 'error');
    }

    if (count > maximum) {
      return helper.emit(element, identifier, 'title.length.long', {
        count: count - maximum,
        maximum: maximum
      }, 'warning');
    }

    return helper.emit(element, identifier, 'title.length.enough', {
      maximum: maximum,
      minimum: minimum
    }, 'passed');
  }

  this.addEventListener('blur', analysis);
  this.addEventListener('focus', analysis);
  this.addEventListener('keyup', analysis);

  analysis();
}, ['title']);

Assistant.Analysis.executeModule('titleLength');
