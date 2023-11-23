/* unwinnable ai */

const cell = document.querySelectorAll(".cell");
let board;
const jatekos = "X";
const ai = "O";
const variaciok = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]


function jatek() {
	document.querySelector(".nyeres").style.display = "none";
	board = Array.from(Array(9).keys());
	for (let i = 0; i < cell.length; i++) {
		cell[i].innerText = "";
		cell[i].addEventListener("click", turnClick, false);
	}
}

function turnClick(square) {
	if (typeof board[square.target.id] == "number") {
		turn(square.target.id, jatekos)
		if (!checkWin(board, jatekos) && !checkTie()) turn(bestSpot(), ai);
	}
}

function turn(squareId, player) {
	board[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(board, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of variaciok.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let i = 0; i < cell.length; i++) {
		cell[i].removeEventListener("click", turnClick, false);
	}
	declareWinner(gameWon.player == jatekos ? "Hogyan?" : "O -Nyert");
}

function declareWinner(who) {
	document.querySelector(".nyeres").style.display = "flex";
	document.querySelector(".nyerestext").innerText = who;
}

function emptySquares() {
	return board.filter(s => typeof s == "number");
}

function bestSpot() {
	return minimax(board, ai).index;
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (let i = 0; i < cell.length; i++) {
			cell[i].removeEventListener("click", turnClick, false);
		}
		declareWinner("Döntetlen")
		return true;
	}
	return false;
}

function minimax(newBoard, player) {
	let ures = emptySquares();

	if (checkWin(newBoard, jatekos)) {
		return {score: -10};
	} else if (checkWin(newBoard, ai)) {
		return {score: 10};
	} else if (ures.length === 0) {
		return {score: 0};
	}
	let moves = [];
	for (let i = 0; i < ures.length; i++) {
		let move = {};
		move.index = newBoard[ures[i]];
		newBoard[ures[i]] = player;

		if (player == ai) {
			let eredmeny = minimax(newBoard, jatekos);
			move.score = eredmeny.score;
		} else {
			let eredmeny = minimax(newBoard, ai);
			move.score = eredmeny.score;
		}

		newBoard[ures[i]] = move.index;

		moves.push(move);
	}

	let legjobb;
	if(player === ai) {
		let pontok = -10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score > pontok) {
				pontok = moves[i].score;
				legjobb = i;
			}
		}
	} else {
		let pontok = 10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score < pontok) {
				pontok = moves[i].score;
				legjobb = i;
			}
		}
	}

	return moves[legjobb];
}

jatek();