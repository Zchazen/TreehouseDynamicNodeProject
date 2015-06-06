//problem: we need a way to look at badge count adn JS points from a web browsers
//solution: use node.js for look ups and to serve templates via http (use node to get the profile info and create a server and serve index and error pages)
var router = require("./router.js");
//1. create a web server

var http = require("http");
http.createServer(function (request, response) {
	router.home(request, response);
	router.user(request, response);
}).listen(3000);
//2. handle a http route GET/ and POST/ (searching side of things)

	// if url === "/..."
		//get json from Treehouse
			//on end
				//show profile
			//on error
				//show error

//4. function that handles the reading of files and merge in values
	//read from file and get a string
		//merge values into string 