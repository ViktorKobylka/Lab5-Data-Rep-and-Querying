const express = require('express');//import Express library
const app = express();//initialize Express app
const port = 3000;//define server port

//root route to welcome users
app.get('/', (req, res) => {
    res.send('Welcome to Data Respresentation & Querying');
});

//start server on specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//error handling 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//route with name parameter
app.get('/hello/:name', (req, res) => {
    const name = req.params.name;//get name from URL
    res.send(`Hello ${name}`);
});

//route with name and surname parameters
app.get('/hello/:name/:surname', (req, res) => {
    const name = req.params.name;//get name from URL
    const surname = req.params.surname;//get surname from URL
    res.send(`Hello ${name} ${surname}`);
});

//route to get list of movies
app.get('/api/movies', (req, res) => {
    const movies = [
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://example.com/poster1.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://example.com/poster2.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://example.com/poster3.jpg"
        }
    ];
    res.status(201).json({ myMovies:movies });//send movie data as JSON
});

//Set up middleware to serve all static files (CSS, JS, etc.) from a public directory
app.use(express.static('public'));

const path = require('path'); //import path module

//route to serve HTML file
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//route with query parameters for name
app.get('/name', (req, res) => {
    const firstname = req.query.firstname;//get name from query
    const lastname = req.query.lastname;//get surname from query
    res.send(`Hello ${firstname} ${lastname}`);
});

const bodyParser = require('body-parser');//import body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//route to handle POST request with form data
app.post('/name', (req, res) => {
    const firstname = req.body.firstname;//get name from body
    const lastname = req.body.lastname;//get name from body
    res.send(`Hello ${firstname} ${lastname}`);
});