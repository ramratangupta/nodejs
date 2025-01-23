fs = require('fs');
/*
fs.readFile('large_file.txt','utf8',(err,data)=>{
	console.log(err);
	console.log(data);
});
*/

// Create read stream with proper encoding
const readStream = fs.createReadStream('large_file.txt', {encoding: 'utf8'});

// Track line fragments
let incomplete = '';

readStream.on('data', (chunk) => {
    // Combine with previous incomplete data
    const content = incomplete + chunk;
    
    // Split by newline but keep the last partial line
    const lines = content.split(/\n/);
    incomplete = lines.pop(); // Store last partial line

    // Process each complete line
    lines.forEach(line => {
        try {
            // Clean and process the line
            const cleanedLine = line
                .trim()
                .replace(/Data at line /g, 'Repalced '); // Remove replacement character
	console.log(cleanedLine)
            
        } catch (error) {
            console.error('Error processing line:', error);
        }
    });
});

readStream.on('end', () => {
    // Process any remaining data
    if (incomplete) {
       console.log(incomplete)
    }
});

readStream.on('error', (error) => {
    console.error('Error reading file:', error);
});
