// Node.js program to demonstrate the   
// path.join() Method  

// Import the path module
const path = require('path');
 
// Normalizing of the final path
path1 = path.join("users", "..", "files", "readme.md");
console.log(path1)
 
// Zero length final path
// returns a period (.)
path2 = path.join("users", "..");
console.log(path2)
 
// Getting the directory path one folder above
console.log("Current Directory: ", __dirname);
path3 = path.join(__dirname, "..");
console.log("Directory above:", path3)
