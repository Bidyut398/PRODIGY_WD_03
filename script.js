const board = ["", "", "", "", "", "", "", "", ""]; // Initialize 3x3 game board with empty strings
let currentPlayer = "X"; // Set the starting player to X
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
]; // Define all possible winning combinations
let gameActive = true; // Track if the game is still active

function handleClick(index) { // Handle player move on a specific board index
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        updateBoard(index);
        if (checkWinner()) {
            document.getElementById("results").innerText = `${currentPlayer} Wins!`; // Display winner
            document.getElementById("play-again").style.display = "block"; // Show play again button
            gameActive = false;
        } else if (board.every(cell => cell !== "")) {
            document.getElementById("results").innerText = "It's a Draw!"; // Display draw result
            document.getElementById("play-again").style.display = "block"; // Show play again button
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch to next player
            document.getElementById("current-turn").innerText = currentPlayer; // Update turn indicator
        }
    }
}

function updateBoard(index) { // Update the visual board with the current player's mark
    const boxes = document.getElementsByClassName("box");
    boxes[index].innerText = currentPlayer;
}

function checkWinner() { // Check if the current player has won
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() { // Reset the game to initial state
    board.fill("");
    const boxes = document.getElementsByClassName("box");
    for (let box of boxes) {
        box.innerText = "";
    }
    currentPlayer = "X";
    document.getElementById("current-turn").innerText = currentPlayer;
    document.getElementById("results").innerText = "";
    document.getElementById("play-again").style.display = "none";
    gameActive = true;
}

// Add event listeners to boxes
document.querySelectorAll(".box").forEach(box => {
    box.addEventListener("click", () => handleClick(parseInt(box.getAttribute("data-index"))));
});

// Add event listener to play again button
document.getElementById("play-again").addEventListener("click", resetGame);
