const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const helmet = require('helmet');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const say = require('say');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(helmet());

app.get('/', (req, res) => {
    // The written text needs to be explicit such as "forward slash" instead of "/", otherwise the TTS utility might not actually say it.
    const defaultWelcomeText = "Hello World. Welcome to the PDF to audio API. Please make a POST request to the route forward slash upload and include a pdf in the request body to get started.";

    say.export(defaultWelcomeText, null, 1, 'output.wav', (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error parsing PDF.');
        }

        // Send .WAV file to client
        res.sendFile(__dirname + '/output.wav', (err) => {
            if (err) {
                console.error(err);
            }
            // Delete the file after sending it to the client
            fs.unlinkSync(__dirname + '/output.wav');
        });
    });
});

app.post('/upload', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const buffer = req.file.buffer;

    try {
        const data = await pdfParse(buffer);

        say.export(data.text, null, 1, `${req.file.originalname.replace('.pdf', '')}.wav`, (err) => {
            if (err) {
                return res.status(500).send('Error parsing PDF.');
            }

            // Send .WAV file to client
            res.sendFile(__dirname + `/${req.file.originalname.replace('.pdf', '')}.wav`, (err) => {
                if (err) {
                    console.error(err);
                }
                // Delete the file after sending it to the client
                fs.unlinkSync(__dirname + `/${req.file.originalname.replace('.pdf', '')}.wav`);
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Error parsing PDF.');
    }
});

app.listen(PORT, () => {
    console.log(`[server] Listening on ${PORT}`);
});