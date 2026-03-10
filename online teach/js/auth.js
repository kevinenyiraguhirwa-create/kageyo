// ============================================
// Authentication JavaScript
// ============================================

// Demo users for testing
const demoUsers = {
    student: {
        id: 'student-001',
        name: 'John Student',
        email: 'student@demo.com',
        password: 'demo123',
        role: 'student',
        avatar: null,
        level: 'S5',
        progress: {
            completedCourses: 3,
            completedModules: 15,
            totalQuizzes: 25,
            averageScore: 82,
            studyTime: 1250,
            certificates: 2,
            booksRead: 12
        }
    },
    teacher: {
        id: 'teacher-001',
        name: 'Mrs. Sarah Teacher',
        email: 'teacher@demo.com',
        password: 'demo123',
        role: 'teacher',
        avatar: null,
        subjects: ['Mathematics', 'Physics'],
        students: 150
    },
    admin: {
        id: 'admin-001',
        name: 'Admin User',
        email: 'admin@demo.com',
        password: 'demo123',
        role: 'admin',
        avatar: null
    }
};

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (!email || !password) {
        showNotification('Please enter email and password', 'error');
        return;
    }
    
    // Check against demo users
    const user = Object.values(demoUsers).find(u => u.email === email && u.password === password);
    
    if (user) {
        loginUser(user);
    } else {
        // For demo, accept any login
        const newUser = {
            id: 'user-' + Date.now(),
            name: email.split('@')[0],
            email: email,
            role: 'student'
        };
        loginUser(newUser);
    }
}

// Login user
function loginUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userProgress', JSON.stringify(user.progress || {}));
    
    showNotification('Welcome back, ' + user.name + '!', 'success');
    
    // Redirect based on role
    setTimeout(() => {
        switch(user.role) {
            case 'admin':
                window.location.href = 'admin-dashboard.html';
                break;
            case 'teacher':
                window.location.href = 'teacher-dashboard.html';
                break;
            default:
                window.location.href = 'dashboard.html';
        }
    }, 1000);
}

// Demo login for quick testing
function demoLogin(role) {
    const user = demoUsers[role];
    if (user) {
        loginUser(user);
    }
}

// Social login simulation
function socialLogin(provider) {
    showNotification('Connecting to ' + provider + '...', 'info');
    
    setTimeout(() => {
        const socialUser = {
            id: 'social-' + Date.now(),
            name: 'Social User',
            email: 'social@' + provider + '.com',
            role: 'student',
            loginMethod: provider
        };
        loginUser(socialUser);
    }, 1500);
}

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(user);
}

// Logout user
function logoutUser() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userProgress');
    showNotification('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Register new user
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const level = document.getElementById('level').value;
    const terms = document.getElementById('terms').checked;
    
    // Validation
    if (!name || !email || !password) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (!terms) {
        showNotification('Please accept the terms and conditions', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: 'user-' + Date.now(),
        name: name,
        email: email,
        password: password,
        role: 'student',
        level: level,
        createdAt: new Date().toISOString(),
        progress: {
            completedCourses: 0,
            completedModules: 0,
            totalQuizzes: 0,
            averageScore: 0,
            studyTime: 0,
            certificates: 0,
            booksRead: 0
        }
    };
    
    // Save user (in localStorage for demo)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    loginUser(newUser);
}

// Initialize auth check on protected pages
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page that requires auth
    const path = window.location.pathname;
    if (path.includes('dashboard.html') || 
        path.includes('admin-dashboard.html') || 
        path.includes('teacher-dashboard.html')) {
        checkAuth();
    }
});
