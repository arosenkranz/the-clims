var Character = function (name, age) {
  // vitals
  this.name = name;
  this.age = age;
  this.hairColor
  this.health = 0
  this.bored = true;
  this.hungry = false;
  this.thirsty = false;
  this.potty = false;
  this.bankAcct = 0;

  // lists of hobbies
  this.recentlyPlayed = []
  this.recentlyWatched = []

  this.setAttributes = function () {
    var hairChoices = ['Black', 'Silver', 'Blonde', 'Beach Blonde', 'Brown', 'Red', 'Hot Pink']
    this.hairColor = hairChoices[Math.floor(Math.random() * hairChoices.length)]
    this.health = 100 - Math.floor(Math.random() * this.age);
    this.bankAcct = (2500 + (Math.floor(Math.random() * age) * 4));
    this.printCharStats();
  }

  this.chillax = function () {
    this.health += 3
    this.bored = true
  }

  this.eat = function () {
    this.hungry = false;
    this.potty = true;
  }

  this.printCharStats = function () {
    console.log("\n===== YOUR CHARACTER STATS =====\n")
    for (key in this) {
      if (typeof(this[key]) !== "function") {
        console.log(key + ": " + this[key]);
      }
    }
    console.log("\n===== END STATS =====\n")

  }
}

module.exports = Character