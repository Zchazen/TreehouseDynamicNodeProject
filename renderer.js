
var fs = require("fs");

function mergeValues(values, content) {
	//cycle over keys
	for (var key in values) {
		content = content.replace("{{" + key + "}}", values[key]);
	}
	//replace all {{keys}} with the value from the values object


	//return merged content

}



function view(templateName, values, response) {
	//read from the template files (need template name)
	var fileContents = fs.readFileSync("./views/" + templateName + ".html", {encoding: "utf8"});
		//insert values in to the content
		fileContents = mergeValues(values, fileContents);

		//write out the contents to the response
		response.write(fileContents);

}

	//insert values into the content

	//write out to the response

module.exports.view = view;