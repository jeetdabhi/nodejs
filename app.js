// Node program to demonstrate the 
// url.protocol API as Getter 

// Importing the module 'url' 
const http = require('url'); 

// Creating and initializing myURL 
const myURL = new URL('https://www.youtube.com/watch?v=RLtyhwFtXQA'); 

// Getting the protocol portion 
// using protocol 
const protocol = myURL.protocol; 

// Display hash value 
console.log("Protocol of current url is : " + protocol); 
