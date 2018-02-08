var request = require("request");

var movieName= process.argv[2];

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


request(queryUrl, function(error, response, body) {

	if (!error && response.statusCode === 200) {

	console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("Rating: " + JSON.parse(body).Rating);
    console.log("Rotten Tomatoes: " + JSON.parse(body).RottenTomatoes);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    else {
    	console.log("If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/" +
"\nIt's on Netflix!\n");
    }
  }
});