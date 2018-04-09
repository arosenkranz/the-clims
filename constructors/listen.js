var Spotify = require('node-spotify-api');
var inquirer = require('inquirer');
require('dotenv').config();

var spotifyClient = new Spotify({
  id: process.env.SPOTIFY_CLIENT_ID,
  secret: process.env.SPOTIFY_CLIENT_SECRET
});

function Music() {
  this.songsListenedTo = [];
  this.playSim;

  // save reference to this because of scoping inside of spotify object
  var THISmusic = this;

  this.getPlaylistTracks = function(playlistId) {
    console.log(playlistId);
    var playlistTracks = [];
    spotifyClient
      .request('https://api.spotify.com/v1/users/alexrosenkranz/playlists/' + playlistId + '/tracks?limit=30')
      .then(function(data) {
        for (var i = 0; i < data.items.length; i++) {
          playlistTracks.push('"' + data.items[i].track.name + '" by ' + data.items[i].track.album.artists[0]['name']);
        }
        THISmusic.pickTrack(playlistTracks);
      });
  };

  this.pickTrack = function(tracks) {
    inquirer
      .prompt([
        {
          name: 'trackSelected',
          message: 'What song are you going to listen to?',
          type: 'list',
          choices: tracks
        }
      ])
      .then(function(trackPicker) {
        console.log('\n============');
        console.log('You just listened to...');
        console.log(trackPicker.trackSelected);
        console.log('============\n');
        THISmusic.songsListenedTo.push(trackPicker.trackSelected);
        // for (var i = 0; i < tracks.length; i++) {
        //   if (tracks[i] === trackPicker.trackSelected) {

        //     THISmusic
        //       .songsListenedTo
        //       .push(tracks[i]);
        //   }
        // }
        THISmusic.playSim();
      });
  };

  this.lookForPlaylist = function(playSim) {
    var playList = [];
    this.playSim = playSim;
    console.log('loaded');
    spotifyClient.request('https://api.spotify.com/v1/users/alexrosenkranz/playlists').then(function(data) {
      playList = data.items;
      THISmusic.pickPlaylist(playList);
    });
  };

  this.pickPlaylist = function(playlists) {
    var playlistNames = [];
    var pickedPlaylistId;
    for (var i = 0; i < playlists.length; i++) {
      playlistNames.push(playlists[i].name);
    }
    inquirer
      .prompt([
        {
          name: 'playlistSelected',
          message: 'What playlist are you going to listen to?',
          type: 'list',
          choices: playlistNames
        }
      ])
      .then(function(playlistPicker) {
        for (var i = 0; i < playlists.length; i++) {
          if (playlists[i].name === playlistPicker.playlistSelected) {
            pickedPlaylistId = playlists[i].id;
          }
        }
        console.log(pickedPlaylistId);
        THISmusic.getPlaylistTracks(pickedPlaylistId);
      });
  };
}

module.exports = Music;
