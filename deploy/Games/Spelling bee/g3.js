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

    // Word bank with hints (word: image URL)
    const wordBank = [
        { word: 'APPLE', hint: 'https://cdn.pixabay.com/photo/2016/01/05/13/58/apple-1122537_640.jpg' },
        { word: 'TIGER', hint: 'https://cdn.pixabay.com/photo/2017/07/24/19/57/tiger-2535888_640.jpg' },
        { word: 'HOUSE', hint: 'https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_640.jpg' },
        { word: 'SUNNY', hint: 'https://cdn.pixabay.com/photo/2016/11/06/23/16/sun-1803956_640.jpg' },
        { word: 'WATER', hint: 'https://cdn.pixabay.com/photo/2017/01/31/23/42/water-2028808_640.png' },
        { word: 'GRASS', hint: 'https://cdn.pixabay.com/photo/2016/11/21/17/44/arches-national-park-1846759_640.jpg' },
        { word: 'CLOUD', hint: 'https://cdn.pixabay.com/photo/2015/03/26/10/29/sky-691450_640.jpg' },
        { word: 'MUSIC', hint: 'https://cdn.pixabay.com/photo/2017/10/30/10/53/headphones-2902361_640.jpg' },
        { word: 'BEACH', hint: 'https://cdn.pixabay.com/photo/2016/11/22/23/44/pier-1851249_640.jpg' },
        { word: 'FRUIT', hint: 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_640.jpg' }
    ];

    // Initialize game
    initGame();

    // Event listeners
    checkBtn.addEventListener('click', checkSpelling);
    resetBtn.addEventListener('click', resetCurrentWord);
    hintBtn.addEventListener('click', showHint);
    shuffleBtn.addEventListener('click', shuffleLetters);

    // Initialize the game with first word
    function initGame() {
        if (currentLevel - 1 < wordBank.length) {
            currentWord = wordBank[currentLevel - 1].word;
            targetWordEl.textContent = currentWord;
            createLetterElements();
            messageEl.textContent = '';
            hintImage.style.display = 'none';
        } else {
            messageEl.textContent = 'Congratulations! You completed all levels!';
            messageEl.className = 'message correct';
            winSound.play();
            disableButtons();
        }
    }

    // Create draggable letter elements
    function createLetterElements() {
        lettersContainer.innerHTML = '';
        dropArea.innerHTML = '';

        // Shuffle letters
        const letters = currentWord.split('');
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
            messageEl.textContent = 'Correct! Well done!';
            messageEl.className = 'message correct';
            correctSound.play();
            score += currentWord.length * 10;
            scoreEl.textContent = score;
            
            // Move to next level after delay
            setTimeout(() => {
                currentLevel++;
                levelEl.textContent = currentLevel;
                initGame();
            }, 1500);
        } else {
            messageEl.textContent = 'Oops! Try again!';
            messageEl.className = 'message wrong';
            wrongSound.play();
            score = Math.max(0, score - 5);
            scoreEl.textContent = score;
        }
    }

    // Reset current word
    function resetCurrentWord() {
        score = Math.max(0, score - 2);
        scoreEl.textContent = score;
        initGame();
    }

    // Show hint image
    function showHint() {
        hintImage.src = wordBank[currentLevel - 1].hint;
        hintImage.style.display = 'block';
        score = Math.max(0, score - 5);
        scoreEl.textContent = score;
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
});