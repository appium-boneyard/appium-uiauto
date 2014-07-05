/* globals $, STATUS */

(function () {
  UIAElement.prototype.setValueByType = function (newValue) {
    var type = this.type();

    if (type === "UIATextField" || type === "UIASecureTextField" ||
        type === "UIATextView" || type === "UIASearchBar") {
      // do the full-on clear,keyboard typing operation
      this.setValue("");
      if (this.hasKeyboardFocus() === 0) {
        this.tap();
      }
      if (isAccented(newValue)) {
        this.setValue(newValue);
      } else {
        $.sendKeysToActiveElement(newValue);
      }
    } else if (type === "UIAPickerWheel") {
      this.selectValue(newValue);
    } else if (type === "UIASlider") {
      this.dragToValue(parseFloat(newValue));
    } else if (type === "UIAPageIndicator") {
      this.selectPage(parseInt(newValue, 10));
    } else {
      this.setValue(newValue);
    }
  };

  var isAccented = function (value) {
    for (var i = 0; i < value.length; i++) {
      var c = value.charCodeAt(i);
      if (c > 127) {
        // this is not simple ascii
        if (c >= parseInt("E000", 16) && c <= parseInt("E040", 16)) {
          // Selenium uses a Unicode PUA to cover certain special characters
          // see https://code.google.com/p/selenium/source/browse/java/client/src/org/openqa/selenium/Keys.java
          return false;
        }

        return true;
      }
    }

    return false;
  };

  UIAElement.prototype.type = function () {
    var type = this.toString();
    return type.substring(8, type.length - 1);
  };

  UIAElement.prototype.isDuplicate = function () {
    var res = false;
    var type = this.type();
    if (type.match(/textfield$/i)) {
      var parent = this.parent();
      res = parent &&  parent.type() === type &&
        parent.name() === this.name();
    }
    return res;
  };

  UIAElement.prototype.hasChildren = function () {
    var type = this.type();
    // NOTE: UIALink/UIAImage/UIAElement can have children
    return !(type === "UIAStaticText" || type === "UIATextField" ||
             type === "UIASecureTextField" || type === "UIAButton" ||
             type === "UIASwitch" || type === "UIAElementNil");
  };

  UIAElement.prototype.text = function () {
    var type = this.type();
    if (type === "UIAButton") {
      return this.label();
    } else {
      return this.value();
    }
  };

  UIAElement.prototype.matchesTagName = function (tagName) {
    var type = this.type();
    // i.e. "UIALink" matches "link:
    return type.substring(3).toLowerCase() === tagName.toLowerCase();
  };

  UIAElement.prototype.matchesBy = function (tagName, text) {
    if (!this.matchesTagName(tagName))
      return false;
    if (text === '')
      return true;
    var name = this.name();
    if (name)
      name = name.trim();
    if (name === text)
      return true;
    var value = this.value();
    if (value)
      value = String(value).trim();
    return value === text;
  };

  UIAElement.prototype.getElementLocation = function () {
    return {
      status: STATUS.Success.code,
      value: this.rect().origin
    };
  };

  UIAElement.prototype.getElementSize = function () {
    return {
      status: STATUS.Success.code,
      value: this.rect().size
    };
  };

  UIAElement.prototype.isDisplayed = function () {
    return {
      status: STATUS.Success.code,
      value: this.isVisible() === 1
    };
  };

  UIAElement.prototype.isSelected = function () {
    return {
      status: STATUS.Success.code,
      value: this.value() === 1
    };
  };

})();

