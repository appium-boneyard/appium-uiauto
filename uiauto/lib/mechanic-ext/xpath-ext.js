/* globals $, STATUS */

(function () {
  $.extend($, {
    _getNodeIndex: function (seg) {
      var index = /\[(\d+|last\(\))\]/;
      var match = index.exec(seg);
      if (match) {

        if (match[1].indexOf("last") !== -1) {
          return -1; // last() is internally an index of -1
        }

        // -1 is an invalid index when supplied by the user.
        // set to 0 which is always invalid so _parseXpath returns false
        var idx = parseInt(match[1], 10);
        if (idx < 1) {
          idx = 0;
        }

        return idx;
      }
      return null;
    }

  , _getXpathSearchMethod: function (pathSeg, root) {
      if (typeof root === "undefined") {
        root = false;
      }
      if (root && pathSeg[0] !== "/") {
        return "desc";
      }
      if (pathSeg.substr(0, 2) === "//") {
        return "desc";
      }
      return "child";
    }

  , _getXpathExtPath: function (matchedExt) {
      var path = [];
      if (matchedExt) {
        // first split on '//'
        matchedExt = matchedExt.replace(/\//g, "|/");
        matchedExt = matchedExt.replace(/\|\/\|\//g, "|//");
        var splits = matchedExt.split("|");
        for (var i = 0; i < splits.length; i++) {
          if (splits[i] !== "") {
            path.push({
              node: splits[i].replace(/\/+/, '').replace(/\[\d+\]/, '')
            , search: this._getXpathSearchMethod(splits[i])
            , index: this._getNodeIndex(splits[i])
            });
          }
        }
      }
      return path;
    }

  , _parseXpath: function (xpath) {
      // e.g. "//button" or "button" or "/button"
      var index = "(\\[(?:\\d+|last\\(\\))\\])?";
      var root = "^(/?/?(?:[a-zA-Z.]+|\\*)" + index + ")";
      var ext = "((//?[a-zA-Z.]+" + index + ")*)"; // e.g. "/text" or "/cell//button/text"
      var attrEq = "(@[a-zA-Z0-9_]+=[^\\]]+)"; // e.g. [@name="foo"]
      // e.g. [contains(@name, "foo")]
      var attrContains = "(contains\\(@[a-zA-Z0-9_]+, ?[^\\]]+\\))";
      var attr = "(\\[(" + attrEq + "|" + attrContains + ")\\])?$";
      var xpathRe = new RegExp(root + ext + attr); // all together now
      var match = xpathRe.exec(xpath);
      if (match) {
        var matchedRoot = match[1]
          , matchedExt = match[3]
          , matchedAttrEq = match[8]
          , matchedContains = match[9]
          , attrName = null
          , attrConstraint = null
          , substrMatch = false
          , path = []
          , rootSearch = this._getXpathSearchMethod(matchedRoot, true)
          , parts = null;
        path.push({
          node: matchedRoot.replace(/\/+/, '').replace(/\[\d+\]/, '').replace(/\[last\(\)\]/, '')
        , search: rootSearch
        , index: this._getNodeIndex(matchedRoot)
        });
        path = path.concat(this._getXpathExtPath(matchedExt));
        if (matchedAttrEq || matchedContains) {
          if (matchedAttrEq) {
            parts = matchedAttrEq.split("=");
            attrName = parts[0].substr(1);
          } else if (matchedContains) {
            substrMatch = true;
            parts = matchedContains.split(",");
            attrName = parts[0].substr(10);
            parts[1] = parts[1].substr(0, parts[1].length - 1);
            parts[1] = parts[1].replace(/^ /, '');
          }
          if (parts[1][0] === "'" || parts[1][0] === '"') {
            attrConstraint = parts[1].substr(1, parts[1].length - 2);
          } else {
            attrConstraint = parts[1];
          }
        }

        // ensure we're using 1-indexing
        for (var i = 0; i < path.length; i++) {
          if (path[i].index !== null && path[i].index < 1 && path[i].index !== -1) {
            return false;
          }
        }
        var ret = {
          path: path
        , attr: attrName
        , constraint: attrConstraint
        , substr: substrMatch
        };
        return ret;
      } else {
        return false;
      }
    }

  , _getElementsByXpath: function (xpath, ctx) {
      var _ctx = $.mainApp()
        , elems = [];

      if (typeof ctx === 'string') {
        _ctx = this.cache[ctx];
      } else if (typeof ctx !== 'undefined') {
        _ctx = ctx;
      }

      var xpObj = this._parseXpath(xpath);
      if (xpObj === false) {
        return {
          status: STATUS.XPathLookupError.code
        , value: null
        };
      } else {
        $.target().pushTimeout(0);
        elems = $(_ctx);
        for (var i = 0; i < xpObj.path.length; i++) {
          var path = xpObj.path[i];
          path.node = this.convertSelector(path.node);
          var nodes = [path.node];
          if (path.node === "textfield") {
            nodes.push("secure");
          }
          var nodeElems = [];
          for (var j = 0; j < nodes.length; j++) {
            if (path.search === "child") {
              nodeElems = nodeElems.concat(elems.children(nodes[j]));
            } else if (path.search === "desc") {
              nodeElems = nodeElems.concat(elems.find(nodes[j]));
            }
          }
          elems = $(nodeElems);
          if (path.index !== null) {
            // index of -1 means last()
            var idx = path.index === -1 ? elems.length - 1 : path.index - 1;
            elems = $(elems[idx]); // xpath is 1-indexed
          }
          if (i === xpObj.path.length - 1 && xpObj.attr) {
            var attrs = [xpObj.attr];
            if (xpObj.attr === "text" || xpObj.attr === "name") {
              // if we're searching by text, alias to label and value too
              attrs.push("label");
              attrs.push("value");
            }
            if (xpObj.attr === "name") {
              attrs.push("text");
            }
            // last run, need to apply attr filters if there are any
            var filteredElems = [];
            for (j = 0; j < attrs.length; j++) {
              if (xpObj.substr) {
                filteredElems = filteredElems.concat(elems.valueInKey(attrs[j], xpObj.constraint));
              } else {
                filteredElems = filteredElems.concat(elems.valueForKey(attrs[j], xpObj.constraint));
              }
            }
            elems = $(filteredElems).dedup();
          }
        }
        $.target().popTimeout();
        return elems;
      }
    }

  , getElementsByXpath: function (xpath, ctx) {
      return this._returnElems(this._getElementsByXpath(xpath, ctx));
    }

  , getElementByXpath: function (xpath, ctx) {

      var results = this.getElementsByXpath(xpath, ctx);

      if (results.value === null || results.value.length < 1) {
        return {
          status: STATUS.NoSuchElement.code,
          value: null
        };
      } else {
        var result = results.value[0];
        for (var a = 0, len = results.value.length; a < len; a++) {
          var elId = results.value[a].ELEMENT;
          var elVis = this.getElement(elId).isVisible();
          if (elVis === 1) {
            result = results.value[a];
            break;
          }
        }
        return {
          status: STATUS.Success.code,
          value: result
        };
      }
    }

  , _getElementByIndexPath: function (path, ctx) {
      if (typeof ctx === "undefined") {
        ctx = $.mainApp();
      }
      var pathRegex = new RegExp("^/[0-9]+(/[0-9]+)*$");
      if (!pathRegex.test(path)) {
        throw new Error("Path " + path + " was not a valid index path");
      }
      // Throw away the empty path and the initial /X since that refers to ctx
      var pathSet = path.split("/").slice(2);
      var foundElement = ctx;
      for (var i = 0; i < pathSet.length; i++) {
        foundElement = foundElement.elements()[pathSet[i]];
        if (foundElement.isNil()) {
          throw new Error("Could not find element with path " + path);
        }
      }
      return foundElement;
    }

  , _handleIndexPathError: function (err, many) {
      if (err.message.indexOf("Could not find") !== -1) {
        return {
          status: many ?
                  STATUS.StaleElementReference.code :
                  STATUS.NoSuchElement.code,
          value: err.message
        };
      } else {
        return {
          status: STATUS.UnknownError.code,
          value: err.message
        };
      }
    }

  , getElementByIndexPath: function (path, ctx) {
      $.target().pushTimeout(0);
      var ret;
      try {
        var elem = this._getElementByIndexPath(path, ctx);
        ret = this._returnFirstElem($([elem]));
      } catch (err) {
        ret = this._handleIndexPathError(err, false);
      }
      $.target().popTimeout();
      return ret;
    }

  , getElementsByIndexPaths: function (paths, ctx) {
      var elems = [];
      var ret = null;
      $.target().pushTimeout(0);
      for (var i = 0; i < paths.length; i++) {
        try {
          elems.push(this._getElementByIndexPath(paths[i], ctx));
        } catch (err) {
          ret = this._handleIndexPathError(err, true);
          break;
        }
      }
      if (ret === null) {
        $.each(elems,function (i, elem) {
          $(elem).log();
        });
        ret = this._returnElems($(elems));
      }
      $.target().popTimeout();
      return ret;
    }

  });
})();
