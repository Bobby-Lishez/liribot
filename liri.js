require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
// console.log("Keys: " + keys.twitter);
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
// console.log('client: ' + client);


switch(process.argv[2]) {
    case "my-tweets": {
        var params = {screen_name: 'alfredbenson70'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (error) {
                console.log(error);
            }
            else {
                for (var i = 0; i < 20; i++) {
            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
            console.log("---------------");
                }
            }
          });
        break;
    }
    case "spotify-this-song": {
        var search = ((process.argv[3]) === undefined) ? "the sign" : process.argv[3];
        spotify.search({ type: 'track', query: search }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
        console.log("Name: " + data.tracks.items[0].name);
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("link: " + data.tracks.items[0].album.artists[0].href);
        console.log("Album: " + data.tracks.items[0].album.name);
        });
        break;
    }
    case "movie-this": {
        var movieName = (process.argv[3] === undefined) ? "Mr. Nobody" : "'" + process.argv[3] + "'";
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, (err, response, body) => {
            console.log("Name: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("Rating: " +JSON.parse(body).Rated);
            console.log("IMDB: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Cast: " + JSON.parse(body).Actors);
        })
        break;
    }
    case "do-what-it-says": {

        break;
    }
    default: console.log("Sorry, that's not an operation I can perform");
}