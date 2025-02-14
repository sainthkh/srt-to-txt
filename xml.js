const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function processXML(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const $ = cheerio.load(data, { xmlMode: true });
        const text = [];
        $('p').each((index, element) => {
            text.push($(element).text().replaceAll('\r\n', '').replaceAll('\n', ''));
        });

        // Write the processed data to a new file
        const outputFilePath = path.join(path.dirname(filePath), 'processed_' + path.basename(filePath));
        fs.writeFile(outputFilePath, text.join('\n'), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('File processed and saved as:', outputFilePath);
        });
    });
}

const xmlFilePath = 'sample.xml';
processXML(xmlFilePath);