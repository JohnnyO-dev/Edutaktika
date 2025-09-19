document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const dropArea = document.getElementById('drop-area');
    const lettersContainer = document.getElementById('letters-container');
    const checkBtn = document.getElementById('check-btn');
    const resetBtn = document.getElementById('reset-btn');
    const hintBtn = document.getElementById('hint-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const messageEl = document.getElementById('message');
    const targetWordEl = document.getElementById('target-word');
    const hintImage = document.getElementById('hint-image');
    const scoreEl = document.getElementById('score');
    const levelEl = document.getElementById('level');

    // Audio elements
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');
    const winSound = document.getElementById('win-sound');

    // Game state
    let currentWord = '';
    let currentLevel = 1;
    let score = 0;
    let draggedLetter = null;

    // Always use window.wordBank for levels
    let wordBank = window.wordBank || [
        { word: "CAT", image: "../images/cat.png" },
        { word: "DOG", image: "../images/dog.png" }
    ];

    // Initialize or reset the game
    function initGame() {
        wordBank = window.wordBank || wordBank;
        currentLevel = 0;
        score = 0;
        scoreEl.textContent = score;
        levelEl.textContent = currentLevel + 1;
        loadLevel(currentLevel);
    }

    // Reset game after editing word bank
    window.resetGameAfterEdit = function() {
        wordBank = window.wordBank || wordBank;
        currentLevel = 0;
        score = 0;
        scoreEl.textContent = score;
        levelEl.textContent = currentLevel + 1;
        loadLevel(currentLevel);
    };

    // Load a level
    function loadLevel(levelIdx) {
        if (!wordBank[levelIdx]) {
            // No more levels
            showWinModal();
            return;
        }
        const level = wordBank[levelIdx];
        currentWord = level.word; // <-- Add this line!
        document.getElementById('target-word').textContent = level.word;
        document.getElementById('hint-image').src = level.image || '';

        // Game logic for the loaded level
        createLetterElements(level.word);
        messageEl.textContent = '';

        // Show the image for the current word
        hintImage.src = level.image;
        hintImage.style.display = 'block';
    }

    // Event listeners
    checkBtn.addEventListener('click', checkSpelling);
    resetBtn.addEventListener('click', resetCurrentWord);
    hintBtn.addEventListener('click', showHint);
    shuffleBtn.addEventListener('click', shuffleLetters);

    // Initialize the game with first word
    initGame();

    // Create draggable letter elements
    function createLetterElements(word) {
        lettersContainer.innerHTML = '';
        dropArea.innerHTML = '';

        // Shuffle letters
        const letters = word.split('');
        shuffleArray(letters);

        letters.forEach(letter => {
            const letterEl = document.createElement('div');
            letterEl.className = 'letter';
            letterEl.textContent = letter;
            letterEl.draggable = true;
            letterEl.dataset.letter = letter;

            letterEl.addEventListener('dragstart', dragStart);
            letterEl.addEventListener('dragend', dragEnd);

            lettersContainer.appendChild(letterEl);
        });

        // Set up drop area
        dropArea.addEventListener('dragover', dragOver);
        dropArea.addEventListener('drop', drop);
    }

    // Drag and drop functions
    function dragStart(e) {
        draggedLetter = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.dataset.letter);
    }

    function dragEnd(e) {
        e.target.classList.remove('dragging');
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        if (draggedLetter && dropArea.children.length < currentWord.length) {
            const newLetter = draggedLetter.cloneNode(true);
            newLetter.classList.add('in-drop-area');
            newLetter.addEventListener('dragstart', dragStart);
            dropArea.appendChild(newLetter);
            
            // Remove from letters container if it's still there
            if (Array.from(lettersContainer.children).includes(draggedLetter)) {
                lettersContainer.removeChild(draggedLetter);
            }
        }
    }

    // Check if the spelled word is correct
    function checkSpelling() {
        const droppedLetters = Array.from(dropArea.children).map(letter => letter.dataset.letter);
        const userWord = droppedLetters.join('');

        if (userWord === currentWord) {
            messageEl.textContent = '';
            messageEl.className = '';
            correctSound.play();
            handleCorrectAnswer();

            // If last level, show final congratulations modal
            if (currentLevel === wordBank.length - 1) {
                // Last level, show final congratulations modal
                document.getElementById('congrats-modal').innerHTML = `
                    <h2>🎉 Congratulations! 🎉</h2>
                    <p>You completed all levels!</p>
                    <button id="reset-game-btn" style="padding:12px 36px; border-radius:8px; background:#4f9be3; color:#fff; border:none; font-size:20px; font-weight:bold; margin-top:24px;">Reset Game</button>
                `;
                document.getElementById('congrats-modal').style.display = 'block';

                // Add reset button event
                document.getElementById('reset-game-btn').onclick = function() {
                    document.getElementById('congrats-modal').style.display = 'none';
                    initGame();
                };
            } else {
                // Show normal congratulations modal for next level
                document.getElementById('congrats-modal').innerHTML = `
                    <h2>🎉 Congratulations! 🎉</h2>
                    <p>You spelled the word correctly!</p>
                    <button id="next-level-btn" style="padding:12px 36px; border-radius:8px; background:#4f9be3; color:#fff; border:none; font-size:20px; font-weight:bold; margin-top:24px;">Next Word</button>
                `;
                document.getElementById('congrats-modal').style.display = 'block';

                document.getElementById('next-level-btn').onclick = function() {
                    document.getElementById('congrats-modal').style.display = 'none';
                    currentLevel++;
                    levelEl.textContent = currentLevel + 1;
                    loadLevel(currentLevel);
                };
            }
        } else {
            messageEl.textContent = 'Oops! Try again!';
            messageEl.className = 'message wrong';
            wrongSound.play();
            score = Math.max(0, score - 5);
            scoreEl.textContent = score;
        }
    }

    // Handle correct answer
    function handleCorrectAnswer() {
        score += 5; // 5 points per level
        scoreEl.textContent = score;
    }

    // Reset current word
    function resetCurrentWord() {
        score = Math.max(0, score - 2);
        scoreEl.textContent = score;
        initGame();
    }

    // Show hint image
    function showHint() {
        // Just show the word as a hint
        targetWordEl.textContent = currentWord;
    }

    // Shuffle letters in drop area
    function shuffleLetters() {
        // Move all letters (originals and clones) back to lettersContainer
        const allLetters = [
            ...Array.from(dropArea.children),
            ...Array.from(lettersContainer.children)
        ];

        // Remove all from both containers
        dropArea.innerHTML = '';
        lettersContainer.innerHTML = '';

        // Remove .in-drop-area class from all letters
        allLetters.forEach(letter => letter.classList.remove('in-drop-area'));

        // Shuffle all letters
        shuffleArray(allLetters);

        // Put shuffled letters back in lettersContainer
        allLetters.forEach(letter => {
            lettersContainer.appendChild(letter);
        });

        // No score deduction
    }

    // Helper function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Disable buttons when game is complete
    function disableButtons() {
        checkBtn.disabled = true;
        resetBtn.disabled = true;
        hintBtn.disabled = true;
        shuffleBtn.disabled = true;
    }

    // Example for check button
    document.getElementById('check-btn').onclick = function() {
        if (isCorrect()) {
            score += 5;
            document.getElementById('score').textContent = score;
            // ...advance level, play sound, etc...
        } else {
            // ...wrong answer logic...
        }
    };

    document.getElementById('start-btn').onclick = function() {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('modal-instructions').style.display = 'block';
    };
    document.getElementById('close-instructions').onclick = function() {
        document.getElementById('modal-instructions').style.display = 'none';
        document.querySelector('.game-container').style.display = 'block';
        initGame();
    };
});