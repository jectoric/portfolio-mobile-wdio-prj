import Elem from '@utils/Elem';
import { step } from '@reporter/AllureDecorators';
import { ScreenInterface } from '@screens/ApplicationScreens';
import { Languages, LanguageDirection } from '@data/TestLanguages';

class SearchLanguage implements ScreenInterface<SearchLanguage> {

    //-----------------------------------------------------------
    // SELECTORS
    //-----------------------------------------------------------

    private get fromLanguageButton() { return new Elem('selector'); }
    private get toLanguageButton() { return new Elem('selector'); }
    private screenHeader(languageType: LanguageDirection) { return new Elem(`${languageType}`); }
    private get searchIcon() { return new Elem('selector'); }
    private get searchField() { return new Elem('selector'); }
    private searchOption(language: Languages) { return new Elem(`${language}`); }

    //-----------------------------------------------------------
    // PRIVATE FUNCTIONS
    //-----------------------------------------------------------

    private async searchAndSelectLanguage(language: Languages): Promise<void> {
        await this.searchIcon.click();
        await this.searchField.type(language);
        await this.searchOption(language).click();
    }

    //-----------------------------------------------------------
    // STEP FUNCTIONS
    //-----------------------------------------------------------

    @step('Check search language screen is opened')
    public async checkIsOpened(): Promise<SearchLanguage> {
        await this.searchIcon.checkElementPresence('Search language Google Translate screen was not opened!');
        return this;
    }

    @step('Seearch and select translate from language')
    public async selectTransalteFromLanguage(language: Languages): Promise<void> {
        await this.fromLanguageButton.click();
        await this.screenHeader(LanguageDirection.FROM);
        await this.searchAndSelectLanguage(language);
    }

    @step('Seearch and select translate to language')
    public async selectTransalteToLanguage(language: Languages): Promise<void> {
        await this.toLanguageButton.click();
        await this.screenHeader(LanguageDirection.TO);
        await this.searchAndSelectLanguage(language);
    }

    @step('Select "Delect language" options')
    public async selectDelectLanguageOption(): Promise<void> {
        await this.fromLanguageButton.click();
        await this.searchOption(Languages.DETECT_LANGUAGE).click();
    }
}

export default new SearchLanguage();
