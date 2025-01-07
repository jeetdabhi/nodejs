const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve a form on the home page
app.get('/', (req, res) => {
   res.send(`
      <form action="/submit" method="POST">
         <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
         </div>
         <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
         </div>
         <button type="submit">Submit</button>
      </form>
   `);
});

// Handle form submission and redirect to the next page
app.post('/submit', (req, res) => {
   const { name, email } = req.body;
   res.redirect(`/result?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
});

// Display the submitted data on the result page
app.get('/result', (req, res) => {
   const { name, email } = req.query;
   res.send(`
      <h1>Form Submitted Successfully</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <a href="/">Go back to the form</a>
   `);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});
