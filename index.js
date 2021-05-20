var fs = require('fs');
var data = fs.readFileSync('SpiderData.json');
var spiders = JSON.parse(data);
const express = require("express");
const app = express();
const cors=require('cors');
	
app.listen(process.env.PORT,
	() => console.log("Server Start at 5000 Port"));
	
app.use(express.static('public'));
app.use(cors());

// when get request is made, alldata() is called
app.get('/spiders', alldata);

function alldata(request, response) {
	
	// Returns all information about the elements
	response.send(spiders);
}

app.get('/spiders/:spider/', searchSpider);

function searchSpider(request, response) {
	var word = request.params.spider;
	word = word.charAt(0).toUpperCase()
		+ word.slice(1).toLowerCase();
	
	if(spiders[word]) {
		var reply = spiders[word];		
	}
	else {
		var reply = {
			status:"Not Found"
		}
	}
	console.log(reply.boil);
	response.send(reply);
}
