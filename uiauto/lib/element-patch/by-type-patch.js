/* globals $ */

(function () {

  function _getElementsByType(current, type, foundEls, isParent) {
    if (!isParent && current.isType(type)) {
      var isDuplicate = false;
      if (type.match(/textfield$/i)) {
        // fixing duplicated text fields
        $.each(current.elements(), function (idx, child) {
          isDuplicate = isDuplicate || child.isType(type) && child.name() === current.name();
        });
      }
      if (!isDuplicate) foundEls.push(current);
    }
    $.each(current.elements(), function (idx, child) {
      _getElementsByType(child, type, foundEls, false);
    });
  }

  UIAElement.prototype.getElementsByType = function (type) {
    var foundEls = [];
    _getElementsByType(this, type, foundEls, true);
    return foundEls;
  };

})();
