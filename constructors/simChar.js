var fs = require("fs");

const Character = function (name, age) {
  // vitals
  this.name = name;
  this.age = age;
  this.hairColor;
  this.health = 0;
  this.bored = true;
  this.hungry = false;
  this.thirsty = false;
  this.potty = false;
  this.bankAcct = 0;

  // lists of hobbies
};
Character.prototype.saveGame = function () {
  var saveData = {
    name: this.name,
    age: this.age,
    hairColor: this.hairColor,
    health: this.health,
    bored: this.bored,
    hungry: this.hungry,
    potty: this.potty,
    bankAccount: this.bankAcct,
  }
  fs.readFile("savedChar.js", "utf8", function (err, result) {
    var savedArr = [];
    if (!result) {
      savedArr = [saveData];
    } else {
      savedArr = result.push(saveData);
    }
    fs
      .appendFile("saveChar.js", JSON.stringify(savedArr), function (err) {
        if (err) {
          console.log("SOMETHING WENT WRONG!");
          return console.log(err);
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

Character.prototype.chillax = function () {
  this.health += 3;
  this.bored = true;
};

Character.prototype.eat = function () {
  this.hungry = false;
  this.potty = true;
};

module.exports = Character;