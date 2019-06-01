var wordList = ["covfefe", "tight", "flavor", "pass", "navy", "peasant", "ridge", "slump", "outlook", "scrap", "crevice", "determine", "fling", "texture", "rub", "citizen", "crouch", "facade", "harvest", "physical", "bell", "breeze", "upset", "limited", "bounce", "cap", "sun", "elaborate", "herd", "useful", "stand", "resist", "clinic", "alive", "use", "country", "tycoon", "terms", "irony", "score", "ton", "plant", "basin", "folk", "root", "ego", "goat", "stage", "dry", "powder", "straw"];
// future feature: poll a random word generating API to build wordList

// the gallows is already in the html. These are the elements of the man:
var svgElements = ['<circle fill="none" stroke="#000000" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" cx="181.032199" cy="90.062339" r="52.325901" id="head"/>',
	'<line fill="none" stroke="#000000" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="181.032199" y1="144.062339" x2="182.032199" y2="301.062339" id="torso"/>',
	' <line fill="none" stroke="#000000" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="121.425061" y1="157.419516" x2="180.353635" y2="216.34809" id="left_arm"/>',
	'<line fill="none" stroke="#000000" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="180.353632" y1="159.205231" x2="239.282206" y2="218.133805" id="right_arm" transform="rotate(90 209.8179168701172,188.66950988769534) "/>',
	'<line fill="none" stroke="#000000" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="122.317914" y1="302.955229" x2="181.246488" y2="361.883803" id="left_leg" transform="rotate(90 151.78219604492185,332.41952514648443) "/>',
	'<line fill="none" stroke="#000000" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="182.121835" y1="302.955229" x2="241.050409" y2="361.883803" id="right_leg"/>'
];

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
	$("#svg").html(`<title>Layer 1</title>
				<line fill="none" stroke="#000000" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="2.5" y1="404.460793" x2="123.486114" y2="404.460793" id="gallows base"/>
				<line fill="none" stroke="#000000" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="62.303922" y1="4.460785" x2="62.303922" y2="406.852957" id="gallows upright"/>
				<line fill="none" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="59.362741" y1="2.500001" x2="182.07208" y2="2.500001" id="gallows upright" stroke="#000000"/>
				<line fill="none" stroke="#000000" stroke-width="5" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x1="177.009807" y1="19.166668" x2="177.009807" y2="5.441177" id="rope"/>`);
	$(".alert").remove();
	$(".invisible").removeClass("invisible");
	gameOver = false;
}

// act on a wrong guess and check whether user has lost the game
function wrongGuess(letter) {
	totalWrong++;
	$("#wrongGuesses").append(" " + letter);
	document.getElementById("svg").innerHTML += svgElements[totalWrong - 1]; //jQuery doesn't play well with the XML markup of SVG
	alreadyGuessed.push(letter);
	$("#" + letter).addClass("invisible"); // hide the letter button. ".invisible" is a Bootstrap class
	if (totalWrong === 6) {
		$("#rightCol").append(`
			<div class="alert alert-danger alert-dismissible" role="alert">
				<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h3>Sorry, you lost.</h3>
				<p>The word was "${mysteryWord}."</p>
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
			<div class="alert alert-success alert-dismissible" role="alert">
				<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h3>Yay! You won!</h3>
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