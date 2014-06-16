/* jshint ignore:start */
#import "../vendors/tuneup.js";
#import "../../../../../../uiauto/bootstrap.js";
/* jshint ignore:end */

test("getWithName", function(/*target, app*/) {
  var el = $.mainApp().getWithName('Name');
  assertNotNull(el);
});
