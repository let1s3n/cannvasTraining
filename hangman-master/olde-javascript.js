var wordList = ["covfefe", "forsooth", "thou", "murrain", "cheesewit", "swain", "anon", "knave", "bethink", "forbear", "pate", "swounds", "verily", "methinkst", "milady", "herein", "heretofore", "wearisome", "sooth", "calumny", "dukedom", "sack", "tuppence", "nonce", "raiment", "besmirch", "bedight", "liege"];
// future feature: poll a random word generating API to build wordList

var mysteryWord = "";
var totalRight = 0;
var totalWrong = 0;
var alreadyGuessed = [];
var gameOver = false; // set to true to halt input on win or loss

// The computer picks a word from the list and updates the DOM. To be run at the start of every game (included in reset()).
function pickWord() {
	mysteryWord = wordList[Math.floor(Math.random() * wordList.length)];
	console.log(mysteryWord);
	$("#wordBlanks").html("Mystery word: "); //clear possible contents from a previous game
	for (var i = 0; i < mysteryWord.length; i++) {
		$("#wordBlanks").append(`<span id="blank${i}"> _</span>`);
	}
}

// reset DOM and counter variables at the start of each game
function reset() {
	totalRight = 0;
	totalWrong = 0;
	alreadyGuessed = [];
	pickWord();
	$("#wrongGuesses").html("Wrong guesses: ");
	$("#hangPic").attr("src", "assets/images/hangman-woodcut0.gif");
	$(".alert").remove();
	$(".invisible").removeClass("invisible");
	gameOver = false;
}

// act on a wrong guess and check whether user has lost the game
function wrongGuess(letter) {
	totalWrong++;
	$("#wrongGuesses").append(" " + letter);
	$("#hangPic").attr("src", "assets/images/hangman-woodcut" + totalWrong + ".gif");
	alreadyGuessed.push(letter);
	$("#" + letter).addClass("invisible"); // hide the letter button. ".invisible" is a Bootstrap class
	if (totalWrong === 6) {
		$("#rightCol").append(`
			<div class="alert alert-danger" role="alert">
				<h3>Alack-a-day! Th&rsquo;art lost!</h3>
				<p>The word was, verily, &ldquo;${mysteryWord}.&rdquo;</p>
				<button type="button" class="btn btn-default btn-lg btn-block" onclick="reset()">Play again</button>
			</div>`);
		gameOver = true;
	}
}

// act on a right guess and check whether user has won the game	
function rightGuess(letter) {
	for (var i = 0; i < mysteryWord.length; i++) {
		if (mysteryWord[i] === letter) {
			totalRight++; //iterate here, inside the loop, to account for multiple ocurrences of the same letter withing mysteryWord
			$("#blank" + i).html(" " + letter);
		}
	}
	alreadyGuessed.push(letter);
	$("#" + letter).addClass("invisible");
	if (totalRight === mysteryWord.length) {
		$("#rightCol").append(`
			<div class="alert alert-success" role="alert">
				<h3>Good cheer! Thou hast carried the day!</h3>
				<button type="button" class="btn btn-default btn-lg btn-block" onclick="reset()">Play again</button>
			</div>`);
		gameOver = true;
	}
}

function guessletter(userGuess) {
	console.log(userGuess);
	if (gameOver === true || !(/^[a-z]$/).test(userGuess) || alreadyGuessed.includes(userGuess)) {
		return; // reject input if game is over, key pressed is not a letter, or letter has already been guessed
	} else if (!mysteryWord.includes(userGuess)) {
		wrongGuess(userGuess);
	} else {
		rightGuess(userGuess);
	}
}

window.onload = function () {
	pickWord();
	$("#instructionModal").modal();
} 

document.onkeyup = function (e) {
	var letter = e.key.toLowerCase();
	guessletter(letter);
}

// instead of $.click, the usage below alows for touch devices too
$(".alphaBtn").on('click touchstart', function () {
	guessletter($(this).text().toLowerCase());
});

// future: display score, have a score reset button