# pdf-2-audio
A basic express API app that has a upload POST route that accepts a PDF and returns a generated `.wav` file. The project uses OS specific TTS (text to speech) provided by [say.js](https://github.com/Marak/say.js).

## Warning for use
Very large PDFs will currently time out, this is a hobby project so I haven't worked through optimization. Currently only supports single files.

## Setup & Installation
After downloading or cloning the repo, follow these steps. The project relies on Node so be sure that it is installed properly on your system.

1. Create a `.env` file with the `PORT` if you would like to set a designated port for the project to run on other than `localhost:3000`.
2. In your terminal run `npm install`.
3. Run `npm run start` to start up the server.
4. You can now access the API however you see fit.

## Routes available
- `GET http://your_api_endpoint_url`: This returns a generic welcome `.wav` file with instructions directing you to the upload `POST` route.
- `POST http://your_api_endpoint_url/upload`: This allows you to submit any PDF you would like for conversion.

## How to use (Documented by [ChatGPT](https://chat.openai.com))
To submit a POST request with a PDF attached, you can use various tools or libraries. One of the most popular tools for testing API endpoints is Postman. Alternatively, you could use `curl` from the command line, or use a programming language's HTTP client.

Here's how you can do it using all three methods:

### 1. Using Postman:

1. Download and install [Postman](https://www.postman.com/downloads/).
2. Open Postman and create a new request.
3. Set the request method to `POST`.
4. Enter the API endpoint URL.
5. In the `Body` tab, select `form-data`.
6. Enter a key (e.g., "pdf") and select the type as `File` from the dropdown. Choose your PDF by clicking the "Select Files" button.
7. Click "Send".

### 2. Using `curl`:

From your terminal or command prompt:

```bash
curl -X POST -F "pdf=@path_to_your_file.pdf" http://your_api_endpoint_url/upload
```

Make sure to replace `path_to_your_file.pdf` with the path to your PDF file and `http://your_api_endpoint_url/upload` with your actual API endpoint.

### 3. Using Node.js with `axios`:

First, you need to install the required packages:

```bash
npm install axios form-data
```

Then, you can use the following code to make a POST request with the attached PDF:

```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('pdf', fs.createReadStream('path_to_your_file.pdf'));

axios.post('http://your_api_endpoint_url/upload', form, {
    headers: {
        ...form.getHeaders()
    }
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('Error uploading the file:', error);
});
```

Replace `path_to_your_file.pdf` with the path to your PDF and `http://your_api_endpoint_url/upload` with your actual API endpoint.

Choose whichever method is most convenient for you. If you're doing this for testing or debugging, tools like Postman are especially handy due to their user-friendly interface and features.
