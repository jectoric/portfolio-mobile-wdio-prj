import MainScreen from './application/Main.screen';
import SearchLanguageScreen from './application/SearchLanguage.screen';

export class ApplicationScreens {
    public mainScreen = MainScreen;
    public searchLanguageScreen = SearchLanguageScreen;
}

export interface ScreenInterface<T extends ScreenInterface<T>> {
    checkIsOpened(): Promise<T>;
}
