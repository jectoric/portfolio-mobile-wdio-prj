import { removeDirectory } from '@utils/FileUtils';
const allure = require('allure-commandline');

export function removeAllureDirectories(): void {
    removeDirectory('allure-results');
    removeDirectory('allure-report');
}

export async function generateAllureReport() {
    const reportError = new Error('Could not generate Allure report');
    const generation = allure(['generate', 'allure-results', '--clean']);
    return new Promise<void>((resolve, reject) => {
        const generationTimeout = setTimeout(
            () => reject(reportError),
            60000,
        );
        generation.on('exit', (exitCode: number) => {
            clearTimeout(generationTimeout);
            if (exitCode !== 0) {
                return reject(reportError);
            }
            console.log('Allure report successfully generated');
            resolve();
        });
    });
}