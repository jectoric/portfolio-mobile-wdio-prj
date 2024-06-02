import { Languages } from '@data/TestLanguages';
import { TranslateText } from '@data/TranslateConstants';
import { ApplicationScreens } from '@screens/ApplicationScreens';

// TODO (02.06.2024) Some tests were skipped due to bug https://support.google.com/translate/thread/195118269
describe('Google Translate | Text Translate Tests', () => {
    const screens = new ApplicationScreens();

    before('Close sign in popup on the app start', async () => {
        await screens.mainScreen.closeSignInPopup();
    });

    beforeEach('Check that application was opened', async () => {
        await screens.mainScreen.checkIsOpened();
        await screens.searchLanguageScreen.selectTransalteFromLanguage(Languages.ENGLISH);
        await screens.searchLanguageScreen.selectTransalteToLanguage(Languages.UKRAINIAN);
    });

    afterEach('Clear text field by clicking the back button', async () => {
        await screens.mainScreen.clickBackButton();
    });

    xit(`[ISSUE => 195118269] User should be able to translate text`, async () => {
        await screens.mainScreen.enterText(TranslateText.ENGLISH_TEXT);
        await screens.mainScreen.checkTransaltedText(TranslateText.UKRAINIAN_TEXT);
    });

    xit(`[ISSUE => 195118269] User should be able to use "Detect Language" option`, async () => {
        await screens.searchLanguageScreen.selectDelectLanguageOption();
        await screens.mainScreen.enterText(TranslateText.ENGLISH_TEXT);
        await screens.mainScreen.checkTransaltedText(TranslateText.UKRAINIAN_TEXT);
    });

    it('User should be able to clear text by clicking on X button', async () => {
        await screens.mainScreen.enterText(TranslateText.ENGLISH_TEXT);
        await screens.mainScreen.clickCrossButton();
        await screens.mainScreen.checkEnterTextCaption();
    });

    it('User should be able to switch languages', async () => {
        await screens.mainScreen.checkSelectedLanguages(Languages.ENGLISH, Languages.UKRAINIAN);
        await screens.mainScreen.clickSwitchLanguagesButton();
        await screens.mainScreen.checkSelectedLanguages(Languages.UKRAINIAN, Languages.ENGLISH);
    });
});
