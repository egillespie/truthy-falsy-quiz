// cSpell:words truthy falsy
/***********************************************
/* Set up some variables
************************************************/

// Parts of the HTML
var questionArea = document.getElementById('question-area')
var answerArea = document.getElementById('answer-area')
var nextButton = document.getElementById('next-button')
var truthyButton = document.getElementById('truthy')
var falsyButton = document.getElementById('falsy')

// Messages
var messages = {
 correct: 'Correct! 🎉 ',
 incorrect: 'Try again! 😞'
}

// Questions
var questions = {
  truthyTrue: {
    which: 'truthy',
    statements: ['true'],
    explanation: 'This is truthy, because it\'s literally <em>true</em>!'
  },
  truthyNumber: {
    which: 'truthy',
    statements: ['100', '-7', '0.25'],
    explanation: 'This is truthy, because it\'s <em>something</em> - a non-zero number!'
  },
  truthyString: {
    which: 'truthy',
    statements: ['\'apple\'', '\'green\'', '\'0\'', '\'🐱\'', '\'false\''],
    explanation: 'This is truthy, because it\'s <em>something</em> - a non-empty string!'
  },
  falsyValues: {
    which: 'falsy',
    statements: ['false', '0', 'null', 'undefined', '\'\''],
    explanation: 'This is falsy, because it is <em>nothing</em>!'
  }
}

// combine them all into your question bank
var questionBank = []

Object.keys(questions).forEach(function (key) {
  questionBank = questionBank.concat(questions[key].statements)
})

/***********************************************************
/* Functions
************************************************************/
// Declare some global variables to use later
var randomQuestion = ''
var answer = ''
var explanation = ''

// Get a question, its answer, and its explanation
var getQuestion = function() {
  // Generate a random index number for our questions array
  var randomIndex = Math.floor(Math.random() * questionBank.length)
  // Get the value with that index from questions
  randomQuestion = questionBank[randomIndex]
  // check the items of the "statements" array for each question key against value of randomQuestion
  Object.keys(questions).forEach(function (key) {
    var questionStatementsList = questions[key].statements
    // if randomQuestion is found in the statements for one of the question types (has a real index)
    if (questionStatementsList.indexOf(randomQuestion) !== -1) {
      // and now we set those values
      var currentQuestion = questions[key]
      answer = currentQuestion.which
      explanation = currentQuestion.explanation
    }
  })
}

var updateQuestion = function () {
  getQuestion()
  // Change the question on the page
  questionArea.innerHTML = randomQuestion
  // Make the previous answer disappear
  answerArea.innerHTML = ''
}

// Display feedback based on which button the user clicked
var feedback = function () {
  if (answer === event.target.id) {
    answerArea.innerHTML = messages.correct + explanation
  } else {
    answerArea.innerHTML = messages.incorrect
  }
}

/*************************************************************
/* And now we actually do stuff
**************************************************************/
// Initialize
updateQuestion()

// When the user clicks Truthy, show feedback
truthyButton.addEventListener('click', feedback)
// When the user clicks Falsy, show feedback
falsyButton.addEventListener('click', feedback)
// When the user clicks Next, give them a new question
nextButton.addEventListener('click', updateQuestion)
