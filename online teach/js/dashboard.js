// ============================================
// Dashboard JavaScript
// ============================================

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    initializeDashboard();
});

// Load user data
function loadUserData() {
    const user = getCurrentUser();
    if (!user) {
        // Redirect to login if not logged in
        // window.location.href = 'login.html';
        return;
    }
    
    // Update user info in header
    const userName = document.getElementById('userName');
    const displayUserName = document.getElementById('displayUserName');
    
    if (userName) userName.textContent = user.name || 'Student';
    if (displayUserName) displayUserName.textContent = user.name || 'Student';
    
    // Load progress data
    loadProgressData();
}

// Load progress data
function loadProgressData() {
    const progress = loadProgress();
    
    // Update stats
    updateStat('completedCourses', progress.completedCourses || 0);
    updateStat('completedModules', progress.completedModules || 0);
    updateStat('totalQuizzes', progress.totalQuizzes || 0);
    updateStat('averageScore', (progress.averageScore || 0) + '%');
}

// Update stat element
function updateStat(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// Initialize dashboard features
function initializeDashboard() {
    // Add any additional dashboard initialization here
    console.log('Dashboard initialized');
}

// Progress tracking
function loadProgress() {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : {
        completedCourses: 3,
        completedModules: 15,
        totalQuizzes: 25,
        averageScore: 82,
        studyTime: 1250,
        certificates: 2,
        booksRead: 12
    };
}

function saveProgress(progress) {
    localStorage.setItem('userProgress', JSON.stringify(progress));
}

// Update progress when user completes something
function updateUserProgress(type, value) {
    const progress = loadProgress();
    
    switch(type) {
        case 'course':
            progress.completedCourses += value;
            break;
        case 'module':
            progress.completedModules += value;
            break;
        case 'quiz':
            progress.totalQuizzes += value;
            break;
        case 'score':
            progress.averageScore = value;
            break;
        case 'time':
            progress.studyTime += value;
            break;
        case 'certificate':
            progress.certificates += value;
            break;
        case 'book':
            progress.booksRead += value;
            break;
    }
    
    saveProgress(progress);
    loadProgressData(); // Refresh display
}

// Track study time
let studyTimer = null;
let studySeconds = 0;

function startStudyTimer() {
    if (studyTimer) return;
    
    studyTimer = setInterval(() => {
        studySeconds++;
        
        // Save every minute
        if (studySeconds % 60 === 0) {
            updateUserProgress('time', 1);
        }
    }, 1000);
}

function stopStudyTimer() {
    if (studyTimer) {
        clearInterval(studyTimer);
        studyTimer = null;
    }
}

// Get recommended courses based on user progress
function getRecommendations() {
    const progress = loadProgress();
    const recommendations = [];
    
    // Simple recommendation logic
    if (progress.completedCourses < 3) {
        recommendations.push({
            title: 'Advanced Mathematics',
            reason: 'Popular among students',
            icon: 'math'
        });
    }
    
    if (progress.averageScore < 70) {
        recommendations.push({
            title: 'Study Skills 101',
            reason: 'Improve your scores',
            icon: 'star'
        });
    }
    
    return recommendations;
}

// Export functions for use in other scripts
window.dashboardFunctions = {
    updateProgress: updateUserProgress,
    loadProgress: loadProgress,
    startStudyTimer: startStudyTimer,
    stopStudyTimer: stopStudyTimer
};
