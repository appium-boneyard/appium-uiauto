/* globals $, errors */

(function() {
  $.extend($, {
    cache: []
  , identifier: 0
  , _defaultContext: function(ctx) {
    if (typeof ctx === 'string') {
      return this.cache[ctx];
    } else if (typeof ctx !== 'undefined') {
      return ctx;
    } else {
      return $.mainApp();
    }
  }

  , _returnFirstElem: function (elems) {
      if (elems.length > 0) {
        var el = elems[0];
        var elid = this.getId(el);

        return {
          status: errors.Success.code,
          value: {'ELEMENT': elid }
        };
      } else {
        return {
          status: errors.NoSuchElement.code,
          value: errors.NoSuchElement.summary
        };
      }
    }

  , _returnElems: function (elems) {
      var results = [];
      elems.each(function (e, el) {
        var elid = this.getId(el);
        results.push({ELEMENT: elid});
      }.bind(this));

      return {
        status: errors.Success.code,
        value: results
      };
    }

  , convertSelector: function (selector) {
      // some legacy: be backwards compatible, mechanic.js
      switch (selector) {
        case 'tableView':
        case 'textField':
          selector = selector.toLowerCase();
          break;
        case 'staticText':
          selector = 'text';
          break;
        case 'tableCell':
          selector = 'cell';
          break;
        case 'secureTextField':
          selector = 'secure';
          break;
      }
      return selector;
    }

  , waitForPageLoad: function (secs) {
      var seconds = 30;
      if (secs) {
        seconds = parseInt(secs, 10);
      }

      $.target().pushTimeout(0);
      this.delay(100);

      var indicators = this.getWindowIndicators($.mainWindow());
      var done = false;
      var counter = 0;

      while ((!done) && (counter < seconds)) {
        var invisible = 0;

        for (var i = 0; i < indicators.length; i++) {
          $.log("[" + counter + "] waiting on " + indicators[i].type() + ": " +
              " visible: " + indicators[i].isVisible() +
              " parent: " + indicators[i].parent().type());

          if (indicators[i].isVisible() === 0 ||
              indicators[i].parent().isVisible() === 0 ||
              indicators[i].isVisible() === null) {
            invisible++;
          }
        }

        if (invisible === indicators.length) {
          done = true;
        }

        counter++;
        this.delay(1000);
      }

      $.target().popTimeout();
      if (!done) {
        // indicators never went away...
        $.log("WARNING: Waited for indicators to become non-visible but they never did, moving on");
        return {
          status: errors.UnknownError.code,
          value: "Timed out waiting on activity indicator."
        };
      }
      return {
        status: errors.Success.code,
        value: null
      };
    }
  });
})();
