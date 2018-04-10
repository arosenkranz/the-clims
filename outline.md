# The CLIms (Thought Process)

> Application outline and psuedocoding to show order of operations.

## Before You Start Coding - Create User Stories

> The best way to figure out how you want your application to work is to come up with User Stories. These are statements that state what your user will be able to do with your application.

* As a user, I can create a new character/sim.

* As a user, I can tell my character to do things like eat, sleep, listen to music through Spotify, etc

* As a user, I can save my character.

* As a user, I can load my character back up from a save file and update that character.

* As a user, I can create multiple characters without deleting others.

> So now I have an idea of what I expect users to be able to do with my app, which serves as an outline for me to use when I start modelling data and building functionality.

## First - Data Models (Constructors)

> You'll want to start most applications with figuring out what data you will need to store, how you will store it, and what will you actually DO with it to give it some interactivity.
> Think of it this way, car makers don't say "come drive the car we're about to make for you", they say "we've made this car, you should come drive it".

* Before this can become a "game", I need to come up with the subjects of my game and what `attributes/properties` they will have. So we'll start at [simChar.js](constuctors/simChar.js) and come up with a few properties we want our character to have. I came up with this arbitrarily, no real rhyme or reason.

* Once my character's properties are set, I need to think of ways I can manipulate/update those properties (or else you'll just have a static character, which is useless for a game). So now I think about what possible actions my character can do and create `methods` out of them. At this point I'm not 100% sure if these will operate as intended or if they should exist where they currently live. This is common, but it's worth putting them all together now and moving them around/finessing them later on. This includes the ability to eat, potty, and chillax.

* So now I've gone through making setting my actions/`methods` to my character constructor and I'm starting to realize that my functionality for listening to music (triggered from `chillax`) is getting to be cumbersome, I have a decision to make. Either I keep it in my main character constructor, making it easier to pass data throughout one object but also creating A LOT of code for one constructor (to the point of it being unmaintanable), or I can create another constructor to just handle my music and bring that one in to my character constructor. This really helps me distinguish and separate some of the actions my character can do, and it makes `Music` constructor (in listen.js) easier to maintain (and also extendable to other constructors in the event I need another one, like if I made an `Animals` constructor and they also wanted to listen to music)

* Once I separate my character's functionality into some sub categories (`Character` has main functionality but ALSO gets to listen to music through the `Music` constructor), I start to test out the constructors by simply instantiating a few new objects with them like. If anything doesn't work, I revisit/retool my code a bit and test again.

```javascript

var alex = new Character("Alex", 30); // create a new Character object

/* test out my methods one at a time to make sure they work as intended */
alex.eat();

alex.chillax();

alex.etc();

```

## Second - Core game functionality (Make data available to user)

> We have our constructors and data modelling complete. All of our little tests work as intended. There's gonna be some things you still need to tweak when you implement it into this part, but that's fine/expected.
> Now we need to come up with a way to make this application interactive and responsive to user input.

* I create `app.js`, which serves as an "entry-point" to my application for all users. This will serve as the application's logical switchboard, taking in predetermined commands from the user and running specific functionality based on that command.

* To begin, I won't even worry with the game's save functionality. Let's just get it working with basic `inquirer` prompts to create our characters and do a quick print of their stats.

* Then I'll take that new character and make it run methods based on another `inquirer` prompt (`playSim()`). So I'll take my predetermined methods I've created for my character, and make them options in inquirer. This way the user can ONLY do what I say he/she can do, because I know what will and won't work.

* Here's where I run into a problem. I'm doing my actions correctly, but then I'm just done with my app. Meaning I have to start over again every time to set it up. This isn't usable to me, I want to do multiple things with a single character at one sitting. This is where I decided I need to update my constructors to take in callback function arguments, this way I can pass my `playSim` function into my methods and have those methods call/execute those functions upon their completion.

* The introduction of callback functions has created a great user experience. I can now interact with my character as many times as I'd like without having to leave or restart the app. This also includes functionality that runs asynchronously (such as picking a song from Spotify using Inquirer).

* I continue testing my application and make tweaks as needed. As far as I'm concerned... I have minimum viable product. Everything works as intended.


## Third - Extend game functionality (add on features)

> My game works! But it could be better. So now I start thinking of ways to extend this...

### Game Save Feature (Persistence)

* It would be great if this had persistence. Not only would it show off our ability to write and read data using `fs`, but also show off how we can instantiate multiple character constructors in one sitting.

* This is the most "trial and error"-ish part of this application's development (for me, at least). I needed to come up with a way to load, store, and check my saved character data, so I am going to store my data as a stringified `.json` file.

* When I need to use it for logic in my application, I'll parse that file and loop through it as I normally would with stored data.