
//REQUEST FOR MOVIE CALLBACK//

var request = require('request');
var util = require('util');

var movieName = process.argv[2];

var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy';

request(queryUrl, function(error, response, body) {

    console.log(util.inspect(JSON.parse(body)));

    if (!error && response.statusCode === 200) {
        console.log('Title: ' + JSON.parse(body).Title);
        console.log('Release Year: ' + JSON.parse(body).Year);
        console.log('Rating: ' + JSON.parse(body).Rating);
        console.log('Rotten Tomatoes: ' + JSON.parse(body).RottenTomatoes);
        console.log('Country: ' + JSON.parse(body).Country);
        console.log('Plot: ' + JSON.parse(body).Plot);
        console.log('Actors: ' + JSON.parse(body).Actors);
    } else {
        console.log("If you haven't watched \"Mr. Nobody\", then you should: http://www.imdb.com/title/tt0485947/" + "\nIt's on Netflix!\n");
    };

//SPOTIFY REQUEST FOR CALLBACK

var spotify = require('spotify-search');


var songName = process.argv[2];

var queryUrl = 'https://beta.developer.spotify.com/dashboard/applications' + songName + '&y=&plot=short&apikey=397dacf738ec41fb9bb1b906b94f5781';

request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log('Artist: ' + JSON.parse(body).Artist);
        console.log('Song: ' + JSON.parse(body).Song);
        console.log('Preview: ' + JSON.parse(body).Preview);
        console.log('Album: ' + JSON.parse(body).Album);
    } else {
        console.log("The Sign, \nby Ace of Base\n");
    }
})

});

