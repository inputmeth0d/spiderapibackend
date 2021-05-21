var fs = require('fs');
var data = fs.readFileSync('SpiderData.json');
var spiders = JSON.parse(data);
const express = require("express");
const app = express();
const cors=require('cors');

app.use('/', express.static('html'));

module.exports = app;
	
const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});
	
app.use(express.static('public'));
app.use(cors());

app.get('', homePage);

function homePage(request, response) {
	response.writeHead(200, { 'content-type': 'text/html' })
  fs.createReadStream('index.html').pipe(response)
})
}

// when get request is made, alldata() is called
app.get('/spiders', alldata);

function alldata(request, response) {
	
	// Returns all information about the elements
	response.send(spiders);
}

app.get('/spiders/:spider/', searchSpider);

function searchSpider(request, response) {
	var word = request.params.spider;
	
	
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
