//Imported inquirer package and word constructor
let inquirer = require('inquirer')
let Word = require('./Word.js')

//List of words to play
let wordsToGuess = ['Nuka Cola', 'caps', 'vault', 'wastelander', 'jet', 'PipBoy', 'chems']
let chosenWord = ""
let roundWord = ""
let guessesRemaining = 0

function displayGuessesRemaining() {
    console.log(`You have ${guessesRemaining} guesses remaining.`)
}

//Begins round of game
function start() {
    chosenWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]
    roundWord = new Word(chosenWord)
    roundWord.createWord()
    guessesRemaining = 5
    console.log(`\n\rTerminal connected.`)
    displayGuessesRemaining()
    game()
}

//Takes user guess
function game() {
    if (guessesRemaining > 0) {
        console.log(roundWord.displayWord())
        inquirer.prompt([
            {
                type: 'input',
                message: 'Guess a letter:',
                name: 'userGuess'
            }]).then(answer => {
                checkAnswer(answer)
            })
    } else {
        console.log(`Out of guesses.`)
        console.log(`The word was ${chosenWord}.`)
        reset()
    }
}

//Checks user guess
function checkAnswer(answer) {
    if (/^[a-zA-Z]$/.test(answer.userGuess)) {
        let currentWord = roundWord.displayWord()
        roundWord.letterCheck(answer.userGuess)
        if (currentWord === roundWord.displayWord()) {
            guessesRemaining--
            console.log(`\n\rThe letter ${answer.userGuess} does not exist in the word!`)
            displayGuessesRemaining()
            game()
        }
        else {
            console.log(`\n\r${answer.userGuess} is in the word!`)
            if (roundWord.displayWord() === chosenWord) {
                console.log(`Success.`)
                console.log(`The word is ${chosenWord}.`)
                reset()
            }
            else {
                displayGuessesRemaining()
                game()
            }
        }
    }
    else {
        console.log(`Terminal accepts only a single letter.`)
        game()
    }
}


//Reset word and ask if user would like to try again
function reset() {
    chosenWord = ""
    roundWord = ""
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Terminal resetting. Would you like to try again?',
            name: 'retry'
        }
    ]).then(answer => {
        if (answer.retry) {

            start()
        } else {
            console.log(`Terminal disconnected.`)
        }
    })
}

start()