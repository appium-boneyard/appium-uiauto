/* globals STATUS, $ */

(function () {
  $.extend($, {

    // Element lookup functions

    lookup: function (selector, ctx) {
      if (typeof selector !== 'string') {
        return null;
      }

      var _ctx = $.mainApp()
        , elems = [];

      if (typeof ctx === 'string') {
        _ctx = this.cache[ctx];
      } else if (typeof ctx !== 'undefined') {
        _ctx = ctx;
      }

      $.target().pushTimeout(0);
      if (selector === 'alert') {
        var alert = $.mainApp().alert();
        if (alert) {
          elems = $(alert);
        }
      } else {
        elems = $(selector, _ctx);
      }
      $.target().popTimeout();

      return elems;
    }

  , getElement: function (name) {
      if (typeof this.cache[name] !== 'undefined') {
        if (this.cache[name].isNil()) {
          throw new Error(STATUS.StaleElementReference.code);
        }
        return this.cache[name];
      }

      return null;
    }

  , getId: function (el) {
      var id = (this.identifier++).toString();
      if (el.name() !== null) {
        $.debug('Lookup returned ' + el + ' with the name "' + el.name() + '" (id: ' + id + ').');
      }
      this.cache[id] = el;
      return id;
    }

  , getElementByName: function (name, ctx) {
      if (name.match(/\*.*\*/)) {
        return this._defaultContext(ctx).getNameContains(
          name.replace(/^\*|\*$/g, ''), false);
      } else {
        return this._defaultContext(ctx).getWithName(name, false);
      }
    }

  , getElementsByName: function (name, ctx) {
      if (name.match(/^\*.*\*$/)) {
        return this._defaultContext(ctx).getAllNameContains(
          name.replace(/^\*|\*$/g, ''), false);
      } else {
        return this._defaultContext(ctx).getAllWithName(name, false);
      }
    }

  , getElementByAccessibilityId: function (accessibilityId, ctx) {
      return this._defaultContext(ctx).getWithName(accessibilityId, false);
    }

  , getElementsByAccessibilityId: function (accessibilityId, ctx) {
      return this._defaultContext(ctx).getAllWithName(accessibilityId, false);
    }

  , _getIdSearchPredicate: function (sel, exact) {
      if (exact) {
        return "name == '" + sel + "' || label == '" + sel + "' || value == '" +
          sel + "'";
      } else {
        // Note that we don't want to include 'value' in this search. Even
        // though the documentation says the 'value' function on UIAElement
        // returns a string, on the backend it can sometimes be a number
        // (e.g. 0 or 1 for a switch). If this happens, UIAutomation will
        // throw an exception since predicate keywords like CONTAINS and LIKE can
        // only be performed on a collection/string.
        return "name contains[c] '" + sel + "' || label contains[c] '" + sel + "'";
      }
    }

  , getElementById: function (sel) {
      var exactPred = this._getIdSearchPredicate(sel, true);
      var exact = $.mainApp().getFirstWithPredicateWeighted(exactPred);
      if (exact && exact.status === 0) {
        return exact;
      } else {
        var pred = this._getIdSearchPredicate(sel, false);
        return $.mainApp().getFirstWithPredicateWeighted(pred);
      }
    }

  , getElementsById: function (sel) {
      var pred = this._getIdSearchPredicate(sel, false);
      return $.mainApp().getAllWithPredicate(pred);
    }

  , elemForAction: function (elem, idx) {
      // mock out action functions to respond with the error
      var errRet = function () { return elem; };
      var noElemMock = {};
      var actions = ["tap", "isEnabled", "isValid", "isVisible", "value",
                     "name", "label", "setValue"];
      for (var i = 0; i < actions.length; i++) {
        noElemMock[actions[i]] = errRet;
      }
      if (elem.status === STATUS.Success.code) {
        if (typeof elem.value.ELEMENT === "undefined") {
          // we have an array of elements
          if (typeof elem.value[idx] === "undefined") {
            return {
              status: STATUS.NoSuchElement.code
            , value: null
            };
          } else {
            return this.getElement(elem.value[idx].ELEMENT);
          }
        } else {
          return this.getElement(elem.value.ELEMENT);
        }
      } else {
        return noElemMock;
      }
    }

  , _getElementsByType: function (type, ctx) {
      var selector = this.convertSelector(type);
      var elems = this.lookup(selector, ctx);

      return elems;
    }

  , getElementsByType: function (type, ctx) {
      var elems = this._getElementsByType(type, ctx);

      return this._returnElems($(elems));
    }

  , getElementByType: function (type, ctx) {
      var elems = this._getElementsByType(type, ctx);

      return this._returnFirstElem($(elems));
    }

  , getActiveElement: function () {
      return $($.mainWindow()).getActiveElement();
    }

  , getElementByUIAutomation: function (selectorCode, ctx) {
      var elems = this._getElementsByUIAutomation(selectorCode, ctx);
      return this._returnFirstElem($(elems));
    }
  , getElementsByUIAutomation: function (selectorCode, ctx) {
      var elems = this._getElementsByUIAutomation(selectorCode, ctx);
      return this._returnElems($(elems));
    }
  , _getElementsByUIAutomation: function (selectorCode, ctx) {
      /* jshint evil: true */
      var rootElement = this.mainWindow();

      if (typeof ctx === 'string') {
        rootElement = this.cache[ctx];
      } else if (typeof ctx !== 'undefined') {
        rootElement = ctx;
      }

      //There may not be a '.' at the beginning of the string, add for convenience
      if (selectorCode[0] !== '.') {
        selectorCode = '.' + selectorCode;
      }

      //convert the string we were given into the element we want
      var elems = eval("rootElement" + selectorCode);
      if (elems instanceof UIAElementNil) {
        return [];
      } else if (elems instanceof UIAElementArray) {
        //tricky: UIAutomation returns UIElementArray objects, not standard js array. Mechanic.js expects objects of type Array
        return elems.toArray();
      } else {
        return [elems];
      }
    }


  });

  $.extend($.fn, {
    getActiveElement: function () {
        var foundElement = null;
        var checkAll = function (element) {
          var children = $(element).children();
          children.each(function (e, child) {
            var focused = $(child).isFocused();
            if (focused === true || focused === 1) {
              return child;
            }
            if (child.hasChildren()) { // big optimization
              checkAll(child);
            }
          });

          return null;
        };
        // try $.cache in the array first
        for (var key in $.cache) {
          var elemFocused = $($.cache[key]).isFocused();
          if (elemFocused === true || elemFocused === 1) {
            return {
              status: STATUS.Success.code,
              value: {ELEMENT: key}
            };
          }
        }
        foundElement = checkAll(this);

        if (foundElement) {
          var varName = $(foundElement).name();
          return {
            status: STATUS.Success.code,
            value: {ELEMENT: varName}
          };
        }

        return {
          status: STATUS.NoSuchElement.code,
          value: null,
        };
      }
  });

})();
