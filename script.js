const fs = require('fs');

function transformCase(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => transformCase(item));
    }

    const newObj = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = convertText(key);
            newObj[newKey] = transformCase(obj[key]);
        }
    }

    return newObj;
}

function processJsonFile(filePath) {
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData);

    const modifiedData = transformCase(jsonData);

    const outputFilePath = filePath;
    fs.writeFileSync(outputFilePath, JSON.stringify(modifiedData, null, 2));

    console.log(`Modified data saved to ${outputFilePath}`);
}

function convertText(text) {
    let convertedText = ""

    for (let index = 0; index < text.length; index++) {
        if(index === 0) {
            convertedText = text[index].toLowerCase()
        } else if(text[index] === ' ') {
            convertedText = convertedText + text[index +1].toUpperCase()
            index++
        } else
            convertedText = convertedText + text[index]
    }

    return convertedText
}


// Replace 'your_file.json' with the actual path to your JSON file
processJsonFile('Raport_06.05.2024_12.05.2024_dionisiuvalentin.i97@gmail.com.json');
