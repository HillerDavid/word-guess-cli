// Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

//   * An array of `new` Letter objects representing the letters of the underlying word

//   * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.

//   * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)
let Letter = require('./Letter.js')


function Word(wordSelected) {
    this.newWord = wordSelected.split("")
    this.wordArray = []
    this.createWord = function () {
        for (let i = 0; i < this.newWord.length; i++) {
            let newLetter = new Letter(this.newWord[i])
            this.wordArray.push(newLetter)
        }
    }

    this.displayWord = function () {
        let display = []
        this.wordArray.forEach(function (item) {
            display.push(item.displayLetter())
        })
        return display.join("")
    }

    this.letterCheck = function (guess) {
        this.wordArray.forEach(function (item) {
            item.check(guess)
        })
    }
}

module.exports = Word