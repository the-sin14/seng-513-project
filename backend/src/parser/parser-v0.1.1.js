const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');

const app = express();
const port = 5173;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/parse', upload.single('file'), async (req, res) => {
  try {
    const inputText = req.body.inputText || '';
    const charLimit = req.body.charLimit || 1000;

    let parsedText = '';

    if (req.file) {
      // If the input is a PDF file, parse the text using pdf-parse
      const dataBuffer = req.file.buffer;
      const data = await pdf(dataBuffer);
      parsedText = data.text;
    } else {
      // If the input is plain text, use the provided text
      parsedText = inputText;
    }

    // Truncate the text to the specified character limit
    parsedText = parsedText.slice(0, charLimit);

    res.status(200).json({ parsedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});