/* globals $ */

(function () {
  var delaySec = $.delay;
  $.extend($, {
    system: function () { return UIATarget.localTarget().host(); }
    , target: function () { return UIATarget.localTarget(); }
    , mainWindow: function () { return UIATarget.localTarget().frontMostApp().mainWindow(); }
    , mainApp: function () { return UIATarget.localTarget().frontMostApp(); }
    , keyboard: function () { return UIATarget.localTarget().frontMostApp().keyboard(); }
    , bundleId: function ()  { return UIATarget.localTarget().frontMostApp().bundleID(); }
    // overriding existing delay
    , delay: function (ms) { delaySec.call(this, ms/1000); }
    , logTree: function () {$($.mainApp()).logTree();}
    , debug: function (s) { if ($.isVerbose) UIALogger.logDebug(s); }
  });
})();
