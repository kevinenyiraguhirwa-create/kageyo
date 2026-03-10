// ============================================
// Library JavaScript - Smart Digital Library
// ============================================

// Free OER Books Database (OpenStax, Project Gutenberg, LibreTexts)
const booksDatabase = [
    // OpenStax University Level - Mathematics
    {
        id: 1,
        title: 'Calculus Volume 1',
        author: 'Gilbert Strang, Edwin "Jed" Herman',
        level: 'University',
        levelDetail: 'University - Calculus',
        subject: 'Mathematics',
        cover: 'math',
        description: 'Free peer-reviewed textbook covering limits, derivatives, and integrals. From OpenStax - used by millions of students worldwide.',
        chapters: 5,
        pages: 896,
        rating: 4.9,
        downloads: 45000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/calculus-volume-1/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/calculus-volume-1/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/calculus-volume-1.jpg'
    },
    {
        id: 2,
        title: 'Calculus Volume 2',
        author: 'Gilbert Strang, Edwin "Jed" Herman',
        level: 'University',
        levelDetail: 'University - Calculus',
        subject: 'Mathematics',
        cover: 'math',
        description: 'Integration techniques, sequences, series, and differential equations. Part of the OpenStax free textbook series.',
        chapters: 7,
        pages: 832,
        rating: 4.9,
        downloads: 38000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/calculus-volume-2/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/calculus-volume-2/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/calculus-volume-2.jpg'
    },
    {
        id: 3,
        title: 'Algebra and Trigonometry',
        author: 'Jay Abramson, et al.',
        level: 'Secondary',
        levelDetail: 'S3-S6 / University Prep',
        subject: 'Mathematics',
        cover: 'math',
        description: 'Comprehensive algebra and trigonometry textbook. Perfect for secondary students and university preparation.',
        chapters: 11,
        pages: 1152,
        rating: 4.8,
        downloads: 52000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/algebra-and-trigonometry/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/algebra-and-trigonometry/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/algebra-and-trigonometry.jpg'
    },
    // OpenStax Sciences
    {
        id: 4,
        title: 'Biology 2e',
        author: 'Mary Ann Clark, Jung Choi, Matthew Douglas',
        level: 'Secondary/University',
        levelDetail: 'S3-S6 / University',
        subject: 'Biology',
        cover: 'biology',
        description: 'Peer-reviewed biology textbook covering cells, genetics, evolution, ecology, and more. 800+ pages of free content.',
        chapters: 28,
        pages: 816,
        rating: 4.9,
        downloads: 67000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/biology-2e/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/biology-2e/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/biology-2e.jpg'
    },
    {
        id: 5,
        title: 'Chemistry 2e',
        author: 'Paul Flowers, et al.',
        level: 'Secondary/University',
        levelDetail: 'S3-S6 / University',
        subject: 'Chemistry',
        cover: 'chemistry',
        description: 'General chemistry textbook covering atomic structure, bonding, reactions, and thermodynamics.',
        chapters: 21,
        pages: 1040,
        rating: 4.8,
        downloads: 43000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/chemistry-2e/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/chemistry-2e/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/chemistry-2e.jpg'
    },
    {
        id: 6,
        title: 'Physics',
        author: 'Paul Peter Urone, Roger Hinrichs',
        level: 'Secondary/University',
        levelDetail: 'S3-S6 / University',
        subject: 'Physics',
        cover: 'physics',
        description: 'College physics textbook covering mechanics, thermodynamics, waves, optics, and modern physics.',
        chapters: 31,
        pages: 1260,
        rating: 4.8,
        downloads: 38000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/physics/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/physics/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/physics.jpg'
    },
    // OpenStax Social Sciences
    {
        id: 7,
        title: 'U.S. History',
        author: 'OpenStax',
        level: 'Secondary/University',
        levelDetail: 'S1-S6 / University',
        subject: 'History',
        cover: 'history',
        description: 'Comprehensive U.S. history from pre-contact to present day. Includes primary sources and discussion questions.',
        chapters: 17,
        pages: 980,
        rating: 4.7,
        downloads: 28000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/us-history/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/us-history/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/us-history.jpg'
    },
    {
        id: 8,
        title: 'Introduction to Sociology',
        author: 'OpenStax',
        level: 'University',
        levelDetail: 'University',
        subject: 'Sociology',
        cover: 'history',
        description: 'Foundations of sociology covering social theory, culture, inequality, and social institutions.',
        chapters: 21,
        pages: 636,
        rating: 4.8,
        downloads: 22000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/introduction-sociology-3e/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/introduction-sociology-3e/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/introduction-sociology-3e.jpg'
    },
    // Computer Science
    {
        id: 9,
        title: 'Introduction to Computer Science',
        author: 'Oscar Forero, et al.',
        level: 'University',
        levelDetail: 'University',
        subject: 'Computer Science',
        cover: 'coding',
        description: 'Introduction to programming using Python. Covers fundamentals, algorithms, and data structures.',
        chapters: 15,
        pages: 480,
        rating: 4.9,
        downloads: 55000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/introduction-computer-science/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/introduction-computer-science/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/introduction-computer-science.jpg'
    },
    // Psychology
    {
        id: 10,
        title: 'Psychology 2e',
        author: 'OpenStax',
        level: 'University',
        levelDetail: 'University',
        subject: 'Psychology',
        cover: 'biology',
        description: 'Comprehensive introduction to psychology covering biological basis, sensation, consciousness, learning, and more.',
        chapters: 17,
        pages: 840,
        rating: 4.8,
        downloads: 32000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/psychology-2e/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/psychology-2e/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/psychology-2e.jpg'
    },
    // Business
    {
        id: 11,
        title: 'Principles of Economics 3e',
        author: 'Steven A. Greenlaw, Timothy Taylor',
        level: 'University',
        levelDetail: 'University',
        subject: 'Business',
        cover: 'business',
        description: 'Introduction to economics covering microeconomics, macroeconomics, and global economic issues.',
        chapters: 38,
        pages: 896,
        rating: 4.7,
        downloads: 41000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/principles-economics-3e/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/principles-economics-3e/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/principles-economics-3e.jpg'
    },
    // Precalculus
    {
        id: 12,
        title: 'Precalculus',
        author: 'Jay Abramson, et al.',
        level: 'Secondary',
        levelDetail: 'S5-S6 / University Prep',
        subject: 'Mathematics',
        cover: 'math',
        description: 'Preparation for calculus covering algebra, trigonometry, and analytic geometry. Essential for STEM students.',
        chapters: 12,
        pages: 1152,
        rating: 4.8,
        downloads: 48000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/precalculus/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/precalculus/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/precalculus.jpg'
    },
    // Statistics
    {
        id: 13,
        title: 'Statistics',
        author: 'Barbara Illowsky, Susan Dean',
        level: 'University',
        levelDetail: 'University',
        subject: 'Mathematics',
        cover: 'math',
        description: 'Introductory statistics textbook covering descriptive statistics, probability, hypothesis testing, and regression.',
        chapters: 13,
        pages: 950,
        rating: 4.8,
        downloads: 36000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/statistics/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/statistics/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/statistics.jpg'
    },
    // Anatomy & Physiology
    {
        id: 14,
        title: 'Anatomy and Physiology',
        author: 'J. Gordon Betts, et al.',
        level: 'University',
        levelDetail: 'University',
        subject: 'Biology',
        cover: 'biology',
        description: 'Comprehensive anatomy and physiology covering all body systems. Includes interactive figures and diagrams.',
        chapters: 28,
        pages: 1200,
        rating: 4.9,
        downloads: 42000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/anatomy-and-physiology/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/anatomy-and-physiology/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/anatomy-and-physiology.jpg'
    },
    // Project Gutenberg Classics
    {
        id: 15,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        level: 'Secondary',
        levelDetail: 'S1-S6',
        subject: 'English',
        cover: 'english',
        description: 'Classic English novel by Jane Austen. Free public domain book from Project Gutenberg.',
        chapters: 61,
        pages: 432,
        rating: 4.9,
        downloads: 120000,
        source: 'Project Gutenberg',
        readUrl: 'https://www.gutenberg.org/ebooks/1342',
        downloadUrl: 'https://www.gutenberg.org/ebooks/1342.epub3.images',
        coverUrl: 'https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg'
    },
    {
        id: 16,
        title: 'Romeo and Juliet',
        author: 'William Shakespeare',
        level: 'Secondary',
        levelDetail: 'S1-S6',
        subject: 'English',
        cover: 'english',
        description: 'Classic Shakespeare tragedy. Free public domain play from Project Gutenberg.',
        chapters: 5,
        pages: 180,
        rating: 4.9,
        downloads: 85000,
        source: 'Project Gutenberg',
        readUrl: 'https://www.gutenberg.org/ebooks/1513',
        downloadUrl: 'https://www.gutenberg.org/ebooks/1513.epub3.images',
        coverUrl: 'https://www.gutenberg.org/cache/epub/1513/pg1513.cover.medium.jpg'
    },
    // Additional OER Resources
    {
        id: 17,
        title: 'Elementary Algebra',
        author: 'OpenStax',
        level: 'Primary/Secondary',
        levelDetail: 'P6-S2',
        subject: 'Mathematics',
        cover: 'math',
        description: 'Beginning algebra covering equations, polynomials, factoring, and graphing. Perfect for building foundational math skills.',
        chapters: 10,
        pages: 656,
        rating: 4.7,
        downloads: 29000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/elementary-algebra/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/elementary-algebra/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/elementary-algebra.jpg'
    },
    {
        id: 18,
        title: 'Microbiology',
        author: 'OpenStax',
        level: 'University',
        levelDetail: 'University',
        subject: 'Biology',
        cover: 'biology',
        description: 'Introduction to microbiology covering bacteria, viruses, fungi, and the immune system.',
        chapters: 26,
        pages: 900,
        rating: 4.8,
        downloads: 25000,
        source: 'OpenStax',
        readUrl: 'https://openstax.org/books/microbiology/pages/1-introduction',
        downloadUrl: 'https://openstax.org/books/microbiology/pages/1-introduction',
        coverUrl: 'https://openstax.org/apps/oerpublishing/media/images/book-covers/microbiology.jpg'
    }
];

// Initialize library on page load
document.addEventListener('DOMContentLoaded', function() {
    loadBooks(booksDatabase);
});

// Load books into the grid
function loadBooks(books) {
    const grid = document.getElementById('booksGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    books.forEach(book => {
        const card = createBookCard(book);
        grid.innerHTML += card;
    });
}

// Create book card HTML
function createBookCard(book) {
    const coverStyle = book.coverUrl ? `background-image: url('${book.coverUrl}'); background-size: cover; background-position: center;` : '';
    const sourceBadge = book.source ? `<span class="book-source">${book.source}</span>` : '';
    
    return `
        <div class="book-card" onclick="openPreview(${book.id})">
            <div class="book-cover ${book.cover}" style="${coverStyle}">
                ${!book.coverUrl ? '<i class="fas fa-book"></i>' : ''}
                <div class="book-actions">
                    <button class="book-action-btn" onclick="event.stopPropagation(); readBook(${book.id})" title="Read Online">
                        <i class="fas fa-book-reader"></i>
                    </button>
                    <button class="book-action-btn" onclick="event.stopPropagation(); downloadBook(${book.id})" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="author">${book.author}</p>
                <div class="book-meta">
                    <span><i class="fas fa-layer-group"></i> ${book.chapters} chapters</span>
                    <span><i class="fas fa-file"></i> ${book.pages} pages</span>
                </div>
                <span class="book-level">${book.levelDetail}</span>
            </div>
        </div>
    `;
}

// Search books
function searchBooks() {
    const query = document.getElementById('librarySearch').value.toLowerCase();
    
    if (query.length < 2) {
        loadBooks(booksDatabase);
        return;
    }
    
    const filtered = booksDatabase.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.subject.toLowerCase().includes(query) ||
        book.level.toLowerCase().includes(query)
    );
    
    loadBooks(filtered);
}

// Filter books by level and subject
function filterBooks() {
    const level = document.getElementById('levelFilter').value;
    const subject = document.getElementById('subjectFilter').value;
    const query = document.getElementById('librarySearch').value.toLowerCase();
    
    let filtered = booksDatabase;
    
    // Filter by level
    if (level !== 'all') {
        filtered = filtered.filter(book => 
            book.level.toLowerCase() === level ||
            (level === 'primary' && book.level === 'Primary') ||
            (level === 'secondary' && book.level === 'Secondary') ||
            (level === 'university' && book.level === 'University')
        );
    }
    
    // Filter by subject
    if (subject !== 'all') {
        filtered = filtered.filter(book => 
            book.subject.toLowerCase() === subject
        );
    }
    
    // Filter by search query
    if (query) {
        filtered = filtered.filter(book => 
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.subject.toLowerCase().includes(query)
        );
    }
    
    loadBooks(filtered);
}

// Open book preview modal
function openPreview(bookId) {
    const book = booksDatabase.find(b => b.id === bookId);
    if (!book) return;
    
    document.getElementById('previewTitle').textContent = book.title;
    document.getElementById('previewAuthor').textContent = book.author;
    document.getElementById('previewChapters').textContent = book.chapters;
    document.getElementById('previewPages').textContent = book.pages;
    document.getElementById('previewLevel').textContent = book.levelDetail;
    document.getElementById('previewDescription').textContent = book.description;
    
    const cover = document.getElementById('previewCover');
    cover.className = 'preview-cover ' + book.cover;
    
    document.getElementById('bookPreviewModal').classList.add('active');
}

// Close preview modal
function closePreview() {
    document.getElementById('bookPreviewModal').classList.remove('active');
}

// Read book online
function readBook(bookId) {
    const book = booksDatabase.find(b => b.id === bookId);
    if (book) {
        if (book.readUrl) {
            // Open the OER book in a new tab
            window.open(book.readUrl, '_blank');
        } else {
            alert('Opening ' + book.title + '...\n\nIn a full implementation, this would open the book reader.');
        }
    }
}

// Download book
function downloadBook(bookId) {
    const book = booksDatabase.find(b => b.id === bookId);
    if (book) {
        if (book.downloadUrl) {
            // Open download/page in a new tab
            window.open(book.downloadUrl, '_blank');
        } else {
            alert('Downloading ' + book.title + '...\n\nIn a full implementation, this would start the PDF download.');
        }
    }
}

// Show upload modal (for teachers/admin)
function showUploadModal() {
    alert('Bulk Upload Feature\n\nIn a full implementation, this would open a modal for teachers/admins to upload books in bulk.');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookPreviewModal');
    if (event.target === modal) {
        closePreview();
    }
};
