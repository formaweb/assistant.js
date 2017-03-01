Assistant.Internationalization = (function() {
  var component = {},
      tokens = {};

  component.setToken = function(locale, key, value) {
    if (!tokens[locale]) {
      tokens[locale] = {};
    }

    tokens[locale][key] = value;
  };

  component.setTokens = function(locale, keys) {
    var key;

    for (key in keys) {
      component.setToken(locale, key, keys[key]);
    }
  };

  component.getToken = function(key, locale) {
    if (typeof locale != 'string') {
      locale = Assistant.settings.locale;
    }

    if (!tokens[locale]) {
      throw new Error('Locale not found.');
    }

    return tokens[locale][key];
  };

  component.translate = function(token, data, locale) {
    token = component.getToken(token, locale);
    return Assistant.Template.parse(token, data);
  };

  return component;
}());
