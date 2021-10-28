//index is our root



// const server = require('./api/server');

// const port = 5000;


// START YOUR SERVER HERE




const express = require('express'); // import the express package

const server = express(); // creates the server



// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
    res.send('Hello World, from express...')
})



// listens for connections on port 5000
server.listen(5000, () => {
    console.log('Server running on http://localhost:5000')
})



