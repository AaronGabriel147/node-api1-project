// BUILD YOUR SERVER HERE


// Notes: per TA Zack 
// (404) not found means the resource id does not point to a valid resource, 
// (500) server error is when the server has a problem that is not from user input


// Things I did:
// typed "server": "nodemon index.js" into the package.json OR YOU CAN INSTALL LIKE BELOW***
// npm i -D nodemon   // nodemon makes the server auto restart whenever a change happens
// npm i express
// npm run server // This makes your server run / browser should show text*
// I downloaded Postman, clicked the + then typed in the URL
// I added the server code into index.js (port listener and connected the path, sorta like an import.)
// wrote the const express = require('express'), etc.
// changed the export "{}" to "server"


// Result of what I did:
// Now the server is up and running while 2 files are connected rather than 1 file like in the warm ups.


// README.md
// [x] Add a `server` script to the `package.json` 
//    that runs the API using `nodemon`.

// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// [x] GET    | /api/users     | Returns an array users.                                                                                |
// [x] GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

// _________________________________________________________________________________

const express = require('express')
const server = express()
server.use(express.json()) //  POSt would not work without this. is parses json or something

// find, findById, insert, update, remove, resetDB
const User = require('./users/model') // this grabs all the exports from model.js. Then you use it like dot notation, IE User.find()


// Sanity check* handle requests to the root of the api, the / route
server.get('/', (req, res) => {  // This is sending back a response.
    // res.send('Hello World, from express...') 
    // res.json({ message: 'words' }) // json makes it display as json
    res.send("<h1> The server is up... </h1>")
})





// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// - If the request body is missing the `name` or `bio` property:
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ message: "Please provide name and bio for the user" }`.


// from model.js:
// const insert = ({ name, bio }) => {
//     // INSERT INTO users (name, bio) VALUES ('foo', 'bar');
//     const newUser = { id: getId(), name, bio }
//     users.push(newUser)
//     return Promise.resolve(newUser)


// my attempt*
// server.post('/api/users', (req, res) => {
//     User.insert({ name: "foo", bio: "bar" })
//         .then(newUser => {
//             if (newUser === "") {
//                 console.log('newUser ---->', newUser)
//                 // res.status(400).json({
//                 //     message: "Please provide name and bio for the user",
//                 // })
//             }
//             // res.json(newUser)
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: "The user information could not be retrieved",
//                 err: err.message, // Why does this exist?
//             })
//         })
// })


server.post('/api/users', (req, res) => {
    // req.body = { name: "aaaa", bio: "bbbbb" } // dont do this, but it works to see it
    // console.log(user) //  in terminal upon post req inside http client
    const user = req.body // body is an object that we created. we can go to body in postman and type in a mock object.
    if (!user.name || !user.bio) {
        res.status(400).json({
            message: 'name and bio required'
        })
    }
    else {
        User.insert(user) // this pushed a new user to the existing users
            .then(createdUser => {
                // console.log(createdUser) // logs in terminal on post req whatever I type into the http client res.
                res.status(201).json(createdUser)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Please provide name and bio for the user',
                    err: err.message,
                    stack: err.stack,
                })
            })
    }



})


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@







// - If there's an error in retrieving the _users_ from the database:
// - respond with HTTP status code `500`.
// - return the following JSON object: `{ message: "The users information could not be retrieved" }`.
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'The users information could not be retrieved',
                err: err.message, // What does this do?
            })
        })
})



// id
server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id) // findById = all user ids. req.params.id = whatever the user enters in the url param
        .then(user => {
            // console.log('users ids --->', user) // shows up in nodemon terminal*
            if (!user) {      // if not user id, then:
                res.status(404).json({
                    message: "The users information could not be retrieved",
                })
            }
            res.json(user)  // return user if exists.
        })
        .catch(err => {
            res.status(500).json({
                message: "The user information could not be retrieved",
                err: err.message, // Why does this exist?
            })
        })
})












// catch all - placement sensitive (place at end) This is the result of a user entering any nonexistent endpoint.
server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found..'
    })
})



module.exports = server;










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