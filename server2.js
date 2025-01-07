const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // For static files like CSS

// Render the incident form on the main page
app.get('/', (req, res) => {
    res.send(`
        <h2>Incident Report Form</h2>
        <form action="/submit-incident" method="POST">
            <label for="incidentTitle">Incident Title:</label>
            <input type="text" id="incidentTitle" name="incidentTitle" required><br><br>

            <label for="incidentDescription">Incident Description:</label><br>
            <textarea id="incidentDescription" name="incidentDescription" required></textarea><br><br>

            <label for="incidentDate">Date of Incident:</label>
            <input type="date" id="incidentDate" name="incidentDate" required><br><br>

            <button type="submit">Submit Incident</button>
        </form>
    `);
});

// Handle form submission and send data to the /incident-result page
app.post('/submit-incident', (req, res) => {
    const { incidentTitle, incidentDescription, incidentDate } = req.body;

    // Debugging: Log the submitted data to check what we are receiving
    console.log('Form Submitted:', req.body);

    // Redirect to the result page and pass the data as query parameters
    res.redirect(`/incident-result?title=${encodeURIComponent(incidentTitle)}&description=${encodeURIComponent(incidentDescription)}&date=${encodeURIComponent(incidentDate)}`);
});

// Display the submitted incident data on the result page
app.get('/incident-result', (req, res) => {
    const { title, description, date } = req.query;

    // Debugging: Log the query parameters to check if they are passed
    console.log('Query Params:', req.query);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
