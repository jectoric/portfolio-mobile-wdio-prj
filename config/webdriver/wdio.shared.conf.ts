import 'dotenv/config';
import { WebDriverLogTypes } from '@wdio/types/build/Options';
import { addJiraTicketToDescription } from "@reporter/AllureDecorators";
import { generateAllureReport, removeAllureDirectories } from '@reporter/AllureReporter';

const logLevel = (process.env.LOG_LVL || 'silent') as WebDriverLogTypes;

export const config: WebdriverIO.Config = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true,
        },
    },

    specFileRetries: Number(process.env.RETRIES) || 0,

    maxInstances: Number(process.env.MAX_INSTANCES) || 1,
    logLevels: {
        webdriver: logLevel,
    },
    capabilities: [],
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    suites: {
        google_translate_all: [`./google-translate-autotests/**/**/*.spec.ts`],
        google_translate_functional: [`./google-translate-autotests/functional-autotests/**/*.spec.ts`],
        google_translate_non_functional: [`./google-translate-autotests/non-functional-autotests/**/*.spec.ts`],
    },

    reporters: [
        ['spec', {
            symbols: {
                passed: '[PASS]',
                failed: '[FAIL]',
            },
            onlyFailures: true,
            addConsoleLogs: true,
            realtimeReporting: true,
            showPreface: false,
        }],
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 5 * 60 * 1000, // 5min
    },

    async onPrepare() {
        removeAllureDirectories();
    },

    async beforeTest(test) {
        const testName = test.title;
        if (testName.includes('[BUG => ')) {
            const bugMatch = testName.match(/\[BUG => (\S+)]/);
            if (bugMatch) addJiraTicketToDescription(bugMatch[1]);
        }
    },

    async onComplete() {
        await generateAllureReport();
    }
};
