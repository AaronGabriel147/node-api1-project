// BUILD YOUR SERVER HERE

// Things I did:
// typed "server": "nodemon index.js" into the package.json OR YOU CAN INSTALL LIKE BELOW***
// npm i -D nodemon   // nodemon makes the server auto restart whenever a change happens
// npm i express
// npm run server // This makes your server run / browser should show text*
// I downloaded Postman, clicked the + then typed in the URL
// I added the server code into index.js (port listener and connected the path, sorta like an imort.)
// wrote the const express = require('express'), etc.
// changed the export "{}" to "server"


// Result of what I did:
// Now the server is up and running while 2 files are connected rather than 1 file like in the warm ups.


// README.md
// [x] Add a `server` script to the `package.json` 
//    that runs the API using `nodemon`.

// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// | GET    | /api/users     | Returns an array users.                                                                                |
// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |


const express = require('express')
const server = express()
const User = require('./users/model') // this grabs all the exposts from model.js. Then you use it like dot notation, IE User.find()

// Sanity check*
// handle requests to the root of the api, the / route
server.get('/', (req, res) => {  // This is sending back a response.
    // res.send('Hello World, from express...') 
    // res.json({ message: 'wordssss' }) // json makes it display as json
    res.send("<h1> The server is up... </h1>")
})

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'err getting users',
                err: err.message,
            })
        })
})



server.get('/api/users/:id', (req, res) => {

    User.findById(req.params.id)

        .then(user => {
            // console.log(user) // where does the output show up at?
            res.json(user)
        })

        .catch(err => {
            res.status(500).json({
                message: 'err getting users',
                err: err.message,
            })
        })
})










// catch all
// Universal endpoint (this is a catch), placement sensitive (place at end)
server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found..'
    })
})



module.exports = server; // EXPORT YOUR SERVER instead of {}










//________________________________________________________________
// mkdir new-dir = creates new directory
// cd new-dir/ = cd into the dir
// touch server.js = creates file
// npm init -y = creates package.json
// npm i express = adds express
// npm start = runs server code - server listening on port 5000
// Then go to localhost:5000 and you will see your .send stuff.



// Make a server,
// create content, create listening port.
// The way we bring an external module into node is by using require.
// EXAMPLE: const express = require('express');

// Create a file named server.js to host out server code
// Type npm init -y to generate a package.json
// Install the express npm module using npm i express
// run the server by typing "node server.js"
// to stop the server, type control c