// ============================================
// Flashcards JavaScript
// ============================================

// Flashcard state
let flashcards = {
    currentIndex: 0,
    cards: [],
    isFlipped: false
};

// Flashcard data
const flashcardData = {
    mathematics: [
        { question: "What is the formula for the area of a circle?", answer: "A = πr²" },
        { question: "What is the Pythagorean theorem?", answer: "a² + b² = c²" },
        { question: "What is the formula for the perimeter of a rectangle?", answer: "P = 2(l + w)" },
        { question: "What is the derivative of x²?", answer: "2x" },
        { question: "What is the value of π (pi) to 2 decimal places?", answer: "3.14" },
        { question: "What is the formula for the volume of a cube?", answer: "V = s³" },
        { question: "What is the quadratic formula?", answer: "x = (-b ± √(b²-4ac)) / 2a" },
        { question: "What is the formula for the area of a triangle?", answer: "A = ½bh" },
        { question: "What is 15% as a decimal?", answer: "0.15" },
        { question: "What is the sum of angles in a triangle?", answer: "180°" }
    ],
    physics: [
        { question: "What is Newton's first law?", answer: "Law of inertia - objects stay at rest or in motion unless acted upon" },
        { question: "What is the formula for force?", answer: "F = ma" },
        { question: "What is the speed of light?", answer: "3 × 10⁸ m/s" },
        { question: "What is kinetic energy?", answer: "KE = ½mv²" },
        { question: "What is potential energy?", answer: "PE = mgh" },
        { question: "What is the unit of electrical resistance?", answer: "Ohm (Ω)" },
        { question: "What is acceleration due to gravity on Earth?", answer: "9.8 m/s²" },
        { question: "What is the formula for density?", answer: "D = m/v" },
        { question: "What is wave frequency?", answer: "f = 1/T (cycles per second)" },
        { question: "What is the unit of power?", answer: "Watt (W)" }
    ],
    chemistry: [
        { question: "What is the chemical symbol for water?", answer: "H₂O" },
        { question: "What is the atomic number of Carbon?", answer: "6" },
        { question: "What is the pH of a neutral substance?", answer: "7" },
        { question: "What type of bond is NaCl?", answer: "Ionic bond" },
        { question: "What is the formula for sulfuric acid?", answer: "H₂SO₄" },
        { question: "What is the periodic table's group 1 called?", answer: "Alkali metals" },
        { question: "What gas do plants absorb?", answer: "Carbon dioxide (CO₂)" },
        { question: "What is oxidation?", answer: "Loss of electrons" },
        { question: "What is the most abundant gas in air?", answer: "Nitrogen (78%)" },
        { question: "What is a catalyst?", answer: "A substance that speeds up a reaction without being consumed" }
    ],
    biology: [
        { question: "What is the powerhouse of the cell?", answer: "Mitochondria" },
        { question: "What is photosynthesis?", answer: "Process by which plants make food using sunlight" },
        { question: "What is DNA?", answer: "Deoxyribonucleic acid - genetic material" },
        { question: "How many chromosomes do humans have?", answer: "46 (23 pairs)" },
        { question: "What is the largest organ in the human body?", answer: "Skin" },
        { question: "What is the function of red blood cells?", answer: "Carry oxygen throughout the body" },
        { question: "What is mitosis?", answer: "Cell division resulting in two identical cells" },
        { question: "What is the brain's function?", answer: "Control center of the nervous system" },
        { question: "What is osmosis?", answer: "Movement of water through a semi-permeable membrane" },
        { question: "What is the basic unit of life?", answer: "Cell" }
    ],
    english: [
        { question: "What is a noun?", answer: "A naming word (person, place, thing, or idea)" },
        { question: "What is a verb?", answer: "A doing or action word" },
        { question: "What is an adjective?", answer: "A describing word" },
        { question: "What is a simile?", answer: "Comparison using 'like' or 'as'" },
        { question: "What is a metaphor?", answer: "Direct comparison without 'like' or 'as'" },
        { question: "What is a synonym?", answer: "Words with similar meanings" },
        { question: "What is an antonym?", answer: "Words with opposite meanings" },
        { question: "What is a preposition?", answer: "Word showing relationship between nouns" },
        { question: "What is a conjunction?", answer: "Word connecting clauses or sentences" },
        { question: "What is a homophone?", answer: "Words that sound the same but have different meanings" }
    ]
};

// Generate flashcards
function generateFlashcards(event) {
    event.preventDefault();
    
    const subject = document.getElementById('flashcardSubject').value;
    const count = parseInt(document.getElementById('flashcardCount').value);
    
    // Get flashcards for subject
    let cards = flashcardData[subject] || [];
    cards = shuffleArray([...cards]).slice(0, count);
    
    if (cards.length === 0) {
        showNotification('No flashcards available', 'error');
        return;
    }
    
    flashcards = {
        currentIndex: 0,
        cards: cards,
        isFlipped: false
    };
    
    // Show study mode
    document.getElementById('flashcardCreator').style.display = 'none';
    document.getElementById('flashcardStudy').style.display = 'block';
    
    // Update UI
    updateCard();
    generateIndicators();
}

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Update card display
function updateCard() {
    if (flashcards.cards.length === 0) return;
    
    const card = flashcards.cards[flashcards.currentIndex];
    document.getElementById('cardQuestion').textContent = card.question;
    document.getElementById('cardAnswer').textContent = card.answer;
    document.getElementById('cardProgress').textContent = 
        `${flashcards.currentIndex + 1} / ${flashcards.cards.length}`;
    
    // Update progress bar
    const progress = ((flashcards.currentIndex + 1) / flashcards.cards.length) * 100;
    document.querySelector('.progress-fill').style.width = progress + '%';
    
    // Reset flip state
    flashcards.isFlipped = false;
    document.getElementById('flashcardInner').classList.remove('flipped');
    
    // Update indicators
    updateIndicators();
}

// Flip card
function flipCard() {
    flashcards.isFlipped = !flashcards.isFlipped;
    document.getElementById('flashcardInner').classList.toggle('flipped');
}

// Previous card
function prevCard() {
    if (flashcards.currentIndex > 0) {
        flashcards.currentIndex--;
        updateCard();
    }
}

// Next card
function nextCard() {
    if (flashcards.currentIndex < flashcards.cards.length - 1) {
        flashcards.currentIndex++;
        updateCard();
    }
}

// Generate indicators
function generateIndicators() {
    const container = document.getElementById('cardIndicators');
    container.innerHTML = '';
    
    flashcards.cards.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.className = 'indicator';
        indicator.onclick = () => goToCard(index);
        container.appendChild(indicator);
    });
    
    updateIndicators();
}

// Update indicators
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((ind, index) => {
        ind.classList.toggle('active', index === flashcards.currentIndex);
    });
}

// Go to specific card
function goToCard(index) {
    flashcards.currentIndex = index;
    updateCard();
}

// Shuffle cards
function shuffleCards() {
    flashcards.cards = shuffleArray([...flashcards.cards]);
    flashcards.currentIndex = 0;
    updateCard();
    showNotification('Cards shuffled!', 'success');
}

// Reset cards
function resetCards() {
    flashcards.currentIndex = 0;
    flashcards.isFlipped = false;
    document.getElementById('flashcardInner').classList.remove('flipped');
    updateCard();
    showNotification('Cards reset!', 'success');
}

// Study specific set
function studySet(subject) {
    document.getElementById('flashcardSubject').value = subject;
    document.getElementById('flashcardCreator').style.display = 'block';
    document.getElementById('flashcardStudy').style.display = 'none';
}

// Show create modal
function showCreateModal() {
    alert('Custom flashcard creator coming soon!');
}

// Add flashcard-specific styles
const flashcardStyles = document.createElement('style');
flashcardStyles.textContent = `
    .btn-create {
        background: var(--gradient-primary);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius-md);
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: inherit;
        transition: var(--transition);
    }
    
    .btn-create:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }
    
    /* Flashcard Creator */
    .flashcard-creator {
        max-width: 500px;
        margin: 0 auto 3rem;
    }
    
    .creator-card {
        background: white;
        border-radius: var(--radius-xl);
        padding: 2rem;
        text-align: center;
        box-shadow: var(--shadow-lg);
    }
    
    .creator-card h2 {
        font-size: 1.5rem;
        color: var(--dark-bg);
        margin-bottom: 0.5rem;
    }
    
    .creator-card h2 i {
        color: var(--primary-color);
    }
    
    .creator-card p {
        color: var(--gray-500);
        margin-bottom: 2rem;
    }
    
    .creator-card .form-group {
        text-align: left;
        margin-bottom: 1.5rem;
    }
    
    .creator-card .form-group label {
        display: block;
        font-weight: 500;
        margin-bottom: 0.5rem;
    }
    
    .creator-card select {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid var(--gray-200);
        border-radius: var(--radius-md);
        font-family: inherit;
    }
    
    .btn-generate {
        width: 100%;
        padding: 1rem;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: var(--radius-md);
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-family: inherit;
        transition: var(--transition);
    }
    
    .btn-generate:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }
    
    /* Flashcard Study Mode */
    .flashcard-study {
        max-width: 600px;
        margin: 0 auto 3rem;
    }
    
    .study-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }
    
    .study-progress {
        flex: 1;
    }
    
    .study-progress span {
        font-weight: 600;
        color: var(--dark-bg);
    }
    
    .study-progress .progress-bar {
        height: 6px;
        background: var(--gray-200);
        border-radius: 10px;
        margin-top: 0.5rem;
        overflow: hidden;
    }
    
    .study-progress .progress-fill {
        height: 100%;
        background: var(--gradient-primary);
        transition: width 0.3s ease;
    }
    
    .study-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .btn-nav {
        width: 40px;
        height: 40px;
        border: 2px solid var(--gray-200);
        border-radius: 50%;
        background: white;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .btn-nav:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
    }
    
    /* Flashcard */
    .flashcard-container {
        perspective: 1000px;
        margin-bottom: 2rem;
    }
    
    .flashcard {
        width: 100%;
        height: 300px;
        cursor: pointer;
    }
    
    .flashcard-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
    }
    
    .flashcard-inner.flipped {
        transform: rotateY(180deg);
    }
    
    .flashcard-front,
    .flashcard-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: var(--radius-xl);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        box-shadow: var(--shadow-lg);
    }
    
    .flashcard-front {
        background: white;
    }
    
    .flashcard-back {
        background: var(--gradient-primary);
        color: white;
        transform: rotateY(180deg);
    }
    
    .card-label {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 1rem;
    }
    
    .flashcard-front .card-label {
        color: var(--gray-500);
    }
    
    .flashcard-back .card-label {
        color: rgba(255, 255, 255, 0.8);
    }
    
    .flashcard-front p,
    .flashcard-back p {
        font-size: 1.5rem;
        font-weight: 600;
    }
    
    /* Study Controls */
    .study-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .btn-control {
        padding: 0.75rem 1.5rem;
        background: white;
        border: 2px solid var(--gray-200);
        border-radius: var(--radius-md);
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: inherit;
        transition: var(--transition);
    }
    
    .btn-control:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
    }
    
    .card-indicators {
        display: flex;
        gap: 0.5rem;
    }
    
    .indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--gray-200);
        cursor: pointer;
        transition: var(--transition);
    }
    
    .indicator.active {
        background: var(--primary-color);
        transform: scale(1.2);
    }
    
    /* Flashcard Sets */
    .sets-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
    
    .set-card {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        background: white;
        padding: 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
    }
    
    .set-icon {
        width: 60px;
        height: 60px;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: white;
    }
    
    .set-icon.math { background: linear-gradient(135deg, #6366f1, #8b5cf6); }
    .set-icon.physics { background: linear-gradient(135deg, #10b981, #34d399); }
    .set-icon.chemistry { background: linear-gradient(135deg, #f59e0b, #fbbf24); }
    .set-icon.biology { background: linear-gradient(135deg, #ec4899, #f472b6); }
    
    .set-info {
        flex: 1;
    }
    
    .set-info h4 {
        font-size: 1rem;
        color: var(--dark-bg);
        margin-bottom: 0.25rem;
    }
    
    .set-info p {
        font-size: 0.75rem;
        color: var(--gray-500);
    }
    
    .btn-study {
        padding: 0.75rem 1.5rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: var(--radius-md);
        font-weight: 600;
        cursor: pointer;
        font-family: inherit;
        transition: var(--transition);
    }
    
    .btn-study:hover {
        background: var(--primary-dark);
    }
    
    @media (max-width: 768px) {
        .sets-grid {
            grid-template-columns: 1fr;
        }
        
        .study-controls {
            flex-direction: column;
            gap: 1rem;
        }
        
        .btn-control {
            width: 100%;
            justify-content: center;
        }
    }
`;
document.head.appendChild(flashcardStyles);
