const allureReporter = require('@wdio/allure-reporter').default

export function step(name: string) {
    return function decorator(
        target: any,
        key: string,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ): TypedPropertyDescriptor<(...args: any[]) => any> {
        const original = descriptor.value;
        if (typeof original === 'function') {
            descriptor.value = function (...args: any[]): Promise<any> {
                if (name) {
                    allureReporter.startStep(name);
                } else {
                    allureReporter.startStep(key);
                }

                return original.apply(this, args).then((data: any) => {
                    allureReporter.endStep();
                    return data;
                }).catch((error: any) => {
                    allureReporter.endStep('failed');
                    throw error;
                });
            };
        }
        return descriptor;
    };
}

export function addJiraTicketToDescription(ticketNumber: string) {
    const linkUrl: string = 'https://jira.example.com/' + ticketNumber;
    const linkName: string = `${ticketNumber}`;
    const linkHtml: string = `<a href="${linkUrl}" target="_blank">${linkName}</a>`;
    allureReporter.addDescription(`Link: ${linkHtml}`, 'html');
}
