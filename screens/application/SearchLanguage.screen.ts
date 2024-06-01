import { step } from "@reporter/AllureDecorators";
import { ScreenInterface } from "@screens/ApplicationScreens";

class SearchLanguage implements ScreenInterface<SearchLanguage> {

    //-----------------------------------------------------------
    // STEP FUNCTIONS
    //-----------------------------------------------------------

    @step('Check search language screen is opened')
    public async checkIsOpened(): Promise<SearchLanguage> {
        
    }
}

export default new SearchLanguage();