let word = ""; // Das zu erratende Wort
let guessedLetters = []; // Die geratenen Buchstaben
let attempts = 11; // Die Anzahl der zulässigen Versuche
let hangmanImageIndex = 0; // Index für das Galgenmännchen-Bild

// Wählt ein zufälliges Wort aus einer Liste aus
function chooseWord() {
    const wordList = ["apfel", "banane", "birne", "kirsche", "orange", "erdbeere", "kiwi", "ananas", "himbeere", "weintraube", "mandarine", "granatapfel", "feige", "litschi", "grapefruit", "kaki", "maracuja", "physalis", "melone", "kokosnuss", "heidelbeere", "johannisbeere", "sternfrucht", "pflaume", "stachelbeere", "nektarine", "papaya", "mango", "olive"];
    return wordList[Math.floor(Math.random() * wordList.length)]; // zufälliges Wort wird "gewürfelt"
}

// Zeigt das Wort mit geratenen Buchstaben an
function displayWord() {
    let displayedWord = "";
    for (const letter of word) {
        if (guessedLetters.includes(letter)) {
            displayedWord += letter;
        } else {
            displayedWord += "_";
        }
    }
    document.getElementById("displayedWord").textContent = displayedWord;
}

// Überprüft, ob der Buchstabe im Wort enthalten ist
function guessLetter(button) {
    const guess = button.textContent;
    button.disabled = true;
    if (guessedLetters.includes(guess)) {
        alert("Sie haben diesen Buchstaben bereits geraten.");
        return;
    }
    guessedLetters.push(guess);
    displayWord();
    if (!word.includes(guess)) {
        attempts--;
        document.getElementById("attempts").textContent = attempts;
        document.getElementById("hangmanImage").src = `images/hangman_${++hangmanImageIndex}.jpg`;
        if (attempts === 0) {
            setTimeout(function() {
                alert("Du hast verloren! Das Wort war: " + word);
                resetGame();
            }, 100);
            return;
        }
    }
    if (!document.getElementById("displayedWord").textContent.includes("_")) {
        setTimeout(function() {
            alert("Glückwunsch! Sie haben das Wort erraten: " + word);
            resetGame();
        }, 100);
    }
}

// Setzt das Spiel zurück
function resetGame() {
    word = chooseWord();
    guessedLetters = [];
    attempts = 11;
    hangmanImageIndex = 0;
    document.getElementById("attempts").textContent = attempts;
    document.getElementById("hangmanImage").src = "images/hangman_0.jpg";
    displayWord();
    enableAllButtons();
}

// Aktiviert alle Buttons
function enableAllButtons() {
    const buttons = document.querySelectorAll("#keyboard button");
    buttons.forEach(button => button.disabled = false);
}

// Initialisierung beim Laden der Seite
window.onload = function() {
    resetGame();
    document.getElementById("wordLength").textContent += word.length;
};