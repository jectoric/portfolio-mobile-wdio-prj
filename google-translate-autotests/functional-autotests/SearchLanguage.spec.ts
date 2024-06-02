import { Languages } from '@data/TestLanguages';
import { ApplicationScreens } from '@screens/ApplicationScreens';

describe('Google Translate | Text Translate Tests', () => {
    const screens = new ApplicationScreens();

    before('Close sign in popup on the app start', async () => {
        await screens.mainScreen.closeSignInPopup();
        await screens.mainScreen.checkIsOpened();
    });

    it(`User should be able to search and select transalte from language`, async () => {
        await screens.searchLanguageScreen.selectTransalteFromLanguage(Languages.ENGLISH);
        await screens.mainScreen.checkSelectedFromLanguage(Languages.ENGLISH);
    });

    it(`User should be able to search and select transalte to language`, async () => {
        await screens.searchLanguageScreen.selectTransalteToLanguage(Languages.UKRAINIAN);
        await screens.mainScreen.checkSelectedToLanguage(Languages.UKRAINIAN);
    });

    it(`User should be able to select "Detect Language" option`, async () => {
        await screens.searchLanguageScreen.selectDelectLanguageOption();
        await screens.mainScreen.checkSelectedFromLanguage(Languages.DETECT_LANGUAGE);
    });
});
