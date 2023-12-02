const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const PDFParser = require('pdf-parse');

const app = express();
const port = 3000;

app.use(bodyParser.text());

app.post('/parse', async (req, res) => {
  try {
    let parsedData = '';

    // Check if the input is a PDF file
    if (req.headers['content-type'] === 'application/pdf') {
      const pdfBuffer = Buffer.from(req.body, 'base64');
      parsedData = await parsePdf(pdfBuffer);
    } else {
      // If not a PDF, assume plain text
      parsedData = parsePlainText(req.body);
    }

    // Save parsed data to a text file
    saveToFile(parsedData);

    // Respond to the frontend with the parsed data
    res.json({ result: 'success', parsedData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ result: 'error', message: 'Internal Server Error' });
  }
});

// Function to parse plain text
function parsePlainText(text) {
  // Limit to the first 1000 characters
  return text.slice(0, 1000);
}

// Function to parse PDF file
async function parsePdf(pdfBuffer) {
  const data = await PDFParser(pdfBuffer);
  // Limit to the first 1000 characters
  return data.text.slice(0, 1000);
}

// Function to save parsed data to a text file
function saveToFile(parsedData) {
  const fileName = 'parsed_data.txt';
  fs.writeFileSync(fileName, parsedData);
  console.log(`Parsed data saved to ${fileName}`);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});