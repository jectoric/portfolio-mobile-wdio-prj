import * as fs from 'fs';

export function removeDirectory(name: string): void {
    if (fs.existsSync(name)) {
        fs.rm(name, { recursive: true }, (err) => {
            if (err) { throw err; }
            console.log(`${name} is deleted!`);
        });
    } else {
        console.log('Folder does not exist!');
    }
}
