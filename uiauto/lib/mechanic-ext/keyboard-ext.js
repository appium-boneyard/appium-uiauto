/* globals $, errors */

(function() {
  $.extend($, {
    // Keyboard functions
    sendKeysToActiveElement: function (keys) {
      if (this.hasSpecialKeys(keys)) {
        return this.sendKeysToActiveElementSpecial(keys);
      } else {
        $.keyboard().typeString(keys);
      }
      return {
        status: errors.Success.code,
        value: null
      };
    }

  , hasSpecialKeys: function (keys) {
      var numChars = keys.length;
      for (var i = 0; i < numChars; i++)
        if (this.isSpecialKey(keys.charAt(i)))
          return true;
      return false;
    }

  , sendKeysToActiveElementSpecial: function (keys) {
      var numChars = keys.length;
      for (var i = 0; i < numChars; i++)
        this.typeKey(keys.charAt(i));
      return {
        status: errors.Success.code,
        value: null
      };
    }

    // handles some of the special keys in org.openqa.selenium.Keys
  , isSpecialKey: function (k) {
      if (k === '\uE003') // DELETE
        return true;
      else if (k === '\uE006' || k === '\uE007') // RETURN ENTER
        return true;
      return false;
    }

  , typeKey: function (k) {
      if (k === '\uE003') { // DELETE
        $.keyboard().keys().Delete.tap();
      } else if (k === '\uE006' || k === '\uE007') {// RETURN ENTER
        $.keyboard().typeString("\n");
      } else {
        $.keyboard().typeString(String(k)); // regular key
      }
    }

  , hideKeyboard: function (keyName) {
      if (keyName) {
        $.log("Hiding keyboard with keyName " + keyName);
        try {
          var keys = $.keyboard().buttons();
          keys[keyName].tap();
        } catch (e) {
          return {
            status: errors.NoSuchElement.code
          , value: "Could not find the '" + keyName + "' button, " +
                   "you're on your own for closing it!"
          };
        }
      } else if (!$.keyboard().isNil()) {
        $.log("Hiding keyboard using default method");
        var startY = $.keyboard().rect().origin.y - 10;
        var endY = $.mainWindow().rect().size.height - 10;
        this.flickApp(0, startY, 0, endY);
      } else {
        return {
          status: errors.NoSuchElement.code
        , value: "The keyboard was not present, not closing it"
        };
      }
    }
  });
})();
