var fs = require('fs')
var inquirer = require('inquirer')

var Character = require('./constructors/actionPrompts')

var yourSim = {};

inquirer.prompt([{
    name: 'name',
    message: "What is your character's name?",
    type: 'input',
    default: 'Doctor Flan, Medicine Woman'
  },
  {
    name: 'age',
    message: 'How old is you character? (Any age between 7 and 70)',
    type: 'input',
    validate: function (value) {
      if (!isNaN(value) && parseInt(value) >= 7 && parseInt(value) <= 70) {
        return true
      } else {
        console.log('Wrong age! Read the instructions!')
        return false
      }
    }
  }
]).then(function (newCharDeets) {
  
    // set char name and age
    yourSim = new Character(newCharDeets.name, newCharDeets.age);

    // randomize some attributes
    yourSim.setAttributes();

    console.log(typeof(yourSim.setAttributes))

    // playSim();
  
});

// FOR LATER
// this.savedChar = function (savedCharDataArr) {
//   var charNameArr = []

//   for (var i = 0; i < savedCharDataArr.length; i++) {
//     charNameArr.push(savedCharDataArr[i].name)
//   }

//   inquirer.prompt([{
//     name: 'characterName',
//     message: 'Pick a saved character',
//     type: 'list',
//     choices: charNameArr
//   }]).then(function (selectedChar) {
//     var loadedChar = {}

//     for (var i = 0; i < savedCharDataArr.length; i++) {
//       if (savedCharDataArr[i].name === selectedChar.characterName) {
//         loadedChar = savedCharDataArr[i]
//       }
//     }
//     this.name = loadedChar.name
//     this.age = parseInt(loadedChar.age)
//     this.hairColor = loadedChar.hairColor
//     this.health = loadedChar.health
//     this.recentlyPlayed = loadedChar.recentlyPlayed
//     this.recentlyWatched = loadedChar.recentlyWatched

//     this.printCharStats()
//   })
// };