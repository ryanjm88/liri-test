require("dotenv").config();

// file system
var fs = require("fs");

// importing API keys
var keys = require("./keys.js");

// requiring Spotify and Twitter dependencies
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var request = require("request");

// setting command variables for terminal arguments
var comm1 = process.argv[2];
var comm2 = process.argv[3];

// using Twitter constructor in function to pull 20 most recent tweets 
var showTweets = function() {
    var client = new Twitter(keys.twitter);
    if (comm1 === "my-tweets")  {
        var params = { screen_name: "ryethemack", count: 20};
        client.get("statuses/user_timeline", params, function(error, tweets)  {
            if(!error)  {
                console.log("Tweets: ")
                for (var i = 0; i < tweets.length; i++) {
                        console.log(tweets[i].text);
                        console.log("---------------------------------------");
                };
            };
        });
    };
};

// pulls five Spotify tracks with Spotify constructor
var showTrack = function(trackName)   {
    var spotify = new Spotify(keys.spotify);
    if (comm1 === "spotify-this-song")  {
      var trackTitle = comm2;
      spotify.search({ type: 'track', query: trackTitle }, function(error, data)    {
          if(trackTitle)    {
              var dataSong1 = data.tracks.items;
              for(var i = 0; i < 5; i++)  {
                  console.log(dataSong1[i].name);
                  for (var j = 0; j < dataSong1[i].artists.length; j++){
                    console.log(dataSong1[i].artists[j].name);
                  }
                  console.log(dataSong1[i].album.name);
                  console.log(dataSong1[i].album.href);
                  console.log("---------------------------------");
              }
          }

          else{
              spotify.search({ type: 'track', query: "The Sign"}, function(error, data) {
                  var dataSong2 = data.tracks.items;
                  console.log(dataSong2[0].name);
              });
          }
      });
    }
}

// Using OMDB API to get movie stats
var showMovie = function(movieName) {
    if(comm1 === "movie-this")  {
        var movieTitle = comm2;
        request("http://www.omdbapi.com/?apikey=7feb1e98&t=" + movieTitle, function(error, response, body)    {
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).Ratings);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
        })
    }
       if (comm1 === "movie-this" && comm2 === undefined) {
        request("http://www.omdbapi.com/?apikey=7feb1e98&t=mr+nobody", function(error, response, body)  {
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).Ratings);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
        });

    }
}

// reads text file
var readRandom = function(readFile) {
    if(comm1 === "do-what-it-says") {
        fs.readFile("random.txt", "utf-8", function(error, data)    {
            console.log(data);
            var readThis = data.split(", ");
            console.log(readThis);
        });
    }
}

// calling functions
readRandom();
showMovie();
showTrack();
showTweets();