var http = require('http');
var formidable = require('formidable');

var errors = formidable.formidableErrors;

const server = http.createServer(async (req, res) => {
   if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {
      // parse a file upload
      const form = new formidable.IncomingForm();
      let fields;
      let files;
      try {
         [fields, files] = await form.parse(req);
      } catch (err) {

         res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
         res.end(String(err));
         return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ fields, files }, null, 2));
      return;
   }

   // show a file upload form
   res.writeHead(200, { 'Content-Type': 'text/html' });
   res.end(`
      <form action="/api/upload" enctype="multipart/form-data" method="post">
      <h2>With Node.js <code>"http"</code> module</h2>
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
      </form>

      <style>
      
body {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Wrapper for centering and spacing */
form {
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

/* Header styling */
h2 {
  text-align: top-center;
  color: #333333;
  margin-bottom: 20px;
}

/* Styling for form fields */
div {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="file"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="file"] {
  padding: 0;
}

/* Submit button styling */
input[type="submit"] {
  background-color: #007bff;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
}

input[type="submit"]:hover {
  background-color: #0056b3;
}

      </style>
   `);
});
server.listen(5000, () => {
   console.log('Server listening on http://localhost:5000/ ...');
});
