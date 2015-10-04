/** @jsx React.DOM */

// The board consists of four rows of four blocks(pictures) each.
var board = React.createClass({
	
	render: function() {
		// Each row get different numbers from the array.
		var row1Numbers = this.props.numbers.slice(0, 4);
		var row2Numbers = this.props.numbers.slice(4, 8);
		var row3Numbers = this.props.numbers.slice(8, 12);
		var row4Numbers = this.props.numbers.slice(12, 16);
		
		return (
			<div>
				<button className="scrambleButton" onClick={startGame}>Scramble</button>
				<row numbers={row1Numbers}></row>
				<row numbers={row2Numbers}></row>
				<row numbers={row3Numbers}></row>
				<row numbers={row4Numbers}></row>
			</div>
		);
	}
});

// A horizontal row of four blocks with pictures.
var row = React.createClass({
	
	render: function() {
		return (
			<div className="row">
				<block number={this.props.numbers[0]}></block>
				<block number={this.props.numbers[1]}></block>
				<block number={this.props.numbers[2]}></block>
				<block number={this.props.numbers[3]} style="clear: both"></block>
			</div>
		);
	}
});

// A block contains a picture that's part of the puzzle.
var block = React.createClass({
	
	render: function(event) {
		// Numbers below 10 need to get a 0 added to the name to match the names of the pictures, 3 becomes 03 etc.
		var sourceNumber = this.props.number < 10 ? "0" + this.props.number : this.props.number;
		var imageSource = "images/katt_" + sourceNumber + ".png";
		
		return (
			<div className="imageDiv">
				<img src={imageSource} onClick={this.clicked} />
			</div>
		);
	},
	// If an image is clicked.
	clicked: function() {
			
		clickedImage = this.props.number;
		updateBoard();
	}
});

var clickedImage;
function updateBoard(event) {
	
	// Block with imageNumber 16 is the empty picture. Nothing happens when you click it.
	if (clickedImage == 16) {
		return;
	}
	
	// Check if the clicked image is adjacent to the empty image.
	var clickedIndex = imageNumbers.indexOf(clickedImage);
	// Find if the empty image is adjacent to the clicked one.
	var emptyIndex = checkNeighbours(clickedIndex);
	
	// If the empty image is adjacent.
	if (emptyIndex > -1) {
		// Swap images: swap numbers in imageNumbers at clickedIndex and emptyIndex.
		// The blocks don't change position, they only swap images between each other.
		
		// The empty image gets the clicked images number.
		imageNumbers[emptyIndex] = clickedImage;
		// The clicked image becomes the empty image, which is always number 16.
		imageNumbers[clickedIndex] = 16;
		
		// Redraw board.
		renderBoard();
		
		// Check if puzzle is solved.
		var isSolved = checkStatus();
		if (isSolved) {
			endGame();
		}
	}
}

// Find if a clicked image is neighbouring the empty image.
function checkNeighbours(clickedIndex) {
	// Since the board is 4x4 the adjacent images are at places -1, +1, -4 or +4 in the array imageNumbers.
	if (clickedIndex -1 > -1 && imageNumbers[clickedIndex -1] == 16) {
		// Return the index of the empty image.
		return clickedIndex -1;
	}
	else if (clickedIndex +1 < imageNumbers.length && imageNumbers[clickedIndex +1] == 16) {
		// Return the index of the empty image.
		return clickedIndex +1;
	}
	else if (clickedIndex -4 > -1 && imageNumbers[clickedIndex -4] == 16) {
		// Return the index of the empty image.
		return clickedIndex -4;
	}
	else if (clickedIndex +4 < imageNumbers.length && imageNumbers[clickedIndex +4] == 16) {
		// Return the index of the empty image.
		return clickedIndex +4;
	}
	
	// If the empty image is not a neighbour.
	return -1;
}

// See if the puzzle is solved = if all numbers in imageNumbers are in order.
function checkStatus() {
	
	for (var i = 0; i < imageNumbers.length; i++) {
		
		// If one of the images is in the wrong position in the array, return false.
		if (imageNumbers[i] != i + 1) {
			return false;
		}
	}
	
	// All images art in the right place.
	return true;
}

// At start of game or when Scramble button is pressed.
function startGame() {
	$("#successHeader").css("visibility", "hidden");
	$(".imageDiv").css("border-width", "1px");
	
	scramblePictures();
	renderBoard();
}

// When all pictures in the pazzle are in the right place.
function endGame() {
	$("#successHeader").css("visibility", "visible");
	$(".imageDiv").css("border-width", "0px");
}

function scramblePictures() {
	// Go through all numbers.
	for (var i = 0; i < imageNumbers.length; i++) {
		// Find another number and swap them. Can swap with itself, doesn't matter.
		// Generate a number between 0 and 15.
		var rand = Math.floor((Math.random() * 15) + 1);
		
		tmpNum = imageNumbers[i];
		
		imageNumbers[i] = imageNumbers[rand];
		imageNumbers[rand] = tmpNum;
	}
	
	console.log(imageNumbers);
}

// The numbers for the images.
var imageNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

startGame();

function renderBoard() {
	React.renderComponent(
		board({numbers: imageNumbers}),
		document.getElementById("reactContainer")
	);
}















	