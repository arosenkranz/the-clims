var Spotify = require("node-spotify-api");
var Inquirer = require("inquirer");
var Dotenv = require("dotenv").config();

var spotifyClient = new Spotify({id: process.env.SPOTIFY_CLIENT_ID, secret: process.env.SPOTIFY_CLIENT_SECRET});

function Music() {
  this.songsListenedTo = [];

  var THIS = this;

  this.getPlaylistTracks = function (playlistId) {
    console.log(playlistId);
    var playlistTracks = [];
    spotifyClient
      .request("https://api.spotify.com/v1/users/alexrosenkranz/playlists/" + playlistId + "/tracks?limit=50")
      .then(function (data) {
        console.log(data);
      });
  }

  this.lookForPlaylist = function () {
    var playList = [];
    spotifyClient
      .request("https://api.spotify.com/v1/users/alexrosenkranz/playlists")
      .then(function (data) {
        playList = data.items;
        THIS.pickPlaylist(playList);        
      });
  }

  this.pickPlaylist = function (playlists) {
    var playlistNames = [];
    var pickedPlaylistId;
    for (var i = 0; i < playlists.length; i++) {
      playlistNames.push(playlists[i].name);
    }
    Inquirer.prompt([
        {
          name: "playlistSelected",
          message: "What playlist are you going to listen to?",
          type: "list",
          choices: playlistNames
        }
      ]).then(function (playlistPicker) {

        for (var i = 0; i < playlists.length; i++) {
          if (playlists[i].name === playlistPicker.playlistSelected) {
            pickedPlaylistId = playlists[i].id;
          }
        }
        console.log(pickedPlaylistId);
        THIS.getPlaylistTracks(pickedPlaylistId);        
      });
      
  }

}

var newListener = new Music();
newListener.lookForPlaylist();