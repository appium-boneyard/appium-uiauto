# Appium-UIAuto rewrite

`uiauto` portion will remain as is, since it is run on the device, not in our ES6+ environment. What remains consists of three major parts:

1. Command Proxy:
      - acts as the bridge between `Appium` and the iOS UI Automation framework
      - will require significant async rewriting
      - two ends of the equation
            - `lib/uiauto-client.js` - should export `UIAutoClient`
            - `uiauto/lib/commands.js` - server. should be named more appropriately

2. Dynamic Bootstrap:
      - creates the bootstrap environment to be pushed onto the device
      - currently synchronous, but uses synchronized fs functions, and returns a Promise, so modify to async so we handle things in the same way

3. Dependency Resolver:
      - collates a dependency tree for the bootstrap app
      - needs to be renamed according to its functionality - `createScript` or somesuch
      - currently synchronous, but uses synchronized fs functions, so rewrite to async
      - the logic can remain the same since the code parsed is old-style

And, of course... tests.




This rewrite will pull in most of the iOS behavioural tests from Appium. This seems a good time to revisit our tests both in terms of organization and coverage.



Dependencies for moving tests out of Appium:

1. Requires a way to start/stop simulator and load app (appium-ios-simulator?).

2. Requires a way to start instruments with the bootstrap code (appium-instruments?).

3. Rethink our test organization
      - move from app-based organization to functionality-based. Find, action, etc. While it seems unlikely that we will have a new test app to test against by the time this happens, idealy at some point everything would be tested against a single app, and some of the initial complexity (e.g., having one test run against one app, and another test run against another) would go away.
      - This would be a good time to keep track of the desiderata for a new test app. What tests do we have that have no assertions because there is nothing appropriate to check for? What tests require going through a long setup to get to the place where the feature can be tested? Where is there unnecessary complexity that makes false negatives likely?
      - We currently have some cases where we test the same feature multiple times, and other features not at all. Reorganizing will allow us to merge tests, and make the holes more obvious.
