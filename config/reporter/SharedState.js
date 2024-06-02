let screnshots = {};

module.exports = {
    setScreenshot(testTitle, screenshotData) {
        screnshots[testTitle] = screenshotData;
    },
    getScreenshot(testTitle) {
        return screnshots[testTitle];
    },
    clearScreenshots() {
        screnshots = {};
    }
}