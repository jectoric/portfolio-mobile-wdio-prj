import Elem from '@utils/Elem';
import { step } from '@reporter/AllureDecorators';
import { ScreenInterface } from '@screens/ApplicationScreens';

class MainScreen implements ScreenInterface<MainScreen> {

    //-----------------------------------------------------------
    // SELECTORS
    //-----------------------------------------------------------

    /* Start screen selectors
    -----------------------------------------------------------*/
    private get transalteHeaderText() { return new Elem('selector'); }
    private get enterTextField() { return new Elem('selector'); }

    /* Enter text screen selectors
    -----------------------------------------------------------*/
    private translatedTextField(expectedText: string) { return new Elem(`${expectedText}`); }
    private get crossButton() { return new Elem('selector'); }
    private get backButton() { return new Elem('selector'); }
    private get enterTextCaption() { return new Elem('selector'); }

    /* Languages panel selectors
    -----------------------------------------------------------*/
    private get switchLanguagesButton() { return new Elem('selector'); }
    private translateFromLanguage(language: string) { return new Elem(`${language}`); }
    private translateToLanguage(language: string) { return new Elem(`${language}`); }

    //-----------------------------------------------------------
    // STEP FUNCTIONS
    //-----------------------------------------------------------

    @step('Check main screen is opened')
    public async checkIsOpened(): Promise<MainScreen> {
        await this.transalteHeaderText.checkElementPresence('Main Google Translate screen was not opened!');
        return this;
    }

    @step('Click on the "Enter Text" field and enter text')
    public async enterText(text: string): Promise<void> {
        await this.enterTextField.click();
        await this.enterTextField.type(text);
    }

    @step('Check translated text')
    public async checkTransaltedText(translatedText: string): Promise<void> {
        await this.translatedTextField(translatedText).checkElementPresence();
    }

    @step('Check translated text')
    public async clickBackButton(): Promise<void> {
        await this.backButton.click();
    }

    @step('Click cross text button')
    public async clickCrossButton(): Promise<void> {
        await this.crossButton.click();
    }

    @step('Check empty text caption')
    public async checkEnterTextCaption(): Promise<void> {
        await this.enterTextCaption.click();
    }

    /* Languages panel functions
    -----------------------------------------------------------*/
    @step('Check selected languages')
    public async checkSelectedLanguages(translateFrom: string, translateTo: string): Promise<void> {
        await this.translateFromLanguage(translateFrom).checkElementPresence();
        await this.translateToLanguage(translateTo).checkElementPresence();
    }

    @step('Click on the switch languages button')
    public async clickSwitchLanguagesButton(): Promise<void> {
        await this.switchLanguagesButton.click();
    }
}

export default new MainScreen();
