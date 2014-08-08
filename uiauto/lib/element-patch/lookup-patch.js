/* globals $ */

(function () {

  UIAElement.prototype._elementOrElementsByType = function (opts) {
    var typeArray   = opts.typeArray,
        onlyFirst   = opts.onlyFirst,
        onlyVisible = opts.onlyVisible,
        nameObject  = opts.name,
        labelObject = opts.label,
        valueObject = opts.value;

    if (!typeArray) throw new Error("Must provide typeArray when calling _elementOrElementsByType");

    var numTypes = typeArray.length;
    onlyFirst = onlyFirst === true;
    onlyVisible = onlyVisible !== false;

    var validateObject = function (objectName, object) {
      if (object && (typeof object.substring   === "undefined" ||
                     typeof object.target      === "undefined" ||
                     typeof object.insensitive === "undefined")) {
        throw new Error(objectName + " object must contain substring, target, and insensitive");
      }
    };

    validateObject("name", nameObject);
    validateObject("label", labelObject);
    validateObject("value", valueObject);

    var target = $.target();
    target.pushTimeout(0);

    var attributeMatch = function (elementProperty, attributeObject) {
      if (!elementProperty || !attributeObject) return false;

      var target = attributeObject.target;
      if (!target) return false;
      if (attributeObject.insensitive) {
        elementProperty = elementProperty.toLowerCase();
        target = target.toLowerCase();
      }
      if (attributeObject.substring) {
        return elementProperty.indexOf(target) !== -1;
      } else {
        return elementProperty === target;
      }
    };

    var getTree = function (element) {
      var elems = [];
      // element.elements() may return nil children.
      if (element.isNil()) {
        return elems;
      }
      // process element
      var visible = element.isVisible() === 1;
      var elType = element.type();
      for (var i = 0; i < numTypes; i++) {
        if (elType === typeArray[i]) {
          if (!onlyVisible || visible) {
            // if an object isn't provided then it's a match.
            var nameMatch  = nameObject  ? attributeMatch(element.name(),  nameObject)  : true;
            var labelMatch = labelObject ? attributeMatch(element.label(), labelObject) : true;
            var valueMatch = valueObject ? attributeMatch(element.value(), valueObject) : true;

            if (nameMatch && labelMatch && valueMatch && element.checkIsValid()) {
              elems.push(element);
            }

            if (onlyFirst && elems.length === 1) return elems;
            break;
          }
        }
      }

      if (element.hasChildren()) {
        var children = element.elements();
        var numChildren = children.length;
        for (i = 0; i < numChildren; i++) {
          if (onlyFirst && elems.length === 1) return elems;
          elems = elems.concat(getTree(children[i]));
        }
      }

      return elems;
    };

    var foundElements = getTree(this);
    target.popTimeout();

    return $.smartWrap(foundElements).dedup();
  };

  UIAElement.prototype.getFirstWithPredicateWeighted = function (predicate) {
    var weighting = [
        'secureTextFields'
      , 'textFields'
      , 'buttons'
      , 'elements'
    ];
    var elems = this._elementOrElementsWithPredicateWeighted(predicate,
                  weighting, true);
    return $.smartWrap(elems).dedup()[0];
  };

  UIAElement.prototype.getFirstWithPredicate = function (predicate, onlyVisible) {
    var weighting = ['elements'];
    var elems = this._elementOrElementsWithPredicateWeighted(
                  predicate, weighting, true, onlyVisible);
    return $.smartWrap(elems).dedup()[0];
  };

  UIAElement.prototype.getAllWithPredicate = function (predicate, onlyVisible) {
    var weighting = ['elements'];
    var elems = this._elementOrElementsWithPredicateWeighted(predicate, weighting, false, onlyVisible);
    return $.smartWrap(elems).dedup();
  };

  UIAElement.prototype._elementOrElementsWithPredicateWeighted = function (predicate, weighting, onlyFirst, onlyVisible) {
    weighting = weighting || ['elements'];
    onlyFirst = (onlyFirst === true);
    onlyVisible = onlyVisible !== false;

    UIATarget.localTarget().pushTimeout(0);

    var results = [];
    var element = this;
    var found;
    $.each(weighting, function (idx, prop) {
      if (typeof element[prop] === 'function') {
        found = element[prop]();
        if (predicate) found = found.withPredicate(predicate);
        if (onlyVisible) found = found.withValueForKey(true, 'isVisible');
      } else {
        throw new Error("Invalid function '" + prop + "'");
      }

      if (found.isValid()) {
        results = results.concat(found.toArray());
      }

      // If we don't find anything or if we aren't just trying to find the first
      // match, keep looking. Otherwise exit the loop.
      return (!onlyFirst || results.length === 0);
    });

    // Only look through children if we have to.
    if (!onlyFirst || results.length === 0) {
      var child;
      for (var a = 0, len = this.elements().length; a < len; a++) {
          child = this.elements()[a];
          results = results.concat(child
                      ._elementOrElementsWithPredicateWeighted(predicate,
                        weighting, onlyFirst, onlyVisible));
      }
    }

    UIATarget.localTarget().popTimeout();

    return results;
  };

  UIAElement.prototype.getWithName = function (targetName, onlyVisible) {
    return this.getFirstWithPredicate("name == '" + targetName + "' || label == '" + targetName + "'", onlyVisible);
  };

  UIAElement.prototype.getAllWithName = function (targetName, onlyVisible) {
    return this.getAllWithPredicate("name == '" + targetName + "' || label == '" + targetName + "'", onlyVisible);
  };

  UIAElement.prototype.getNameContains = function (targetName, onlyVisible) {
    return this.getFirstWithPredicate("name contains[c] '" + targetName + "' || label contains[c] '" + targetName + "'", onlyVisible);
  };

  UIAElement.prototype.getAllNameContains = function (targetName, onlyVisible) {
    return this.getAllWithPredicate("name contains[c] '" + targetName + "' || label contains[c] '" + targetName + "'", onlyVisible);
  };

})();
