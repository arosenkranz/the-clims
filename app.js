(function runGame() {
  var fs = require('fs');
  var dotenv = require('dotenv').config();
  var inquirer = require('inquirer');

  var Character = require('./constructors/simChar');

  var yourSim = {};
  var saveGame = [];

  function readSave() {
    fs
      .readFile("saveChar.js", "utf8", function (err, data) {
        if (err) {
          return console.log(err);
        }
        if (data) {
          saveGame = JSON.parse(data);
        }
        loadGame(saveGame);

      })
  }

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
      yourSim = new Character(newCharDeets.name, parseInt(newCharDeets.age), playSim);

      // randomize some attributes
      yourSim.setAttributes();
      yourSim.saveGame(false, playSim);

      // playSim();
    });
  }

  function savedGame(savedCharDataArr) {
    var charNameArr = []

    for (var i = 0; i < savedCharDataArr.length; i++) {
      charNameArr.push(savedCharDataArr[i].name)
    }
    charNameArr.push("Create a new character");

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
        if (selectedChar.characterName === "Create a new character") {
          newGame();
        } else {
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
          playSim();
        }
      });

  }

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
          name: "activity",
          type: "list",
          message: "What do you want to do?",
          choices: [
            "Chillax (Listen to music)",
            "Eat",
            "Potty",
            "Save Game",
            "Save Game and Quit",
            "Restart Game"
          ]
      }
      ])
      .then(function (activityPicked) {
        switch (activityPicked.activity) {
          case "Chillax (Listen to music)":
            yourSim.chillax(playSim);
            break;
          case "Eat":
            yourSim.eat(playSim);
            break;
          case "Potty":
            yourSim.potty(playSim);
            break;
          case "Save Game":
            yourSim.saveGame(false, playSim);
            break;
          case "Save Game & Quit":
            yourSim.saveGame(true, playSim);
            break;
          case "Restart Game":
            readSave();
            break;
        }
      })
  }
  readSave();
}());