var e;

e = (function() {
  e.fn = {};

  function e(params, element) {
    var attr, aux, child, context, data, event, j, k, key, len, len1, param, prop, ref, ref1, ref2, ref3, ref4, ref5, ref6, siblings, style, value;
    if (typeof params === "function") {
      e.ready(params);
      return null;
    } else if (Object.prototype.toString.call(params) === '[object Array]') {
      aux = [];
      for (j = 0, len = params.length; j < len; j++) {
        param = params[j];
        aux.push(e(param, element));
      }
    }
    if (params instanceof Element) {
      aux = params;
    } else if (typeof params === 'object') {
      if (element != null) {
        aux = element;
      } else {
        aux = document.createElement(params['tag']);
      }
      if (params['data'] != null) {
        ref = params['data'];
        for (data in ref) {
          value = ref[data];
          aux.dataset[data] = value;
        }
      }
      ref1 = params['events'];
      for (event in ref1) {
        value = ref1[event];
        aux.addEventListener(event, value);
      }
      ref2 = params['props'];
      for (prop in ref2) {
        value = ref2[prop];
        aux[prop] = value;
      }
      ref3 = params['attrs'];
      for (attr in ref3) {
        value = ref3[attr];
        if (value !== null && value !== "") {
          aux.setAttribute(attr, value);
        }
      }
      if (params['children'] != null) {
        ref4 = params['children'];
        for (k = 0, len1 = ref4.length; k < len1; k++) {
          child = ref4[k];
          aux.append(child);
        }
      }
      ref5 = params['styles'];
      for (style in ref5) {
        value = ref5[style];
        aux.style[style] = value;
      }
    } else if (typeof params === 'string') {
      if (element != null) {
        context = element;
      } else {
        context = document;
      }
      aux = context.querySelectorAll(params);
    }
    aux.attr = function() {
      Element.prototype.setAttribute.apply(this, arguments);
      return this;
    };
    aux.append = function() {
      var el, l, len2, ref6;
      if (!(arguments[0] instanceof Array)) {
        arguments[0] = [arguments[0]];
      }
      ref6 = arguments[0];
      for (l = 0, len2 = ref6.length; l < len2; l++) {
        el = ref6[l];
        Element.prototype.appendChild.apply(this, [el]);
      }
      return this;
    };
    aux.html = function() {
      this.innerHTML = "";
      if (typeof arguments[0] === "string") {
        this.innerHTML = arguments[0];
      } else {
        this.append(arguments[0]);
      }
      return this;
    };
    aux.data = function() {
      if (this.dataset[arguments[0]] != null) {
        return this.dataset[arguments[0]].split(",");
      } else {
        return null;
      }
    };
    siblings = function(element, direction, qtt, include) {
      var i, l, ref6, result;
      if (direction == null) {
        direction = "next";
      }
      if (qtt == null) {
        qtt = 0;
      }
      if (include == null) {
        include = false;
      }
      aux = element;
      result = [];
      if (include) {
        result.push(e(aux));
      }
      if (qtt > 0) {
        qtt -= 2;
      }
      for (i = l = 0, ref6 = qtt; 0 <= ref6 ? l <= ref6 : l >= ref6; i = 0 <= ref6 ? ++l : --l) {
        result.push(e(aux = aux[direction + "ElementSibling"]));
      }
      return result;
    };
    aux.next = function(qtt, include) {
      if (qtt == null) {
        qtt = 0;
      }
      if (include == null) {
        include = false;
      }
      return siblings(this, "next", qtt, include);
    };
    aux.last = function(qtt, include) {
      if (qtt == null) {
        qtt = 0;
      }
      if (include == null) {
        include = false;
      }
      return siblings(this, "previous", qtt, include);
    };
    aux.css = function(attribute, value) {
      if (value != null) {
        this.style[attribute] = value;
        return this;
      } else {
        return this.style[attribute];
      }
    };
    aux.remove = function() {
      return this.parentNode.removeChild(this);
    };
    aux.find = function() {
      return this.querySelectorAll(arguments[0]);
    };
    aux.clone = function() {
      return this.cloneNode(true);
    };
    aux.val = function() {
      var l, len2, len3, len4, m, n, op, ref6, ref7, ref8, values;
      if (arguments[0] == null) {
        if (this.tagName === "SELECT") {
          values = [];
          ref6 = this.options;
          for (l = 0, len2 = ref6.length; l < len2; l++) {
            op = ref6[l];
            if (this.selectedIndex < 0) {
              return op.value;
            }
            if (op.selected) {
              if (this.type === "select-one") {
                return op.value;
              } else {
                values.push(op.value);
              }
            }
          }
          return values;
        } else {
          return this.value;
        }
      } else {
        if (this.tagName === "SELECT") {
          if (typeof arguments[0] !== "array") {
            arguments[0] = [arguments[0]];
          }
          ref7 = arguments[0];
          for (m = 0, len3 = ref7.length; m < len3; m++) {
            value = ref7[m];
            ref8 = this.options;
            for (n = 0, len4 = ref8.length; n < len4; n++) {
              op = ref8[n];
              if (op.value === value) {
                op.selected = true;
              } else {
                op.selected = false;
              }
            }
          }
        } else {
          this.value = arguments[0];
        }
        return this;
      }
    };
    ref6 = e.fn;
    for (key in ref6) {
      value = ref6[key];
      aux[key] = value;
    }
    return aux;
  }


  /*
  		Merge two or more objects. Returns a new object.
  		@public
  		@static
  		@param {Boolean}  deep	 If true, do a deep (or recursive) merge [optional]
  		@param {Object}   objects  The objects to merge together
  		@returns {Object}		  Merged values of defaults and options
   */

  e.extend = function() {
    var extended, i, merge, obj;
    extended = {};
    merge = function(obj) {
      var prop;
      for (prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          extended[prop] = obj[prop];
        }
      }
    };
    i = 0;
    while (i < arguments.length) {
      obj = arguments[i];
      merge(obj);
      i++;
    }
    return extended;
  };

  e.ready = function(event) {
    return window.onload = event;
  };

  e.fetch = function(options) {
    var request;
    options = e.extend({
      type: 'GET',
      url: null,
      data: {},
      callback: null,
      contentType: 'application/x-www-form-urlencoded',
      responseType: 'text',
      events: {
        success: function(response) {},
        error: function(response) {}
      },
      async: true
    }, options || {});
    request = new XMLHttpRequest;
    request.onreadystatechange = (function() {
      if (request.readyState !== 4) {
        return;
      } else {
        if (request.status >= 200 && request.status < 300) {
          options.events.success(request.responseText, request);
        } else {
          options.events.error(request.responseText, request);
        }
      }
      return request;
    });
    request.open(options.type, options.url, options.async);
    request.setRequestHeader('Content-type', options.contentType);
    if (options.async) {
      request.responseType = options.responseType;
    }
    request.send((function(obj) {
      var encodedString, prop;
      encodedString = '';
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (encodedString.length > 0) {
            encodedString += '&';
          }
          encodedString += encodeURI(prop + '=' + obj[prop]);
        }
      }
      return encodedString;
    })(options.data));
    return request;
  };

  e.getExt = function(source) {
    return source.split('.').pop();
  };

  e.getDir = function(path) {
    return path.substring(0, path.lastIndexOf('/')) + '/';
  };

  e.here = function() {
    var script;
    script = document.getElementsByTagName('script');
    if (script === void 0) {
      return e.getDir(window.location.href);
    } else {
      return e.getDir(script[script.length + -1].src);
    }
  };

  e.partial = function(source) {
    if (!source.includes('http')) {
      source = e.here() + source;
    }
    e.fetch({
      url: source,
      events: {
        success: function(data) {
          var container, script, style;
          switch (e.getExt(source)) {
            case 'coffee':
            case 'coffeescript':
            case 'typescript':
            case 'ts':
            case 'js':
              container = document.getElementsByTagName('head')[0];
              script = document.createElement('script');
              script.innerHTML = data;
              container.insertBefore(script, container.firstChild);
              break;
            case 'css':
            case 'less':
            case 'sass':
            case 'scss':
            case 'styl':
              style = document.createElement('style');
              style.innerHTML = data;
              style.lang = e.getExt(source);
              document.getElementsByTagName('head')[0].appendChild(style);
          }
        }
      },
      async: false
    });
  };

  return e;

})();

// ---
// generated by coffee-script 1.9.2