// ============================================
// Quiz JavaScript - AI Quiz Generator
// ============================================

// Quiz state
let currentQuiz = {
    questions: [],
    currentIndex: 0,
    answers: [],
    score: 0,
    timeLeft: 600 // 10 minutes in seconds
};

let quizTimer = null;

// Question bank
const questionBank = {
    mathematics: [
        {
            question: "What is the value of x in the equation 2x + 5 = 15?",
            type: "multiple_choice",
            options: ["x = 5", "x = 10", "x = 7.5", "x = 4"],
            correct: 0
        },
        {
            question: "Simplify: 3(x + 4) - 2(x - 1)",
            type: "multiple_choice",
            options: ["x + 14", "5x + 14", "x + 10", "5x + 10"],
            correct: 0
        },
        {
            question: "What is the derivative of x²?",
            type: "multiple_choice",
            options: ["2x", "x", "2x²", "x²"],
            correct: 0
        },
        {
            question: "What is 15% of 200?",
            type: "multiple_choice",
            options: ["25", "30", "35", "40"],
            correct: 1
        },
        {
            question: "Solve: x² = 64",
            type: "multiple_choice",
            options: ["x = 8", "x = ±8", "x = 4", "x = ±4"],
            correct: 1
        },
        {
            question: "What is the square root of 144?",
            type: "multiple_choice",
            options: ["10", "11", "12", "14"],
            correct: 2
        },
        {
            question: "If y = 3x + 2, what is y when x = 4?",
            type: "multiple_choice",
            options: ["12", "14", "16", "18"],
            correct: 1
        },
        {
            question: "What is the area of a circle with radius 5?",
            type: "multiple_choice",
            options: ["25π", "10π", "5π", "15π"],
            correct: 0
        },
        {
            question: "What is 7 × 8?",
            type: "multiple_choice",
            options: ["54", "56", "58", "64"],
            correct: 1
        },
        {
            question: "What is the value of π (pi) to 2 decimal places?",
            type: "multiple_choice",
            options: ["3.12", "3.14", "3.16", "3.18"],
            correct: 1
        }
    ],
    physics: [
        {
            question: "What is the SI unit of force?",
            type: "multiple_choice",
            options: ["Joule", "Watt", "Newton", "Pascal"],
            correct: 2
        },
        {
            question: "What is the speed of light in vacuum?",
            type: "multiple_choice",
            options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10⁴ m/s", "3 × 10² m/s"],
            correct: 1
        },
        {
            question: "What is the formula for kinetic energy?",
            type: "multiple_choice",
            options: ["KE = mv", "KE = ½mv²", "KE = mgh", "KE = Fd"],
            correct: 1
        },
        {
            question: "What is the acceleration due to gravity on Earth?",
            type: "multiple_choice",
            options: ["9.8 m/s²", "8.9 m/s²", "10.8 m/s²", "7.8 m/s²"],
            correct: 0
        },
        {
            question: "What type of lens is used to correct myopia?",
            type: "multiple_choice",
            options: ["Convex", "Concave", "Bifocal", "Cylindrical"],
            correct: 1
        },
        {
            question: "What is the unit of electrical resistance?",
            type: "multiple_choice",
            options: ["Volt", "Ampere", "Ohm", "Watt"],
            correct: 2
        },
        {
            question: "What is Newton's first law also known as?",
            type: "multiple_choice",
            options: ["Law of acceleration", "Law of inertia", "Law of action-reaction", "Law of gravity"],
            correct: 1
        },
        {
            question: "What is the formula for density?",
            type: "multiple_choice",
            options: ["D = m/v", "D = v/m", "D = m × v", "D = m + v"],
            correct: 0
        }
    ],
    chemistry: [
        {
            question: "What is the chemical symbol for water?",
            type: "multiple_choice",
            options: ["O₂", "H₂O", "CO₂", "NaCl"],
            correct: 1
        },
        {
            question: "What is the atomic number of Carbon?",
            type: "multiple_choice",
            options: ["4", "6", "8", "12"],
            correct: 1
        },
        {
            question: "What type of bond forms between sodium and chlorine?",
            type: "multiple_choice",
            options: ["Covalent", "Ionic", "Metallic", "Hydrogen"],
            correct: 1
        },
        {
            question: "What is the pH of a neutral solution?",
            type: "multiple_choice",
            options: ["0", "7", "14", "10"],
            correct: 1
        },
        {
            question: "What gas is released when an acid reacts with a metal?",
            type: "multiple_choice",
            options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon dioxide"],
            correct: 2
        },
        {
            question: "What is the formula for sulfuric acid?",
            type: "multiple_choice",
            options: ["HCl", "H₂SO₄", "HNO₃", "H₃PO₄"],
            correct: 1
        }
    ],
    biology: [
        {
            question: "What is the powerhouse of the cell?",
            type: "multiple_choice",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"],
            correct: 1
        },
        {
            question: "What is the process by which plants make food?",
            type: "multiple_choice",
            options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
            correct: 1
        },
        {
            question: "What is the basic unit of life?",
            type: "multiple_choice",
            options: ["Atom", "Molecule", "Cell", "Tissue"],
            correct: 2
        },
        {
            question: "How many chromosomes do humans have?",
            type: "multiple_choice",
            options: ["23", "44", "46", "48"],
            correct: 2
        },
        {
            question: "What is the largest organ in the human body?",
            type: "multiple_choice",
            options: ["Heart", "Liver", "Skin", "Brain"],
            correct: 2
        }
    ],
    english: [
        {
            question: "What is a noun?",
            type: "multiple_choice",
            options: ["A doing word", "A describing word", "A naming word", "A connecting word"],
            correct: 2
        },
        {
            question: "What is the past tense of 'go'?",
            type: "multiple_choice",
            options: ["Goes", "Going", "Went", "Gone"],
            correct: 2
        },
        {
            question: "What is a verb?",
            type: "multiple_choice",
            options: ["A naming word", "A describing word", "A doing word", "A showing word"],
            correct: 2
        },
        {
            question: "What figure of speech is 'The sun is a golden ball'?",
            type: "multiple_choice",
            options: ["Simile", "Metaphor", "Personification", "Hyperbole"],
            correct: 1
        },
        {
            question: "What is an adjective?",
            type: "multiple_choice",
            options: ["A doing word", "A naming word", "A describing word", "A number word"],
            correct: 2
        }
    ]
};

// Generate quiz
function generateQuiz(event) {
    event.preventDefault();
    
    const subject = document.getElementById('quizSubject').value;
    const questionCount = parseInt(document.getElementById('questionCount').value);
    const difficulty = document.getElementById('difficulty').value;
    const quizType = document.getElementById('quizType').value;
    
    // Get questions from bank
    let questions = questionBank[subject] || [];
    
    // Shuffle and limit questions
    questions = shuffleArray([...questions]).slice(0, questionCount);
    
    if (questions.length === 0) {
        showNotification('No questions available for this subject', 'error');
        return;
    }
    
    // Initialize quiz
    currentQuiz = {
        questions: questions,
        currentIndex: 0,
        answers: new Array(questions.length).fill(null),
        score: 0,
        timeLeft: questions.length * 60 // 1 minute per question
    };
    
    // Show quiz section
    document.querySelector('.quiz-generator').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    
    // Update UI
    document.getElementById('quizTitle').textContent = subject.charAt(0).toUpperCase() + subject.slice(1) + ' Quiz';
    document.getElementById('questionCounter').textContent = `Question 1 of ${questions.length}`;
    
    // Start timer
    startTimer();
    
    // Display first question
    displayQuestion();
}

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Display question
function displayQuestion() {
    const question = currentQuiz.questions[currentQuiz.currentIndex];
    const content = document.getElementById('quizContent');
    
    let html = `
        <div class="question-card">
            <h3>${currentQuiz.currentIndex + 1}. ${question.question}</h3>
            <div class="options">
    `;
    
    question.options.forEach((option, index) => {
        const isSelected = currentQuiz.answers[currentQuiz.currentIndex] === index;
        html += `
            <div class="option ${isSelected ? 'selected' : ''}" onclick="selectAnswer(${index})">
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option}</span>
            </div>
        `;
    });
    
    html += `</div></div>`;
    content.innerHTML = html;
    
    // Update progress
    const progress = ((currentQuiz.currentIndex + 1) / currentQuiz.questions.length) * 100;
    document.querySelector('#quizProgressBar .progress-fill').style.width = progress + '%';
    
    // Update buttons
    document.getElementById('prevBtn').disabled = currentQuiz.currentIndex === 0;
    document.getElementById('nextBtn').textContent = 
        currentQuiz.currentIndex === currentQuiz.questions.length - 1 ? 'Submit' : 'Next';
}

// Select answer
function selectAnswer(optionIndex) {
    currentQuiz.answers[currentQuiz.currentIndex] = optionIndex;
    displayQuestion(); // Re-render to show selection
}

// Previous question
function prevQuestion() {
    if (currentQuiz.currentIndex > 0) {
        currentQuiz.currentIndex--;
        document.getElementById('questionCounter').textContent = 
            `Question ${currentQuiz.currentIndex + 1} of ${currentQuiz.questions.length}`;
        displayQuestion();
    }
}

// Next question / Submit
function nextQuestion() {
    if (currentQuiz.currentIndex < currentQuiz.questions.length - 1) {
        currentQuiz.currentIndex++;
        document.getElementById('questionCounter').textContent = 
            `Question ${currentQuiz.currentIndex + 1} of ${currentQuiz.questions.length}`;
        displayQuestion();
    } else {
        submitQuiz();
    }
}

// Start timer
function startTimer() {
    quizTimer = setInterval(() => {
        currentQuiz.timeLeft--;
        
        const minutes = Math.floor(currentQuiz.timeLeft / 60);
        const seconds = currentQuiz.timeLeft % 60;
        document.getElementById('timer').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (currentQuiz.timeLeft <= 0) {
            submitQuiz();
        }
    }, 1000);
}

// Submit quiz
function submitQuiz() {
    clearInterval(quizTimer);
    
    // Calculate score
    let correct = 0;
    currentQuiz.questions.forEach((question, index) => {
        if (currentQuiz.answers[index] === question.correct) {
            correct++;
        }
    });
    
    currentQuiz.score = correct;
    
    // Show results
    showResults();
}

// Show results
function showResults() {
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    const percentage = Math.round((currentQuiz.score / currentQuiz.questions.length) * 100);
    document.getElementById('finalScore').textContent = percentage + '%';
    document.getElementById('correctCount').textContent = currentQuiz.score;
    document.getElementById('incorrectCount').textContent = currentQuiz.questions.length - currentQuiz.score;
    
    // Update icon based on score
    const icon = document.getElementById('resultsIcon');
    if (percentage >= 80) {
        icon.innerHTML = '<i class="fas fa-trophy"></i>';
        icon.style.background = 'linear-gradient(135deg, #f59e0b, #fbbf24)';
    } else if (percentage >= 60) {
        icon.innerHTML = '<i class="fas fa-star"></i>';
        icon.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
    } else {
        icon.innerHTML = '<i class="fas fa-redo"></i>';
        icon.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
    }
    
    // Update progress
    const progress = loadProgress();
    progress.totalQuizzes++;
    progress.averageScore = Math.round((progress.averageScore + percentage) / 2);
    saveProgress(progress);
}

// Retry quiz
function retryQuiz() {
    document.getElementById('quizResults').style.display = 'none';
    document.querySelector('.quiz-generator').style.display = 'block';
}

// Review answers
function reviewAnswers() {
    alert('Review feature coming soon!');
}

// Add quiz-specific styles
const quizStyles = document.createElement('style');
quizStyles.textContent = `
    .quiz-generator {
        max-width: 600px;
        margin: 0 auto;
    }
    
    .generator-card {
        background: white;
        border-radius: var(--radius-xl);
        padding: 2rem;
        box-shadow: var(--shadow-lg);
    }
    
    .generator-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .ai-icon {
        width: 80px;
        height: 80px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        font-size: 2rem;
        color: white;
    }
    
    .generator-header h2 {
        font-size: 1.5rem;
        color: var(--dark-bg);
    }
    
    .generator-card .form-group {
        margin-bottom: 1.5rem;
    }
    
    .generator-card .form-group label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        color: var(--dark-bg);
        margin-bottom: 0.5rem;
    }
    
    .generator-card .form-group label i {
        color: var(--primary-color);
    }
    
    .generator-card select {
        width: 100%;
        padding: 0.875rem;
        border: 2px solid var(--gray-200);
        border-radius: var(--radius-md);
        font-size: 1rem;
        font-family: inherit;
    }
    
    .btn-generate {
        width: 100%;
        padding: 1rem;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: var(--radius-md);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: var(--transition);
        font-family: inherit;
    }
    
    .btn-generate:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }
    
    /* Quiz Section */
    .quiz-section {
        max-width: 800px;
        margin: 0 auto;
    }
    
    .quiz-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    
    .quiz-info h2 {
        font-size: 1.5rem;
        color: var(--dark-bg);
    }
    
    .quiz-info span {
        color: var(--gray-500);
    }
    
    .quiz-timer {
        background: white;
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        font-weight: 600;
    }
    
    .quiz-timer i {
        color: var(--primary-color);
        margin-right: 0.5rem;
    }
    
    .quiz-progress {
        margin-bottom: 2rem;
    }
    
    .quiz-progress .progress-bar {
        height: 8px;
        background: var(--gray-200);
        border-radius: 10px;
        overflow: hidden;
    }
    
    .quiz-progress .progress-fill {
        height: 100%;
        background: var(--gradient-primary);
        transition: width 0.3s ease;
    }
    
    .question-card {
        background: white;
        border-radius: var(--radius-xl);
        padding: 2rem;
        box-shadow: var(--shadow-md);
    }
    
    .question-card h3 {
        font-size: 1.25rem;
        color: var(--dark-bg);
        margin-bottom: 1.5rem;
    }
    
    .options {
        display: grid;
        gap: 1rem;
    }
    
    .option {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border: 2px solid var(--gray-200);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: var(--transition);
    }
    
    .option:hover {
        border-color: var(--primary-color);
    }
    
    .option.selected {
        border-color: var(--primary-color);
        background: rgba(99, 102, 241, 0.1);
    }
    
    .option-letter {
        width: 35px;
        height: 35px;
        background: var(--gray-100);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
    }
    
    .option.selected .option-letter {
        background: var(--primary-color);
        color: white;
    }
    
    .quiz-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
    }
    
    .btn-prev, .btn-next {
        padding: 0.875rem 2rem;
        border-radius: var(--radius-md);
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: inherit;
        transition: var(--transition);
    }
    
    .btn-prev {
        background: white;
        border: 2px solid var(--gray-200);
        color: var(--dark-bg);
    }
    
    .btn-prev:hover:not(:disabled) {
        border-color: var(--primary-color);
        color: var(--primary-color);
    }
    
    .btn-prev:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .btn-next {
        background: var(--gradient-primary);
        border: none;
        color: white;
    }
    
    .btn-next:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }
    
    /* Quiz Results */
    .quiz-results {
        max-width: 500px;
        margin: 0 auto;
    }
    
    .results-card {
        background: white;
        border-radius: var(--radius-xl);
        padding: 3rem;
        text-align: center;
        box-shadow: var(--shadow-lg);
    }
    
    .results-icon {
        width: 100px;
        height: 100px;
        background: linear-gradient(135deg, #f59e0b, #fbbf24);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        font-size: 2.5rem;
        color: white;
    }
    
    .results-card h2 {
        font-size: 1.75rem;
        color: var(--dark-bg);
        margin-bottom: 1.5rem;
    }
    
    .score-display {
        margin-bottom: 2rem;
    }
    
    .score-display .score {
        display: block;
        font-size: 4rem;
        font-weight: 700;
        color: var(--primary-color);
    }
    
    .score-display .score-label {
        color: var(--gray-500);
    }
    
    .results-stats {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 2rem;
    }
    
    .result-stat {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
    }
    
    .result-stat.correct i {
        color: var(--secondary-color);
    }
    
    .result-stat.incorrect i {
        color: var(--danger-color);
    }
    
    .results-actions {
        display: flex;
        gap: 1rem;
    }
    
    .btn-retry, .btn-review {
        flex: 1;
        padding: 1rem;
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
    
    .btn-retry {
        background: var(--gray-100);
        border: none;
        color: var(--dark-bg);
    }
    
    .btn-review {
        background: var(--primary-color);
        border: none;
        color: white;
    }
    
    /* Quiz History */
    .quiz-history {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .history-item {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        background: white;
        padding: 1.25rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
    }
    
    .history-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        color: white;
    }
    
    .history-icon.math { background: linear-gradient(135deg, #6366f1, #8b5cf6); }
    .history-icon.physics { background: linear-gradient(135deg, #10b981, #34d399); }
    .history-icon.english { background: linear-gradient(135deg, #3b82f6, #60a5fa); }
    
    .history-info {
        flex: 1;
    }
    
    .history-info h4 {
        font-size: 1rem;
        color: var(--dark-bg);
        margin-bottom: 0.25rem;
    }
    
    .history-info p {
        font-size: 0.75rem;
        color: var(--gray-500);
    }
    
    .score-badge {
        padding: 0.5rem 1rem;
        border-radius: 50px;
        font-weight: 600;
    }
    
    .score-badge.excellent {
        background: rgba(16, 185, 129, 0.1);
        color: var(--secondary-color);
    }
    
    .score-badge.good {
        background: rgba(99, 102, 241, 0.1);
        color: var(--primary-color);
    }
    
    .score-badge.average {
        background: rgba(245, 158, 11, 0.1);
        color: var(--accent-color);
    }
    
    @media (max-width: 768px) {
        .quiz-header {
            flex-direction: column;
            gap: 1rem;
        }
        
        .results-actions {
            flex-direction: column;
        }
        
        .history-item {
            flex-direction: column;
            text-align: center;
        }
    }
`;
document.head.appendChild(quizStyles);
