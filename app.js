// IIFE - Immediately Invoked Function Expression
(function runGame() {
  // Load in dotenv
  require('dotenv').config();

  // Import fs
  var fs = require('fs');
  
  // Import inquirer
  var inquirer = require('inquirer');

  // Import our Character constructor
  var Character = require('./constructors/simChar');
  var yourSim = {};
  var saveGame = [];

  // Function to read our saved game info
  function readSave() {
    if (fs.existsSync('saveChar.json')) {
      fs.readFile('saveChar.json', 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
        if (data) {
          saveGame = JSON.parse(data);
        }
        loadGame(saveGame);
      });
    } else {
      loadGame([]);
    }
  }
  //  =============================
  function newGame() {
    inquirer
      .prompt([
        {
          name: 'name',
          message: 'What is your character\'s name?',
          type: 'input',
          default: 'Doctor Flan, Medicine Woman'
        },
        {
          name: 'age',
          message: 'How old is your character? (Any age between 7 and 70)',
          type: 'input',
          validate: function(value) {
            if (!isNaN(value) && parseInt(value) >= 7 && parseInt(value) <= 70) {
              return true;
            }
            console.log('Wrong age! Read the instructions!');
            return false;
          }
        }
      ])
      .then(function(newCharDeets) {
        // set char name and age
        // console.log(newCharDeets);
        yourSim = new Character(newCharDeets.name, parseInt(newCharDeets.age), playSim);

        // randomize some attributes
        yourSim.setAttributes();
        yourSim.saveGame(false, playSim);

        // playSim();
      });
  }
  //  =============================

  //  =============================

  function savedGame(savedCharDataArr) {
    var charNameArr = [];

    for (var i = 0; i < savedCharDataArr.length; i++) {
      charNameArr.push(savedCharDataArr[i].name);
    }
    charNameArr.push('Create a new character');

    inquirer
      .prompt([
        {
          name: 'characterName',
          message: 'Pick a saved character',
          type: 'list',
          choices: charNameArr
        }
      ])
      .then(function(selectedChar) {
        if (selectedChar.characterName === 'Create a new character') {
          newGame();
        } else {
          var loadedChar = {};

          for (var i = 0; i < savedCharDataArr.length; i++) {
            if (savedCharDataArr[i].name === selectedChar.characterName) {
              console.log(savedCharDataArr[i]);
              loadedChar = savedCharDataArr[i];
            }
          }
          yourSim = new Character(loadedChar.name, parseInt(loadedChar.age));
          console.log('LINE 102');
          console.log(loadedChar);
          yourSim.saveId = loadedChar.saveId;
          yourSim.hairColor = loadedChar.hairColor;
          yourSim.health = loadedChar.health;
          yourSim.bankAcct = loadedChar.bankAcct;
          yourSim.music.songsListenedTo = loadedChar.music;
          yourSim.printCharStats();
          playSim();
        }
      });
  }
  //  =============================

  function loadGame(gameInfo) {
    if (gameInfo.length > 0) {
      savedGame(gameInfo);
    } else {
      newGame();
    }
  }

  var playSim = function() {
    inquirer
      .prompt([
        {
          name: 'activity',
          type: 'list',
          message: 'What do you want to do?',
          choices: ['Chillax (Listen to music)', 'Eat', 'Potty', 'Save Game', 'Save Game and Quit', 'Restart Game']
        }
      ])
      .then(function(activityPicked) {
        switch (activityPicked.activity) {
        case 'Chillax (Listen to music)':
          yourSim.chillax(playSim);
          break;
        case 'Eat':
          yourSim.eat(playSim);
          break;
        case 'Potty':
          yourSim.goPotty(playSim);
          break;
        case 'Save Game':
          yourSim.saveGame(false, playSim);
          break;
        case 'Save Game & Quit':
          yourSim.saveGame(true, playSim);
          break;
        case 'Restart Game':
          readSave();
          break;
        }
      });
  };
  readSave();
})();
