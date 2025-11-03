/*
1. Reads JSON health data asynchronously using fs.readFile
2. Counts the total number of health entries
3. Handles errors when the JSON file is missing or invalid
4. Uses try/catch blocks for proper error handling
*/

const fs = require('fs/promises');

async function readHealthFile(filepath) {
    try {
        // Read the file as text
        const data = await fs.readFile(filepath, 'utf8');
        
        // Convert the JSON string to a JavaScript object
        const healthData = JSON.parse(data);
        
        // Count the total number of health entries
        //const totalEntries = healthData.entries.length;

         // Check if metrics property exists (your file uses 'metrics' not 'entries')
        if (!healthData.metrics) {
            throw new Error('Invalid health data format: missing "metrics" property');
        }
        
        // Add entries property for compatibility with dataProcessor.js
        healthData.entries = healthData.metrics;
        
        
        //console.log('Success! Found your health data!');
        //console.log('Total health entries:', totalEntries);
        
        return healthData;
        
    } catch(error) {
        // Handle different types of errors
        if (error.code === 'ENOENT') {
            console.log(' File not found - check the file path');
        } else if (error.name === 'SyntaxError') {
            console.log(' Invalid JSON - check the file format');
        } else {
            console.log(' Unknown error:', error.message);
        }
        return null;
    }
}

// Export the function so it can be used in tests
module.exports = { readHealthFile };