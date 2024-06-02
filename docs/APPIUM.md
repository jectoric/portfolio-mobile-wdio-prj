# Appium Install
1. Use command `npm i -g appium`, check official [repo and docs](https://github.com/appium/appium)
2. Install `uiautomator2` by using command `appium driver install uiautomator2`

# Appium inspector setup
1. Download and install program from the [official repo](https://github.com/appium/appium-inspector)
2. Open, set next values
- Remote Host: `localhost`
- Remote Path: `/wd/hub`
- Remote Port: `4723`
3. Set desired capabilities (depends on your emulated device). Example:
```
{
  "platformName": "Android",
  "appium:platformVersion": "11.0",
  "appium:deviceName": "Pixel 6 API 30",
  "appium:automationName": "uiautomator2",
  "appium:app": "/Users/yourmac/portfolio-mobile-wdio-prj/app/Translate.apk",
  "appium:noReset": "true"
}
```
4. Use next commands in terminal to install `ANDROID_HOME` and `sdk` variables
```
export ANDROID_HOME=$HOME/Library/Android/sdk
PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools
```
5. Run appium server by using command `appium --base-path /wd/hub`
6. Run appium inspector