import { ApplicationScreens } from '@screens/ApplicationScreens';
import { compareScreenshotWithReference } from '@utils/ImageComparison';

describe('Google Translate | Main Page View Tests', () => {
    const screens = new ApplicationScreens();

    it('Check applicatoin view on first start', async () => {
        await compareScreenshotWithReference('AppOnStart');
    });

    it('Check applicatoin view after closing sign in popup', async () => {
        await screens.mainScreen.closeSignInPopup();
        await screens.mainScreen.checkIsOpened();
        await compareScreenshotWithReference('AppMainView');
    });
});
