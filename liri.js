require("dotenv").config();
console.log(process.env.TWITTER_CONSUMER_KEY);
var Twitter = require("twitter");
var Spotify = require("node-spotify-api")
var fs = require("fs");
var keys = require("./keys.js");
console.log("Keys: " + keys.twitter);
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
console.log('client: ' + client);


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
        
        break;
    }
    case "movie-this": {break;}
    case "do-what-it-says": {break;}
    default: console.log("Sorry, that's not an operation I can perform");
}