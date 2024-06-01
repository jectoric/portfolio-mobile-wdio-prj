import { step } from '@reporter/AllureDecorators';

export default class ScreenActions {
    private selector: string;
    private timeout: number;

    constructor(selector: string, timeout = 10) {
        this.selector = selector;
        this.timeout = timeout;
    }

    //-----------------------------------------------------------
    // MOBILE ELEMENTS INTERACTION BASIC METHODS
    //-----------------------------------------------------------

    private async getWdioElement(): Promise<WebdriverIO.Element> {
        return browser.$(this.selector);
    }

    //-----------------------------------------------------------
    // MOBILE ELEMENTS INTERACTION ADVANCED METHODS
    //-----------------------------------------------------------

    /**
     * This function checks if an element is displayed within a specified timeout.
     * @param {Number} timeout - Time to wait for the element to be displayed (in seconds).
     * @returns {Promise<boolean>} - True if the element is displayed, false otherwise.
     */
    @step(`isDisplayed`)
    public async isDisplayed(timeout = this.timeout): Promise<boolean> {
        try {
            const element = await this.getWdioElement();
            await element.waitForDisplayed({
                timeout: timeout * 1000,
            });
            return true;
        } catch (error) {
            console.log(`Selector '${this.selector}' is not displayed after '${timeout}' sec!`);
            return false;
        }
    }

    /**
     * This function checks if an element is displayed within a specified timeout and throws an error if not.
     * @param {Number} timeout - Time to wait for the element to be displayed (in seconds).
     * @param {String} customMessage - Custom error message to be thrown if the element is not displayed.
     * @returns {Promise<WebdriverIO.Element>} - The displayed element.
     * @throws {Error} - If the element is not displayed after the timeout.
     */
    @step('checkIsDisplayed')
    public async checkIsDisplayed(timeout = this.timeout, customMessage?: string): Promise<WebdriverIO.Element> {
        if (await this.isDisplayed(timeout)) {
            return await this.getWdioElement();
        } else {
            const errorMessage = customMessage ? customMessage : `Element '${this.selector}' is not displayed after '${timeout}' sec!`;
            throw new Error(errorMessage);
        }
    }

    /**
     * This function checks if an element has disappeared within a specified timeout.
     * @param {Number} timeout - Time to wait for the element to disappear (in seconds).
     * @returns {Promise<void>}
     * @throws {Error} - If the element is still displayed after the timeout.
     */
    @step(`checkIsDisappeared`)
    public async checkIsDisappeared(timeout = this.timeout): Promise<void> {
        try {
            await browser.waitUntil(
                async () => !(await this.isDisplayed(0.1)),
                {
                    timeout: timeout * 1000,
                    timeoutMsg: `Element '${this.selector}' is still displayed after '${timeout}' sec!`,
                    interval: 1000,
                }
            );
        } catch (error: any) {
            const customErrorMessage = `Element '${this.selector}' is still displayed after '${timeout}' sec! `;
            throw new Error(`${customErrorMessage}Caught Error Details: ${error.message}`);
        }
    }

    /**
     * This function types the specified text into an element after ensuring it is present.
     * @param {String} text - The text to be typed into the element.
     * @returns {Promise<void>}
     */
    @step(`type`)
    async type(text: string): Promise<void> {
        const element = await this.checkElementPresence();
        await element.clearValue();
        await element.setValue(text);
    }

    /**
     * This function checks if an element is present within a specified timeout.
     * @param {Number} timeout - Time to wait for the element to be present (in seconds).
     * @returns {Promise<boolean>} - True if the element is present, false otherwise.
     */
    @step(`isPresent`)
    async isPresent(timeout = this.timeout): Promise<boolean> {
        try {
            const element = await this.getWdioElement();
            await element.waitForExist({ timeout: timeout * 1000 });
            console.log(`Element '${this.selector}' is present`);
            return true;
        } catch (error) {
            console.log(`Element '${this.selector}' is not present, return False`);
            return false;
        }
    }

    /**
     * This function checks if an element is present within a specified timeout and throws an error if not.
     * @param {String} customErrorMessage - Custom error message to be thrown if the element is not present.
     * @param {Number} timeout - Time to wait for the element to be present (in seconds).
     * @returns {Promise<WebdriverIO.Element>} - The present element.
     * @throws {Error} - If the element is not present after the timeout.
     */
    @step(`checkElementPresence`)
    async checkElementPresence(customErrorMessage?: string, timeout = this.timeout): Promise<WebdriverIO.Element> {
        const isElementPresent = await this.isPresent(timeout);

        if (!isElementPresent) {
            const errorMessage = `Element with selector "${this.selector}" is not present after '${timeout}' sec! ${customErrorMessage ? customErrorMessage : ''}`;
            throw new Error(errorMessage);
        }

        return this.getWdioElement();
    }

    /**
     * This function clicks on an element after ensuring it is present and clickable within a specified timeout.
     * @param {Number} timeout - Time to wait for the element to be clickable (in seconds).
     * @param {String} customErrorMessage - Custom error message to be thrown if the element is not clickable.
     * @param {any} clickOptions - Options for the click action.
     * @returns {Promise<void>}
     */
    @step(`click`)
    async click(timeout = this.timeout, customErrorMessage?: string, clickOptions?: any): Promise<void> {
        await this.checkElementPresence(customErrorMessage, timeout);
        const element = await this.getWdioElement();
        element.waitForClickable({ timeout });
        return await element.click(clickOptions);
    }

    /**
     * This function performs a long tap on an element.
     * @param {Number} duration - Duration of the long tap (in seconds).
     * @returns {Promise<void>}
     */
    @step(`longTap`)
    async longTap(duration = 2): Promise<void> {
        const element = await this.getWdioElement();
        await element.touchAction([
            'press',
            { action: 'wait', ms: duration * 1000 },
            'release'
        ]);
    }

    /**
     * This function gets the text content of an element after ensuring it is displayed.
     * @param {Number} timeout - Time to wait for the element to be displayed (in seconds).
     * @returns {Promise<string>} - The text content of the element.
     */
    @step(`getText`)
    async getText(timeout = this.timeout): Promise<string> {
        const element = await this.checkIsDisplayed(timeout);
        return element.getText();
    }

    /**
     * This function gets the value of an element after ensuring it is present.
     * @param {Number} timeout - Time to wait for the element to be present (in seconds).
     * @returns {Promise<string>} - The value of the element.
     */
    @step(`getValue`)
    async getValue(timeout = this.timeout): Promise<string> {
        const element = await this.checkElementPresence('Please try with another selector', timeout);
        return element.getValue();
    }

    /**
     * This function gets the value of a specified attribute of an element after ensuring it is present.
     * @param {String} attribute - The attribute whose value is to be retrieved.
     * @param {Number} timeout - Time to wait for the element to be present (in seconds).
     * @returns {Promise<string>} - The value of the specified attribute.
     */
    @step(`getAttributeValue`)
    async getAttributeValue(attribute: string, timeout = this.timeout): Promise<string> {
        const element = await this.checkElementPresence('Please try with another selector', timeout);
        return element.getAttribute(attribute);
    }
}
