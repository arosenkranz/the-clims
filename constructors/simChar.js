var fs = require("fs");
var Music = require("./listen");

const Character = function (name, age) {
  // vitals
  this.saveId = Math.floor(Math.random() * 45000);
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
  var THIS = this;

};
Character.prototype.saveGame = function (quitGame, playSim) {
  var saveData = {
    saveId: this.saveId,
    name: this.name,
    age: this.age,
    hairColor: this.hairColor,
    health: this.health,
    bored: this.bored,
    hungry: this.hungry,
    potty: this.potty,
    bankAccount: this.bankAcct,
    music: this.music
  }
  fs.readFile("savedChar.js", "utf8", function (err, result) {
    var savedArr = [];
    if (!result) {
      savedArr = [saveData];
    } else {
      var foundSave = false;
      for (var i = 0; i < result.length; i++) {
        if (result[i].saveId === this.saveId) {
          foundSave = true;
          result[i].saveId = saveData;
        }
      }
      if (!foundSave) {
        savedArr = result.push(saveData);        
      }
    }
    fs
      .writeFile("saveChar.js", JSON.stringify(savedArr), function (err) {
        if (err) {
          console.log("SOMETHING WENT WRONG!");
          return console.log(err);
        }
        if (quitGame) {
          return false;
        } else {
          playSim();
        }
      });
  });
}

Character.prototype.printCharStats = function () {
  console.log('\n===== YOUR CHARACTER STATS =====\n');
  for (key in this) {
    if (typeof (this[key]) !== 'function') {
      console.log(`${key}: ${this[key]}`);
    }
  }
  console.log('\n===== END STATS =====\n');
};

Character.prototype.setAttributes = function () {
  const hairChoices = [
    'Black',
    'Silver',
    'Blonde',
    'Beach Blonde',
    'Brown',
    'Red',
    'Hot Pink'
  ];
  this.hairColor = hairChoices[Math.floor(Math.random() * hairChoices.length)];
  this.health = 100 - Math.floor(Math.random() * this.age);
  this.bankAcct = (2500 + (Math.floor(Math.random() * this.age) * 4));
  this.printCharStats();
};

Character.prototype.chillax = function (playSim) {
  this.bankAcct -= Math.floor(Math.random() * 3);  
  this.music.lookForPlaylist(playSim);
  this.health += 3;
  this.bored = true;
};

Character.prototype.eat = function (playSim) {
  this.hungry = false;
  this.bankAcct -= Math.floor(Math.random() * 15) + 4;
  this.potty = true;
  this.printCharStats();
  playSim();  
};

Character.prototype.potty = function(playSim) {
  this.bankAcct -= Math.floor(Math.random() * 6) + 1;
  
  this.potty = false;
  this.bored = true;
  this.printCharStats();
  playSim();  
};

module.exports = Character;