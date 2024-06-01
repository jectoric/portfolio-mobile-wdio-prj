import { join } from 'path';
import { config as sharedConf } from './wdio.shared.conf';

export const config: WebdriverIO.Config = {
    ...sharedConf,
    port: 4723,
    services: ['appium'],
    capabilities: [{
        'appium:platformName': process.env.PLATFORM_NAME || '',
        'appium:deviceName': process.env.DEVICE_NAME || '',
        'appium:platformVersion': process.env.PLATFORM_VERSION || '',
        'appium:automationName': process.env.PLATFORM_NAME === 'ios' ? 'XCUITest' : 'UIAutomator2',
        'appium:udid': process.env.UDID || '',
        'appium:orientation': 'PORTRAIT',
        'appium:app': join(process.cwd(), `./apps/${process.env.PLATFORM_NAME}/${process.env.APP}`),
        'appium:newCommandTimeout': 300,
        'appium:autoAcceptAlerts': true,
        "appium:disableIdLocatorAutocompletion": true
    },]
};