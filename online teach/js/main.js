// ============================================
// EduVault Smart Revision - Main JavaScript
// ============================================

// ============================================
// Theme Toggle
// ============================================
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-toggle i').classList.remove('fa-moon');
        document.querySelector('.theme-toggle i').classList.add('fa-sun');
    }
}

// ============================================
// Navigation
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// Smart Search System
// ============================================
const searchInput = document.getElementById('globalSearch');
const searchSuggestions = document.getElementById('searchSuggestions');

// Sample data for search suggestions
const searchData = {
    books: [
        { title: 'Advanced Mathematics', level: 'S1-S6', subject: 'Mathematics' },
        { title: 'Physics Fundamentals', level: 'S3-S6', subject: 'Physics' },
        { title: 'Biology for Life', level: 'S1-S6', subject: 'Biology' },
        { title: 'English Literature', level: 'P4-S6', subject: 'English' },
        { title: 'Chemistry Essential', level: 'S3-S6', subject: 'Chemistry' },
        { title: 'Computer Science Basics', level: 'University', subject: 'Computing' },
        { title: 'Business Studies', level: 'S5-S6', subject: 'Business' }
    ],
    subjects: [
        'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology',
        'History', 'Geography', 'Computer Science', 'Business Studies'
    ],
    courses: [
        'Advanced Mathematics', 'Physics Fundamentals', 'English Literature',
        'Programming Basics', 'Business Studies', 'Chemistry Essential'
    ]
};

if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 2) {
            searchSuggestions.style.display = 'none';
            return;
        }
        
        let suggestions = [];
        
        // Search books
        searchData.books.forEach(book => {
            if (book.title.toLowerCase().includes(query) || 
                book.subject.toLowerCase().includes(query)) {
                suggestions.push({
                    type: 'book',
                    title: book.title,
                    subtitle: `${book.subject} • ${book.level}`
                });
            }
        });
        
        // Search subjects
        searchData.subjects.forEach(subject => {
            if (subject.toLowerCase().includes(query)) {
                suggestions.push({
                    type: 'subject',
                    title: subject,
                    subtitle: 'Subject'
                });
            }
        });
        
        // Search courses
        searchData.courses.forEach(course => {
            if (course.toLowerCase().includes(query)) {
                suggestions.push({
                    type: 'course',
                    title: course,
                    subtitle: 'Course'
                });
            }
        });
        
        displaySuggestions(suggestions.slice(0, 6));
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            searchSuggestions.style.display = 'none';
        }
    });
}

function displaySuggestions(suggestions) {
    if (suggestions.length === 0) {
        searchSuggestions.style.display = 'none';
        return;
    }
    
    let html = '';
    suggestions.forEach(item => {
        const icon = item.type === 'book' ? 'fa-book' : 
                     item.type === 'subject' ? 'fa-bookmark' : 'fa-play-circle';
        html += `
            <div class="suggestion-item" onclick="selectSuggestion('${item.title}', '${item.type}')">
                <i class="fas ${icon}"></i>
                <div class="suggestion-content">
                    <span class="suggestion-title">${item.title}</span>
                    <span class="suggestion-subtitle">${item.subtitle}</span>
                </div>
            </div>
        `;
    });
    
    searchSuggestions.innerHTML = html;
    searchSuggestions.style.display = 'block';
}

function selectSuggestion(title, type) {
    searchInput.value = title;
    searchSuggestions.style.display = 'none';
    
    if (type === 'book') {
        window.location.href = 'pages/library.html';
    } else if (type === 'course') {
        window.location.href = 'pages/courses.html';
    } else {
        window.location.href = 'pages/subjects.html';
    }
}

function performSearch() {
    const query = searchInput.value;
    if (query) {
        window.location.href = `pages/search.html?q=${encodeURIComponent(query)}`;
    }
}

// ============================================
// Level Navigation
// ============================================
function navigateToLevel(level) {
    const levelRoutes = {
        'primary': 'pages/levels/primary.html',
        'secondary': 'pages/levels/secondary.html',
        'tvet': 'pages/levels/tvet.html',
        'university': 'pages/levels/university.html'
    };
    
    if (levelRoutes[level]) {
        window.location.href = levelRoutes[level];
    }
}

// ============================================
// AI Chat Widget
// ============================================
const chatWidget = document.getElementById('aiChatWidget');
const chatContainer = document.getElementById('chatContainer');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

function toggleAIChat() {
    if (chatContainer) {
        chatContainer.classList.toggle('active');
    }
}

function openAIChat() {
    if (chatContainer) {
        chatContainer.classList.add('active');
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Simple AI response patterns
    if (lowerMessage.includes('math') || lowerMessage.includes('mathematics')) {
        return "For Mathematics, I recommend starting with our 'Advanced Mathematics' course. It covers algebra, calculus, and more. Would you like me to suggest specific topics?";
    }
    
    if (lowerMessage.includes('physics') || lowerMessage.includes('science')) {
        return "Great choice! Our Physics course covers mechanics, electricity, and waves. You can access video lessons and practice quizzes. Want me to guide you to a specific topic?";
    }
    
    if (lowerMessage.includes('exam') || lowerMessage.includes('test')) {
        return "To prepare for exams, I suggest: 1) Take practice quizzes, 2) Review your flashcards, 3) Track your progress in the dashboard. Would you like me to create a study plan?";
    }
    
    if (lowerMessage.includes('certificate') || lowerMessage.includes('certification')) {
        return "You can earn certificates by completing courses and modules. Go to your dashboard to see available certificates and your progress. Keep learning to unlock them!";
    }
    
    if (lowerMessage.includes('book') || lowerMessage.includes('read')) {
        return "Our library has 50,000+ books! You can search by subject, level, or topic. Would you like me to help you find a specific book?";
    }
    
    // Default response
    return "I'm here to help! You can ask me about:\n- 📚 Books and courses\n- 📝 Quizzes and exams\n- 🎓 Certificates\n- 📊 Your progress\n\nWhat would you like to know?";
}

// ============================================
// Progress Tracking (Local Storage)
// ============================================
const studentProgress = {
    completedCourses: 0,
    completedModules: 0,
    totalQuizzes: 0,
    averageScore: 0,
    studyTime: 0, // minutes
    certificates: 0,
    booksRead: 0
};

function loadProgress() {
    const saved = localStorage.getItem('studentProgress');
    if (saved) {
        Object.assign(studentProgress, JSON.parse(saved));
    }
    return studentProgress;
}

function saveProgress() {
    localStorage.setItem('studentProgress', JSON.stringify(studentProgress));
}

function updateProgress(type, value) {
    studentProgress[type] += value;
    saveProgress();
}

// ============================================
// Quiz System
// ============================================
const quizQuestions = {
    math: [
        {
            question: "What is the value of x in the equation 2x + 5 = 15?",
            options: ["x = 5", "x = 10", "x = 7.5", "x = 4"],
            correct: 0
        },
        {
            question: "Simplify: 3(x + 4) - 2(x - 1)",
            options: ["x + 14", "5x + 14", "x + 10", "5x + 10"],
            correct: 0
        },
        {
            question: "What is the derivative of x²?",
            options: ["2x", "x", "2x²", "x²"],
            correct: 0
        }
    ],
    physics: [
        {
            question: "What is the SI unit of force?",
            options: ["Joule", "Watt", "Newton", "Pascal"],
            correct: 2
        },
        {
            question: "What is the speed of light in vacuum?",
            options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10⁴ m/s", "3 × 10² m/s"],
            correct: 1
        }
    ]
};

function generateQuiz(subject, questionCount = 5) {
    const questions = quizQuestions[subject] || [];
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(questionCount, shuffled.length));
}

function submitQuiz(answers) {
    let score = 0;
    answers.forEach((answer, index) => {
        if (answer === quizQuestions[subject]?.[index]?.correct) {
            score++;
        }
    });
    return {
        score: score,
        total: answers.length,
        percentage: Math.round((score / answers.length) * 100)
    };
}

// ============================================
// Certificate Generator
// ============================================
function generateCertificate(studentName, courseName, date) {
    const certificateId = 'EV-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
    
    return {
        id: certificateId,
        studentName: studentName,
        courseName: courseName,
        date: date || new Date().toLocaleDateString(),
        issuedBy: 'EduVault Smart Revision',
        verificationUrl: `https://eduvault.com/verify/${certificateId}`
    };
}

function downloadCertificate(certificate) {
    // In a real implementation, this would generate a PDF
    const certificateWindow = window.open('', '_blank');
    certificateWindow.document.write(`
        <html>
        <head>
            <title>Certificate - ${certificate.courseName}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                }
                .certificate {
                    border: 10px solid #6366f1;
                    padding: 40px;
                }
                h1 { color: #6366f1; }
            </style>
        </head>
        <body>
            <div class="certificate">
                <h1>Certificate of Completion</h1>
                <p>This certifies that</p>
                <h2>${certificate.studentName}</h2>
                <p>has successfully completed</p>
                <h3>${certificate.courseName}</h3>
                <p>Date: ${certificate.date}</p>
                <p>Certificate ID: ${certificate.id}</p>
            </div>
        </body>
        </html>
    `);
}

// ============================================
// Flashcards System
// ============================================
const flashcardDecks = {};

function createFlashcardDeck(name, cards) {
    flashcardDecks[name] = {
        cards: cards,
        currentIndex: 0
    };
}

function getNextCard(deckName) {
    const deck = flashcardDecks[deckName];
    if (!deck) return null;
    
    const card = deck.cards[deck.currentIndex];
    deck.currentIndex = (deck.currentIndex + 1) % deck.cards.length;
    return card;
}

// ============================================
// User Authentication (Simulation)
// ============================================
const users = [];

function registerUser(userData) {
    const user = {
        id: 'user-' + Date.now(),
        ...userData,
        createdAt: new Date().toISOString(),
        role: 'student'
    };
    users.push(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
}

function loginUser(email, password) {
    const user = users.find(u => u.email === email);
    if (user && user.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }
    return null;
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// ============================================
// Dashboard Functions
// ============================================
function updateDashboardStats() {
    const progress = loadProgress();
    
    // Update dashboard elements if they exist
    const completedCourses = document.getElementById('completedCourses');
    const completedModules = document.getElementById('completedModules');
    const totalQuizzes = document.getElementById('totalQuizzes');
    const averageScore = document.getElementById('averageScore');
    const studyTime = document.getElementById('studyTime');
    const certificates = document.getElementById('certificates');
    const booksRead = document.getElementById('booksRead');
    
    if (completedCourses) completedCourses.textContent = progress.completedCourses;
    if (completedModules) completedModules.textContent = progress.completedModules;
    if (totalQuizzes) totalQuizzes.textContent = progress.totalQuizzes;
    if (averageScore) averageScore.textContent = progress.averageScore + '%';
    if (studyTime) studyTime.textContent = progress.studyTime + ' min';
    if (certificates) certificates.textContent = progress.certificates;
    if (booksRead) booksRead.textContent = progress.booksRead;
}

// ============================================
// Live Users Counter - Random number generation
// ============================================
function initLiveUsersCounter() {
    const liveCountElement = document.querySelector('.live-count');
    if (liveCountElement) {
        // Generate a random number between 1000 and 2000
        const randomUsers = Math.floor(Math.random() * 1000) + 1000;
        
        // Animate the number
        let current = 0;
        const target = randomUsers;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            liveCountElement.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
}

// ============================================
// Animated Counters on Scroll
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(target * easeOut);
                    
                    counter.textContent = current.toLocaleString() + '+';
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// Mini Quiz Modal Functions
// ============================================
let quizAnswers = {
    level: '',
    subject: '',
    goal: ''
};

function openMiniQuiz() {
    const modal = document.getElementById('miniQuizModal');
    if (modal) {
        modal.classList.add('active');
        // Reset quiz
        quizAnswers = { level: '', subject: '', goal: '' };
        showQuizStep(1);
    }
}

function closeMiniQuiz() {
    const modal = document.getElementById('miniQuizModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function showQuizStep(step) {
    // Hide all steps
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.add('hidden'));
    document.querySelectorAll('.quiz-result').forEach(r => r.classList.add('hidden'));
    
    // Show current step
    const currentStep = document.querySelector(`.quiz-step[data-step="${step}"]`);
    if (currentStep) {
        currentStep.classList.remove('hidden');
    }
    
    // Update progress bar
    const progress = (step / 3) * 100;
    document.getElementById('quizProgress').style.width = progress + '%';
}

function selectLevel(level) {
    quizAnswers.level = level;
    showQuizStep(2);
}

function selectSubject(subject) {
    quizAnswers.subject = subject;
    showQuizStep(3);
}

function selectGoal(goal) {
    quizAnswers.goal = goal;
    showQuizResult();
}

function showQuizResult() {
    // Hide step 3
    document.querySelector('.quiz-step[data-step="3"]').classList.add('hidden');
    
    // Show result
    const result = document.getElementById('quizResult');
    result.classList.remove('hidden');
    
    // Update progress to 100%
    document.getElementById('quizProgress').style.width = '100%';
    
    // Generate recommendation based on answers
    const recommendedPath = document.getElementById('recommendedPath');
    let pathName = '';
    let icon = '';
    
    const levelNames = {
        primary: 'Primary School',
        secondary: 'Secondary School',
        tvet: 'TVET',
        university: 'University'
    };
    
    const subjectNames = {
        math: 'Mathematics',
        science: 'Science',
        english: 'English',
        technology: 'Technology'
    };
    
    const subjectIcons = {
        math: 'fa-calculator',
        science: 'fa-flask',
        english: 'fa-language',
        technology: 'fa-laptop-code'
    };
    
    icon = subjectIcons[quizAnswers.subject] || 'fa-book';
    pathName = `${subjectNames[quizAnswers.subject] || 'General'} - ${levelNames[quizAnswers.level] || 'All Levels'}`;
    
    recommendedPath.innerHTML = `
        <h5>Recommended Learning Path:</h5>
        <div class="path-name">
            <i class="fas ${icon}"></i>
            ${pathName}
        </div>
    `;
}

function startRecommended() {
    closeMiniQuiz();
    window.location.href = 'pages/register.html';
}

// ============================================
// Credential Functions
// ============================================
function startCredential(type) {
    // Store the selected credential in localStorage for the dashboard
    const credentials = {
        algebra: { name: 'Algebra Master', icon: 'fa-calculator' },
        python: { name: 'Python Basics Certified', icon: 'fa-code' },
        physics: { name: 'Physics Fundamentals', icon: 'fa-flask' },
        english: { name: 'English Proficiency', icon: 'fa-language' }
    };
    
    const selected = credentials[type];
    if (selected) {
        localStorage.setItem('selectedCredential', JSON.stringify(selected));
        window.location.href = 'pages/register.html';
    }
}

// ============================================
// Book Library Functions (Previously Removed)
// ============================================
const libraryBooks = [
    {
        id: 1,
        title: 'Advanced Mathematics',
        author: 'Dr. John Smith',
        level: 'S1-S6',
        subject: 'Mathematics',
        cover: 'math',
        description: 'Comprehensive mathematics textbook covering algebra, calculus, and statistics.',
        chapters: 25,
        pages: 450
    },
    {
        id: 2,
        title: 'Physics Fundamentals',
        author: 'Prof. Sarah Johnson',
        level: 'S3-S6',
        subject: 'Physics',
        cover: 'physics',
        description: 'Introduction to mechanics, thermodynamics, and electromagnetism.',
        chapters: 20,
        pages: 380
    },
    {
        id: 3,
        title: 'Biology for Life',
        author: 'Dr. Michael Chen',
        level: 'S1-S6',
        subject: 'Biology',
        cover: 'biology',
        description: 'Study of living organisms, cell biology, and genetics.',
        chapters: 30,
        pages: 520
    },
    {
        id: 4,
        title: 'English Literature',
        author: 'Ms. Emily Williams',
        level: 'P4-S6',
        subject: 'English',
        cover: 'english',
        description: 'Classic literature and creative writing techniques.',
        chapters: 18,
        pages: 320
    },
    {
        id: 5,
        title: 'Chemistry Essential',
        author: 'Dr. Robert Brown',
        level: 'S3-S6',
        subject: 'Chemistry',
        cover: 'chemistry',
        description: 'Organic and inorganic chemistry principles.',
        chapters: 22,
        pages: 410
    },
    {
        id: 6,
        title: 'Computer Science Basics',
        author: 'Prof. David Lee',
        level: 'University',
        subject: 'Computer Science',
        cover: 'coding',
        description: 'Introduction to programming, algorithms, and data structures.',
        chapters: 35,
        pages: 600
    }
];

function searchBooks(query) {
    const lowerQuery = query.toLowerCase();
    return libraryBooks.filter(book => 
        book.title.toLowerCase().includes(lowerQuery) ||
        book.subject.toLowerCase().includes(lowerQuery) ||
        book.level.toLowerCase().includes(lowerQuery)
    );
}

function filterBooksByLevel(level) {
    if (!level || level === 'all') return libraryBooks;
    return libraryBooks.filter(book => book.level.includes(level) || level === 'all');
}

function filterBooksBySubject(subject) {
    if (!subject || subject === 'all') return libraryBooks;
    return libraryBooks.filter(book => book.subject.toLowerCase() === subject.toLowerCase());
}

// ============================================
// Initialize on DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    initLiveUsersCounter();
    animateCounters();
});

function searchBooks(query) {
    const lowerQuery = query.toLowerCase();
    return libraryBooks.filter(book => 
        book.title.toLowerCase().includes(lowerQuery) ||
        book.subject.toLowerCase().includes(lowerQuery) ||
        book.level.toLowerCase().includes(lowerQuery)
    );
}

function filterBooksByLevel(level) {
    if (!level || level === 'all') return libraryBooks;
    return libraryBooks.filter(book => book.level.includes(level) || level === 'all');
}

function filterBooksBySubject(subject) {
    if (!subject || subject === 'all') return libraryBooks;
    return libraryBooks.filter(book => book.subject.toLowerCase() === subject.toLowerCase());
}

// ============================================
// Initialize App
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    loadProgress();
    updateDashboardStats();
});

// ============================================
// Utility Functions
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(minutes) {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}
