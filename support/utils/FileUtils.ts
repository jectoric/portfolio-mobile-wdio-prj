import * as fs from 'fs';

// Shared function to remove a directory
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
