import assert from 'assert';
import Elem from '@utils/Elem';
import { Languages } from '@data/TestLanguages';
import { step } from '@reporter/AllureDecorators';
import { ScreenInterface } from '@screens/ApplicationScreens';

class MainScreen implements ScreenInterface<MainScreen> {

    //-----------------------------------------------------------
    // SELECTORS
    //-----------------------------------------------------------

    /* Start screen selectors
    -----------------------------------------------------------*/
    private get signInPopup() { return new Elem('//android.widget.TextView[@text="Back up your translation history"]'); }
    private get cancelButton() { return new Elem('//android.widget.Button[@text="Cancel"]'); }
    private get transalteHeaderText() { return new Elem('//android.widget.ImageView[@resource-id="com.google.android.apps.translate:id/logo"]'); }
    private get enterTextViewField() { return new Elem('//android.widget.TextView[@text="Enter text"]'); }

    /* Enter text screen selectors
    -----------------------------------------------------------*/
    private get enterTextEditField() { return new Elem('//android.widget.EditText[@resource-id="com.google.android.apps.translate:id/text_input_field"]'); }
    private translatedTextField(expectedText: string) { return new Elem(`${expectedText}`); }
    private get crossButton() { return new Elem('//android.widget.Button[@content-desc="Clear"]'); }
    private get backButton() { return new Elem('//android.widget.ImageButton[@content-desc="Navigate up"]'); }
    private get enterTextCaption() { return new Elem('//android.widget.EditText[@text="Enter text"]'); }

    /* Languages panel selectors
    -----------------------------------------------------------*/
    private get switchLanguagesButton() { return new Elem('//android.widget.Button[@content-desc="Swap languages"]'); }
    private get translateFromLanguage() { return new Elem('//android.widget.Button[@resource-id="com.google.android.apps.translate:id/language_button_a"]'); }
    private get translateToLanguage() { return new Elem('//android.widget.Button[@resource-id="com.google.android.apps.translate:id/language_button_b"]'); }

    //-----------------------------------------------------------
    // STEP FUNCTIONS
    //-----------------------------------------------------------

    @step('Check main screen is opened')
    public async checkIsOpened(): Promise<MainScreen> {
        await this.transalteHeaderText.checkElementPresence('Main Google Translate screen was not opened!');
        return this;
    }

    @step('Close Sign In popup')
    public async closeSignInPopup(): Promise<void> {
        await this.signInPopup.checkElementPresence();
        await this.cancelButton.click();
    }

    @step('Click on the "Enter Text" field and enter text')
    public async enterText(text: string): Promise<void> {
        await this.enterTextViewField.click();
        await this.enterTextEditField.type(text);
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
    @step('Check selected transalte from languages')
    public async checkSelectedFromLanguage(translateFrom: Languages): Promise<void> {
        assert.equal(await this.translateFromLanguage.getText(), translateFrom, `${translateFrom} language is not viaible in transalte from field`);
    }

    @step('Check selected transalte to languages')
    public async checkSelectedToLanguage(translateTo: Languages): Promise<void> {
        assert.equal(await this.translateToLanguage.getText(), translateTo, `${translateTo} language is not viaible in transalte to field`);
    }

    @step('Check selected languages')
    public async checkSelectedLanguages(translateFrom: Languages, translateTo: Languages): Promise<void> {
        await this.checkSelectedFromLanguage(translateFrom);
        await this.checkSelectedToLanguage(translateTo);
    }

    @step('Click on the switch languages button')
    public async clickSwitchLanguagesButton(): Promise<void> {
        await this.switchLanguagesButton.click();
    }
}

export default new MainScreen();
