(function runGame() {
  var fs = require('fs');
  var dotenv = require('dotenv').config();
  var inquirer = require('inquirer');

  var Character = require('./constructors/simChar');

  var yourSim = {};
  var saveGame = [];

  fs.readFile("saveChar.js", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    if (data) {
      saveGame = JSON.parse(data);
      console.log(saveGame);
    }
    loadGame(saveGame);

  })

  function newGame() {
    inquirer.prompt([
      {
        name: 'name',
        message: "What is your character's name?",
        type: 'input',
        default: 'Doctor Flan, Medicine Woman'
      }, {
        name: 'age',
        message: 'How old is you character? (Any age between 7 and 70)',
        type: 'input',
        validate(value) {
          if (!isNaN(value) && parseInt(value) >= 7 && parseInt(value) <= 70) {
            return true;
          }
          console.log('Wrong age! Read the instructions!');
          return false;
        }
      }
    ]).then((newCharDeets) => {
      // set char name and age
      console.log(newCharDeets);
      yourSim = new Character(newCharDeets.name, parseInt(newCharDeets.age));

      // randomize some attributes
      yourSim.setAttributes();
      yourSim.saveGame();

      // playSim();
    });
  }

  function savedGame(savedCharDataArr) {
    var charNameArr = []

    for (var i = 0; i < savedCharDataArr.length; i++) {
      charNameArr.push(savedCharDataArr[i].name)
    }

    inquirer
      .prompt([
        {
          name: 'characterName',
          message: 'Pick a saved character',
          type: 'list',
          choices: charNameArr
        }
      ])
      .then(function (selectedChar) {
        var loadedChar = {}

        for (var i = 0; i < savedCharDataArr.length; i++) {
          if (savedCharDataArr[i].name === selectedChar.characterName) {
            loadedChar = savedCharDataArr[i]
          }
        }
        yourSim = new Character(loadedChar.name, parseInt(loadedChar.age));
        yourSim.hairColor = loadedChar.hairColor;
        yourSim.health = loadedChar.health;
        yourSim.bankAcct = loadedChar.bankAcct;
        yourSim.printCharStats()
      });

  }

  function loadGame(gameInfo) {
    if (gameInfo.length > 0) {
      savedGame(gameInfo);
    } else {
      newGame();
    }
  }
}());