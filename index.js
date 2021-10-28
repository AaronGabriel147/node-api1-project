//index is our root



const server = require('./api/server');

const port = 5000;


// START YOUR SERVER HERE

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});


//  OR..... 

// // listens for connections on port 5000
// server.listen(5000, () => {
//     console.log('Server running on http://localhost:5000')
// })






