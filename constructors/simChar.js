var fs = require('fs');
var uuidv4 = require('uuid/v4');
var Music = require('./listen');

var Character = function(name, age) {
  // vitals
  this.saveId = uuidv4();
  this.name = name;
  this.age = age;
  this.hairColor;
  this.health = 0;
  this.bored = true;
  this.hungry = false;
  this.thirsty = false;
  this.potty = false;
  this.bankAcct = 0;
  this.music = new Music();
};

Character.prototype.saveGame = function(quitGame, playSim) {
  var saveData = {
    saveId: this.saveId,
    name: this.name,
    age: this.age,
    hairColor: this.hairColor,
    health: this.health,
    bored: this.bored,
    hungry: this.hungry,
    thirsty: this.thirsty,
    potty: this.potty,
    bankAccount: this.bankAcct,
    music: this.music.songsListenedTo
  };
  console.log('========= line 30 ==========');
  console.log(saveData);

  fs.readFile('saveChar.json', 'utf8', function(err, result) {
    var savedArr = [];
    var returnedData = [];
    // if there is data, parse it
    if (result) {
      returnedData = JSON.parse(result);
      console.log('========= line 43 ==========');

      console.log(returnedData);
      console.log('save found');
    }
    console.log('========= line 48 ==========');

    console.log(returnedData);
    
    // if there is no returned data
    if (returnedData.length === 0) {
      savedArr = [saveData];
      console.log('========= line 55 ==========');

      console.log(savedArr);
    } 
    else {
      savedArr = returnedData;
      var foundSave = false;
      // for (var key in returnedData) {
      //   if (returnedData.saveId === this.saveId) {
      //     foundSave = true;
      //     console.log('this hit');
      //     savedArr[key] = saveData;
      //   }
      // }
      savedArr.forEach(function(character, i) {
        console.log(character.saveId);
        console.log(saveData.saveId);
        
        if (character.saveId === saveData.saveId) {
          foundSave = true;
          console.log('========= line 71 ==========');

          console.log('save game found');
          savedArr[i] = saveData;
          console.log('============ line 77 =============');
          console.log(savedArr);
        }
      });

      if (!foundSave) {
        console.log('========= line 79 ==========');

        console.log(saveData);
        savedArr = returnedData.concat(saveData);

        console.log('========= line 83 ==========');

        console.log(savedArr);
      }
    }
    console.log('71' + savedArr);
    fs.writeFile('saveChar.json', JSON.stringify(savedArr), function(err) {
      if (err) {
        console.log('SOMETHING WENT WRONG!');
        return console.log(err);
      }
      if (quitGame) {
        return false;
      } else {
        playSim();
      }
    });
  });
};

Character.prototype.printCharStats = function() {
  console.log('\n===== YOUR CHARACTER STATS =====\n');
  for (var key in this) {
    if (typeof this[key] !== 'function') {
      // ES5
      console.log(key + ': ' + this[key]);
    }
  }
  console.log('\n===== END STATS =====\n');
};

Character.prototype.setAttributes = function() {
  var hairChoices = ['Black', 'Silver', 'Blonde', 'Beach Blonde', 'Brown', 'Red', 'Hot Pink'];
  this.hairColor = hairChoices[Math.floor(Math.random() * hairChoices.length)];
  this.health = 100 - Math.floor(Math.random() * this.age);
  this.bankAcct = 2500 + Math.floor(Math.random() * this.age) * 4;
  this.printCharStats();
};

Character.prototype.chillax = function(playSim) {
  this.bankAcct -= Math.floor(Math.random() * 3);
  this.music.lookForPlaylist(playSim);
  this.health += 3;
  this.bored = true;
};

Character.prototype.eat = function(playSim) {
  this.hungry = false;
  this.bankAcct -= Math.floor(Math.random() * 15) + 4;
  this.potty = true;
  this.printCharStats();
  playSim();
};

Character.prototype.goPotty = function(playSim) {
  this.bankAcct -= Math.floor(Math.random() * 6) + 1;

  this.potty = false;
  this.bored = true;
  this.printCharStats();
  playSim();
};

module.exports = Character;
