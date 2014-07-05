/* globals $, STATUS */

(function () {
  $.extend($, {

    // Alert-related functions
    getAlertText: function () {
      var alert = $.mainApp().alert();
      if (alert.isNil()) {
        return {
          status: STATUS.NoAlertOpenError.code,
          value: null
        };
      }

      var textRes = this.getElementsByType('text', alert);
      // If an alert does not have a title, alert.name() is null, use empty string
      var text = alert.name() || "";
      if (textRes.value.length > 1) {
        // Safari alerts have the URL as a title
        if (text.indexOf('http') === 0 || text === "") {
          textId = textRes.value[textRes.value.length - 1].ELEMENT;
          text = this.getElement(textId).name();
        } else {
          var textId = textRes.value[textRes.value.length - 2].ELEMENT;
          text = this.getElement(textId).name();
          textId = textRes.value[textRes.value.length - 1].ELEMENT;
          var subtext = this.getElement(textId).name();
          if (subtext !== null) {
            text = text + ' ' + subtext;
          }
        }
      }
      return {
        status: STATUS.Success.code,
        value: text
      };
    }

  , setAlertText: function (text) {
      var alert = $.mainApp().alert();
      var boxRes = this.getElementByType('textfield', alert);
      if (boxRes.status === STATUS.Success.code) {
        var el = this.getElement(boxRes.value.ELEMENT);
        el.setValueByType(text);
        return {
          status: STATUS.Success.code,
          value: true
        };
      }
      return {
        status: STATUS.ElementNotVisible.code,
        value: "Tried to set text of an alert that wasn't a prompt"
      };
    }

  , acceptAlert: function () {
      var alert = $.mainApp().alert();
      if (!alert.isNil()) {
        var acceptButton = alert.defaultButton();
        var buttonCount = alert.buttons().length;
        if (acceptButton.isNil() && buttonCount > 0) {
          // last button is accept
          acceptButton = alert.buttons()[buttonCount - 1];
        }

        acceptButton.tap();
        this.waitForAlertToClose(alert);
        return {
          status: STATUS.Success.code,
          value: null
        };
      } else {
        var ios7AlertButtons = this._getElementsByXpath("actionsheet/button");
        if (ios7AlertButtons.length > 0) {
          ios7AlertButtons[0].tap();
          return {
            status: STATUS.Success.code,
            value: null
          };
        } else {
          return {
            status: STATUS.UnknownError.code,
            value: null
          };
        }
      }
    }

  , alertIsPresent: function () {
      return {
        status: STATUS.Success.code,
        value: !$.mainApp().alert().isNil()
      };
    }

  , dismissAlert: function () {
      var alert = $.mainApp().alert();
      if (!alert.isNil() && !alert.cancelButton().isNil()) {
        alert.cancelButton().tap();
        this.waitForAlertToClose(alert);
        return {
          status: STATUS.Success.code,
          value: null
        };
      } else if (!alert.isNil() && alert.buttons().length > 0) {
        alert.buttons()[0].tap(); // first button is dismiss
        this.waitForAlertToClose(alert);
        return {
          status: STATUS.Success.code,
          value: null
        };
      } else {
        var ios7AlertButtons = this._getElementsByXpath("actionsheet/button");
        if (ios7AlertButtons.length > 0) {
          ios7AlertButtons[ios7AlertButtons.length - 1].tap();
          return {
            status: STATUS.Success.code,
            value: null
          };
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
          alert = $.mainApp().alert();
        }
      }
    }

  });
})();
