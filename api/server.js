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

// Notes: per TA Zac
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
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________


const express = require('express')
const server = express()
server.use(express.json()) //  POSt would not work without this. is parses json or something

// find, findById, insert, update, remove, resetDB
const User = require('./users/model') // this grabs all the exports from model.js. Then you use it like dot notation, IE User.find()



// const update = (id, changes) => {
//     // UPDATE users SET name = 'foo', bio = 'bar WHERE id = 1;
//     const user = users.find(user => user.id === id)
//     if (!user) return Promise.resolve(null)

//     const updatedUser = { ...changes, id }
//     users = users.map(d => (d.id === id) ? updatedUser : d)
//     return Promise.resolve(updatedUser)
//   }

// Update user.
server.put('/api/users/:id', async (req, res) => { // req.params.id is the id of the user
    try { // try to do this
        const { id } = req.params // get the id from the params
        const changes = req.body // get the changes from the body
        const user = await User.findById(id) // find the user by id
        if (!user) return res.status(404).json({ message: 'User not found!!!!!!!!!!' })// if user is not found, return 404
        const updatedUser = await User.update(id, changes)// update the user
        res.status(200).json(updatedUser) //    return the updated user
    } catch (error) { // if there is an error, catch it
        res.status(500).json({ message: 'Something went wrong!!!!!!!!' }) // return 500
    }
})

//  ALL THIS WAS INSIDE THE TRY BLOCK FROM ABOVE, IT WAS BROKE SO I REDID IT ABOVE^
//         const possibleUser = await User.findById(req.params.id) // grab the id if it exists
// if (!possibleUser) { // if it doesn't exist
//     res.status(404).json({ // send a 404
//         message: 'The user with the specified ID does not exist...' // message
//     })
// }
// else { // if it does exist
//     if (!req.body.name || !res.body.bio) { // if the name or bio is not there
//         res.status(400).json({ // send a 400
//             message: 'Please provide name and bio for the user...' // message
//         })
//     }
//     else { // if it does exist and has a name and bio
//         const updatedUser = await User.findById(req.params.id, req.body) // update the user
//         res.status(200).json(updatedUser) // send the updated user
//     }
// }
// }
//     catch (err) { // if it doesn't work
//     res.status(500).json({ // send a 500
//         message: "The user information could not be modified...", // message
//         error: err.message, // error
//     })
// }
// })

// Delete user.
server.delete('/api/users/:id', async (req, res) => {
    try { // try to do this
        const possibleUser = await User.findById(req.params.id) // grab the id if it exists
        // console.log('poss user --->', possibleUser) //  undefined or the user object is id matches the id in the url
        if (!possibleUser) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        }
        else { // 'User.remove is from model.js and it removes the user with the specified ID'
            const deleteUser = await User.remove(possibleUser.id) // remove the user with the id
            // console.log(deleteUser) // undefined or the user object is id matches the id in the url
            res.status(200).json(deleteUser)
        }
    }
    catch (error) { // if there is an error, catch it
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

// Sanity check*
server.get('/', (req, res) => {  // This is sending back a response.
    // res.send('Hello World, from express...') 
    // res.json({ message: 'words' }) // json makes it display as json
    res.send("<h1> The server is up... </h1>")
})

// Creating a user (name & bio, id auto generates)
// from model.js: adds a new user and pushes to data
server.post('/api/users', (req, res) => {
    // req.body = { name: "aaaa", bio: "bbbbb" } // dont do this, but it works to see it
    // console.log(user) //  in terminal upon post req inside http client
    const user = req.body // body is an object that we created. we can go to body in postman and type in a mock object.
    if (!user.name || !user.bio) { // if either of these do not exist, return 400 & message
        res.status(400).json({     // client error
            message: 'Please provide name and bio for the user'
        })
    }
    else { // is both name & bio exist, return a the new user and push it to the users data.
        User.insert(user) // this pushed a new user to the existing users
            .then(createdUser => {
                // console.log(createdUser) // logs in terminal on post req whatever I type into the http client res.
                res.status(201).json(createdUser) // responds with a json object
            })
            .catch(err => {
                res.status(500).json({ // server error
                    message: 'There was an error while saving the user to the database',
                    err: err.message,
                    stack: err.stack,
                })
            })
    }
})

// Get's all users. After you create a new user with post you will get that user too with this get.
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

// Find by id
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

// Catch all - placement sensitive (place at end) This is the result of a user entering any nonexistent endpoint.
server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found..'
    })
})

module.exports = server; // this exports the server to the other files.