/* globals $, ERROR */

(function () {
  $.extend($, {
    back: function () {
      var bar = $.mainWindow().navigationBar();
      var button = null;
      var buttons = bar.buttons();
      if (buttons.length === 1) {
        button = buttons[0];
      } else {
        button = buttons.Back;
        if (button.type() === 'UIAElementNil') button = buttons[0];
      }
      try {
        button.tap();
      } catch (e) {
        try {
          // Press "Cancel" on Apptentive
          UIATarget.localTarget().frontMostApp().windows()[0].toolbar().buttons()[0].tap();
        } catch (e) {
          throw new ERROR.UnknownError("Back button is null and can't be tapped.");
        }
      }
    }

  , lock: function (secs) {
      var seconds = parseInt(secs, 10);
      return $.target().lockForDuration(seconds);
    }

  , background: function (secs) {
      var seconds = parseInt(secs, 10);
      return $.target().deactivateAppForDuration(seconds);
    }

    // Obtaining Device Property Information like Name, OS ver, Model etc
  , getDeviceDetail: function () {
      return {
        deviceName: UIATarget.localTarget().name()
      , deviceModel: UIATarget.localTarget().model()
      , systemName: UIATarget.localTarget().systemName()
      , systemVersion: UIATarget.localTarget().systemVersion()
      };
    }
  });
})();
