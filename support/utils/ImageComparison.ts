import * as fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import allure from '@wdio/allure-reporter';

/**
 * Utility function to read an image from a given path.
 * @param {string} imgPath - Path to the image file.
 * @returns {PNG} - The image data.
 */
const getImageByPath = (imgPath: string): PNG => PNG.sync.read(fs.readFileSync(imgPath));

/**
 * Compare two images pixel by pixel and generate a difference image.
 * @param {string} img1Path - Path to the first image.
 * @param {string} img2Path - Path to the second image.
 * @param {string} diffPath - Path to save the difference image.
 * @returns {string} - The percentage difference between the images.
 */
const isImagesPixelsMatch = (img1Path: string, img2Path: string, diffPath: string): string => {
    const img1 = getImageByPath(img1Path);
    const img2 = getImageByPath(img2Path);

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    const numPixels = width * height;
    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
    const diffPercent = `${(numDiffPixels / numPixels) * 100}%`;

    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    console.log('debug', `Pixels number of difference between images: ${numDiffPixels} pixels or ${diffPercent}`);

    return diffPercent;
};

/**
 * Compare a screenshot taken with a reference image and check for differences.
 * @param {string} referenceImageName - Name of the reference image for comparison.
 * @param {string} tempScreenshotName - Name to temporarily store the captured screenshot.
 * @param {number} threshold - Maximum acceptable difference percentage (default is 0.01).
 * @param {number} waitBeforeScreenshot - Wait time before taking screenshot (default is 2000 ms).
 */
export async function compareScreenshotWithReference(
    tempScreenshotName: string,
    threshold: number = 0.01,
    waitBeforeScreenshot: number = 2000
): Promise<void> {
    const basePath = './google-translate-autotests/non-functional-autotests/images';
    const tempScreenshotPath = `${basePath}/scrennshot-${tempScreenshotName}.png`;
    const referenceImagePath = `${basePath}/${tempScreenshotName}.png`;
    const diffImagePath = `${basePath}/diff-${tempScreenshotName}.png`;

    try {
        // Capture and save the screenshot
        await driver.pause(waitBeforeScreenshot);
        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync(tempScreenshotPath, Buffer.from(screenshot, 'base64'));

        // Compare images and delete tempScreenshot
        const diffPercentage = isImagesPixelsMatch(referenceImagePath, tempScreenshotPath, diffImagePath);
        fs.unlinkSync(tempScreenshotPath);

        if (parseFloat(diffPercentage) > threshold) {
            allure.addAttachment('CLICK-ME! - UI COMPARISON SNAPSHOT DIFF', fs.readFileSync(diffImagePath), 'image/png');
            throw new Error(`The screenshots don't match. Difference: ${diffPercentage}`);
        } else {
            console.log('Screenshots are matching');
        }
    } catch (error) {
        throw new Error(`Screenshots comparison error: ${error}`);
    }
}
