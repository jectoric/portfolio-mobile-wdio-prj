import { step } from "@reporter/AllureDecorators";
import { ScreenInterface } from "@screens/ApplicationScreens";

class MainScreen implements ScreenInterface<MainScreen> {

    //-----------------------------------------------------------
    // STEP FUNCTIONS
    //-----------------------------------------------------------

    @step('Check main screen is opened')
    public async checkIsOpened(): Promise<MainScreen> {
        
    }
}

export default new MainScreen();