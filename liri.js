//Node modules imports needed to run the functions
require('dotenv').config();
var fs = require("fs");
var request = require("request");
var keys = require("./key.js");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var appCommand = process.argv[2];

// Switch statement for appCommand
switch (appCommand) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;

        //Default output in command line

    default:
        console.log("\n" + "Try typing one of the following commands after 'node liri.js' : " + "\n" +
            "1. my-tweets 'any twitter name' " + "\n" +
            "2. spotify-this-song 'any song name' " + "\n" +
            "3. movie-this 'any movie name' " + "\n" +
            "4. do-what-it-says." + "\n" +
            "Please put the movie or song name in quotation marks if it's more than one word.");
};

//Function for the movie request API
function movieThis() {
    var movie = process.argv[3];
    if (!movie) {
        movie = "mr nobody";
    }
    var params = movie
    request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieObject = JSON.parse(body);

            var movieResults =
                "Title: " + movieObject.Title + "\n" +
                "Year: " + movieObject.Year + "\n" +
                "Imdb Rating: " + movieObject.imdbRating + "\n" +
                "Country: " + movieObject.Country + "\n" +
                "Language: " + movieObject.Language + "\n" +
                "Plot: " + movieObject.Plot + "\n" +
                "Actors: " + movieObject.Actors + "\n" +
                "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\n" +
                "Rotten TomatoesURL: " + movieObject.tomatoURL + "\n"

            console.log(movieResults);
            log(movieResults);
        } else {
            console.log("Error :" + error);
            return;
        }
    });

};
// Tweet function, uses the Twitter module to call the Twitter api
function myTweets() {
    var client = new twitter(keys.twitter);
    var twitterUsername = process.argv[3];
    if (!twitterUsername) {
        twitterUsername = "Melvin Gordon";
    }
    var params = {
        screen_name: twitterUsername
    };
    client.get("statuses/user_timeline/", params, function (error, data, response) {
        if (!error) {
            for (var i = 0; i < data.length; i++) {
                //console.log(response); // Show the full response in the terminal
                var twitterResults =
                    "@" + data[i].user.screen_name + ": " +
                    data[i].text + "\r\n" +
                    data[i].created_at + "\r\n" +
                    "------------------------------ " + i + " ------------------------------" + "\r\n";
                console.log(twitterResults);
                log(twitterResults); // calling log function
            }
        } else {
            console.log("Error :" + error);
            return;
        }
    });
}
// Spotify function, uses the Spotify module to call the Spotify api
function spotifyThisSong(songName) {
    var songName = process.argv[3];
    if (!songName) {
        songName = "What's my age again";
    }
    var params = songName;
    var spotify = new Spotify(keys.spotify);
    spotify.search({
        type: "track",
        query: params
    }, function (err, data) {
        if (!err) {
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var spotifyResults =
                        "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                        "Song: " + songInfo[i].name + "\r\n" +
                        "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                        "Preview Url: " + songInfo[i].preview_url + "\r\n" +
                        "------------------------------ " + i + " ------------------------------" + "\r\n";
                    console.log(spotifyResults);
                    log(spotifyResults); // calling log function
                }
            }
        } else {
            console.log("Error :" + err);
            return;
        }
    });
};
// Do What It Says function, uses the reads and writes module to access the random.txt file and do what's written in it
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error) {
            var doWhatItSaysResults = data.split(",");
            spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
        } else {
            console.log("Error occurred" + error);
        }
    });
};
// Do What It Says function, uses the reads and writes module to access the log.txt file and write everything that returns in terminal in the log.txt file
function log(logResults) {
    fs.appendFile("log.txt", logResults, function (error) {
        if (error) {
            throw error;
        }
    });
}