
var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");

var commonHeaders = {"Content-Type": "text/html"};

/**
* When the JSON body is fully recieved the 
* the "end" event is triggered and the full body
* is given to the handler or callback
**/


/**
* If a parsing, network or HTTP error occurs an
* error object is passed in to the handler or callback
**/


function home(request, response) {
	if(request.url === "/") {
		if (request.method.toLowerCase() === "") {	
		//if url === "/" %% GET
		//show search field
			reponse.writeHead(200, commonHeaders);
			renderer.view("header", {}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			//something is missing here!!
			response.end();
		}
		else {
			//if url === "/" && POST
			//get the post data from body 
			request.on("data", function(postBody) {
				//console.log(postBody.toString());
				//extract username and then redirect to username 
				var query = querystring.parse(postBody.toString());
				query.writeHead(303, {"Location": "/" + query.username});
				response.end();
			});

			//redirect to /:username
		}

	}
	
}
function user(request, response) {
	var username = request.url.replace("/", "");
	if (username.length > 0) {
		reponse.writeHead(200, commonHeaders);
		renderer.view("header", {}, response);
				//get json from treehouse
	var studentProfile = new Profile(username);
	//on end
	studentProfile.on("end", function(profileJSON) {
		//show profile

		//store values which we need
		var values = {
			avatarURl: profileJSON.gravatar_url,
			username: profile.profile_name,
			badges: profileJSON.badges.length,
			javascriptPoints: profileJSON.points.JavaScript
		};
		// simple response
		renderer.view("profile", values, response);
			//values.username + " has " + values.badges + "badges\n");
		renderer.view("footer", {}, response);
		response.end();
	});
	//on error
	studentProfile.on("error", function(error) {
		//show error
		renderer.view("error", {errorMessage: error.message}, response);
		renderer.view("search", {}, response);
		renderer.view("footer", {}, response);
		response.end();
	});

		//response.write("Search\n");
		//response.end("Footer\n");
		//response.write(username + "\n");
		//response.end("Footer\n");

	}
}

module.exports.home = home;
module.exports.user = user