// Function to show an alert when a game is started
function playGame(gameName) {
    alert(`Starting the game: ${gameName}`);
}

// Function to store the high score in localStorage
function saveHighScore(score) {
    let highScore = localStorage.getItem('highScore');
    if (!highScore || score > highScore) {
        localStorage.setItem('highScore', score);
        alert(`New High Score: ${score}`);
    } else {
        alert(`Current High Score: ${highScore}`);
    }
}

// Function to display the high score on the page
function displayHighScore() {
    let highScore = localStorage.getItem('highScore');
    if (highScore) {
        document.getElementById('high-score').textContent = `High Score: ${highScore}`;
    } else {
        document.getElementById('high-score').textContent = 'No High Score yet';
    }
}

// Event listener for when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Display the high score when the page loads
    displayHighScore();

    // Add event listeners to the game cards (for demo purposes)
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        const gameName = card.querySelector('h3').textContent; // Get game name
        const playButton = card.querySelector('a'); // Play button

        playButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link action
            playGame(gameName);
        });
    });

    // Demo of saving high scores (this could be tied to game actions)
    document.getElementById('save-score-btn').addEventListener('click', () => {
        const score = Math.floor(Math.random() * 1000); // Random score for demo
        saveHighScore(score);
    });
});
