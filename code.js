const fs = require('fs');
const path = require('path');

// Function to read SRT file and remove unnecessary numbers
function processSRT(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const chunks = data.replaceAll('\r\n', '\n').split('\n\n');
        const processedChunks = chunks.map((chunk) => {
            const lines = chunk.split('\n');
            const textLines = lines.slice(2);
            return textLines.join('');
        });

        const processedData = processedChunks.join('\n').replace(/\{\\.*\}/g, '');

        // Write the processed data to a new file
        const outputFilePath = path.join(path.dirname(filePath), 'processed_' + path.basename(filePath));
        fs.writeFile(outputFilePath, processedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('File processed and saved as:', outputFilePath);
        });
    });
}

// Example usage
const srtFilePath = 'sample.srt';
processSRT(srtFilePath);