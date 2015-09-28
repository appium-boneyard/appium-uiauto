/* globals $, ERROR */

(function () {
  var getAlert = function () {
    var alert = $.mainApp().alert();
    if (alert.isValid()) return alert;
    alert = null;
    $('alert').forEach(function (_alert) {
      if (!alert && _alert.isValid()) alert = _alert;
    });
    return alert || $.nil;
  };

  $.extend($, {
    // Alert-related functions
    getAlertText: function () {
      var alert = getAlert();
      if (alert.isNil()) {
        throw new ERROR.NoAlertOpenError();
      }

      var texts = this.getElementsByType('text', alert);
      // If an alert does not have a title, alert.name() is null, use empty string
      var text = alert.name() || "";
      if (texts.length > 1) {
        // Safari alerts have the URL as a title
        if (text.indexOf('http') === 0 || text === "") {
          text = texts.last().name();
        } else {
          text = texts[texts.length - 2].name();
          var subtext = texts.last().name();
          if (subtext !== null) {
            text = text + ' ' + subtext;
          }
        }
      }
      return text;
    }

  , setAlertText: function (text) {
      var alert = getAlert();
      var el = this.getElementByType('textfield', alert);
      if (el) {
        el.setValueByType(text);
      } else {
        throw new ERROR.ElementNotVisible(
          "Tried to set text of an alert that wasn't a prompt");
      }
    }

  , acceptAlert: function () {
      var alert = getAlert();
      if (!alert.isNil()) {
        var acceptButton = alert.defaultButton();
        var buttonCount = alert.buttons().length;
        // iOS9.1 returns 'cancel' as the default button.
        if ((parseFloat($.systemVersion) >= 9.1 && buttonCount > 0) ||
            (acceptButton.isNil() && buttonCount > 0)) {
          // last button is accept
          acceptButton = alert.buttons()[buttonCount - 1];
        }
        acceptButton.tap();
        this.waitForAlertToClose(alert);
      } else {
        var ios7AlertButtons = this._getElementsByXpath("actionsheet/button");
        if (ios7AlertButtons.length > 0) {
          ios7AlertButtons[0].tap();
        } else {
          throw new ERROR.UnknownError();
        }
      }
    }

  , alertIsPresent: function () {
      return !getAlert().isNil();
    }

  , dismissAlert: function () {
      var alert = getAlert();
      if (!alert.isNil() && !alert.cancelButton().isNil()) {
        alert.cancelButton().tap();
        this.waitForAlertToClose(alert);
      } else if (!alert.isNil() && alert.buttons().length > 0) {
        alert.buttons()[0].tap(); // first button is dismiss
        this.waitForAlertToClose(alert);
      } else {
        var ios7AlertButtons = this._getElementsByXpath("actionsheet/button");
        if (ios7AlertButtons.length > 0) {
          ios7AlertButtons[ios7AlertButtons.length - 1].tap();
        } else {
          return this.acceptAlert();
        }
      }
    }

  , waitForAlertToClose: function (alert) {
      var isClosed = false
        , i = 0;
      while (!isClosed) {
        i++;
        if (alert.isNil()) {
          isClosed = true;
        } else if (i > 10) {
          // assume another alert popped up
          $.debug("Waited for a while and alert didn't close, moving on");
          isClosed = true;
        } else {
          $.debug("Waiting for alert to close...");
          this.delay(300);
          alert = getAlert();
        }
      }
    }

  });
})();
