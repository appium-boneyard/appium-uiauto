/* globals $, ERROR */

(function () {
  $.extend($, {
    // Keyboard functions
    sendKeysToActiveElement: function (keys) {
      if (this.hasSpecialKeys(keys)) {
        return this.sendKeysToActiveElementSpecial(keys);
      } else {
        $.keyboard().typeString(keys);
      }
    }

  , hasSpecialKeys: function (keys) {
      var numChars = keys.length;
      for (var i = 0; i < numChars; i++){
        if (this.isSpecialKey(keys.charAt(i)))
          return true;
      }
      return false;
    }

  , sendKeysToActiveElementSpecial: function (keys) {
      var numChars = keys.length;
      for (var i = 0; i < numChars; i++){
        this.typeKey(keys.charAt(i));
      }
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

  , hideKeyboard: function (strategy, keyName) {
      var tapOutside = function () {
        $($.mainWindow()).tap();
        $.delay(1000);
      };
      switch (strategy) {
        case 'press':
        case 'pressKey':
          $.debug("Hiding keyboard by pressing the key: " + keyName);
          try {
            var keys = $.keyboard().buttons();
            keys[keyName].tap();
          } catch (e) {
            throw new ERROR.NoSuchElement(
              "Could not find the '" + keyName + "' key.");
          }
          $.delay(1000);
          break;
        case 'tapOut':
        case 'tapOutside':
          tapOutside();
          break;
        case 'default':
          tapOutside();
          break;
        default:
          throw new Error('Unknown strategy: ' + strategy);
      }
    }
  });
})();
