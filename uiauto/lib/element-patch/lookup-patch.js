/* globals $ */

(function () {

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
