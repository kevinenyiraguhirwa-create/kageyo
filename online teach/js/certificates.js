// ============================================
// Certificates JavaScript - Auto Certificate Generator
// ============================================

// Certificate database
const certificates = [
    {
        id: 1,
        courseName: 'Biology Fundamentals',
        studentName: 'John Student',
        date: 'January 15, 2024',
        certificateId: 'EV-BIO-2024-001',
        score: 92,
        level: 'Secondary',
        duration: '3 months'
    },
    {
        id: 2,
        courseName: 'English Literature Mastery',
        studentName: 'John Student',
        date: 'February 20, 2024',
        certificateId: 'EV-ENG-2024-002',
        score: 88,
        level: 'Secondary',
        duration: '2 months'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadCertificates();
});

// Load certificates
function loadCertificates() {
    const grid = document.getElementById('certificatesGrid');
    if (!grid) return;
    
    // For demo, load from localStorage or use defaults
    const savedCerts = localStorage.getItem('certificates');
    const certs = savedCerts ? JSON.parse(savedCerts) : certificates;
    
    grid.innerHTML = '';
    certs.forEach(cert => {
        grid.innerHTML += createCertificateCard(cert);
    });
}

// Create certificate card HTML
function createCertificateCard(cert) {
    return `
        <div class="certificate-card">
            <div class="certificate-preview">
                <div class="cert-badge">
                    <i class="fas fa-certificate"></i>
                </div>
                <h3>${cert.courseName}</h3>
                <p>Completed on ${cert.date}</p>
            </div>
            <div class="certificate-details">
                <div class="cert-info">
                    <span><i class="fas fa-id-card"></i> ID: ${cert.certificateId}</span>
                    <span><i class="fas fa-star"></i> Score: ${cert.score}%</span>
                </div>
                <div class="cert-actions">
                    <button class="btn-view" onclick="viewCertificate(${cert.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn-download" onclick="downloadCertificate(${cert.id})">
                        <i class="fas fa-download"></i> Download PDF
                    </button>
                </div>
            </div>
        </div>
    `;
}

// View certificate
function viewCertificate(id) {
    const cert = certificates.find(c => c.id === id);
    if (!cert) return;
    
    const display = document.getElementById('certificateDisplay');
    display.innerHTML = generateCertificateHTML(cert);
    
    document.getElementById('certificateModal').classList.add('active');
}

// Close certificate modal
function closeCertificateModal() {
    document.getElementById('certificateModal').classList.remove('active');
}

// Generate certificate HTML
function generateCertificateHTML(cert) {
    return `
        <div class="certificate-template">
            <div class="cert-header">
                <div class="cert-logo">
                    <i class="fas fa-graduation-cap"></i>
                    <span>EduVault</span>
                </div>
                <h1>Certificate of Completion</h1>
            </div>
            
            <div class="cert-body">
                <p class="cert-presentation">This is to certify that</p>
                <h2 class="cert-name">${cert.studentName}</h2>
                <p class="cert-achievement">has successfully completed the course</p>
                <h3 class="cert-course">${cert.courseName}</h3>
                
                <div class="cert-details">
                    <div class="cert-detail">
                        <span class="label">Date of Completion</span>
                        <span class="value">${cert.date}</span>
                    </div>
                    <div class="cert-detail">
                        <span class="label">Score Achieved</span>
                        <span class="value">${cert.score}%</span>
                    </div>
                    <div class="cert-detail">
                        <span class="label">Level</span>
                        <span class="value">${cert.level}</span>
                    </div>
                    <div class="cert-detail">
                        <span class="label">Duration</span>
                        <span class="value">${cert.duration}</span>
                    </div>
                </div>
            </div>
            
            <div class="cert-footer">
                <div class="cert-id">
                    <span>Certificate ID: ${cert.certificateId}</span>
                </div>
                <div class="cert-verification">
                    <span>Verify at: eduvault.com/verify/${cert.certificateId}</span>
                </div>
            </div>
            
            <div class="cert-seal">
                <i class="fas fa-medal"></i>
            </div>
        </div>
    `;
}

// Download certificate as PDF
function downloadCertificate(id) {
    const cert = certificates.find(c => c.id === id);
    if (!cert) return;
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Certificate - ${cert.courseName}</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Poppins', sans-serif;
                    background: #f5f5f5;
                    padding: 40px;
                }
                
                .certificate {
                    max-width: 800px;
                    margin: 0 auto;
                    background: white;
                    padding: 60px;
                    border: 8px solid #6366f1;
                    border-radius: 20px;
                    text-align: center;
                    position: relative;
                }
                
                .cert-header {
                    margin-bottom: 40px;
                }
                
                .cert-logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    font-size: 28px;
                    font-weight: 700;
                    color: #6366f1;
                    margin-bottom: 20px;
                }
                
                .cert-logo i {
                    font-size: 36px;
                }
                
                h1 {
                    font-size: 42px;
                    color: #1e1b4b;
                    margin-bottom: 10px;
                }
                
                .cert-presentation {
                    font-size: 18px;
                    color: #64748b;
                    margin-bottom: 20px;
                }
                
                .cert-name {
                    font-size: 36px;
                    color: #6366f1;
                    margin-bottom: 20px;
                }
                
                .cert-achievement {
                    font-size: 16px;
                    color: #64748b;
                    margin-bottom: 10px;
                }
                
                .cert-course {
                    font-size: 28px;
                    color: #1e1b4b;
                    margin-bottom: 40px;
                }
                
                .cert-details {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    margin-bottom: 40px;
                }
                
                .cert-detail {
                    text-align: left;
                    padding: 15px;
                    background: #f8fafc;
                    border-radius: 10px;
                }
                
                .cert-detail .label {
                    display: block;
                    font-size: 12px;
                    color: #94a3b8;
                    margin-bottom: 5px;
                }
                
                .cert-detail .value {
                    font-size: 16px;
                    font-weight: 600;
                    color: #1e1b4b;
                }
                
                .cert-footer {
                    border-top: 2px solid #e2e8f0;
                    padding-top: 20px;
                }
                
                .cert-id {
                    font-size: 14px;
                    color: #64748b;
                    margin-bottom: 10px;
                }
                
                .cert-verification {
                    font-size: 12px;
                    color: #94a3b8;
                }
                
                .cert-seal {
                    position: absolute;
                    bottom: 40px;
                    right: 40px;
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #f59e0b, #fbbf24);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .cert-seal i {
                    font-size: 36px;
                    color: white;
                }
                
                @media print {
                    body {
                        background: white;
                    }
                    .certificate {
                        border: 4px solid #6366f1;
                    }
                }
            </style>
        </head>
        <body>
            <div class="certificate">
                <div class="cert-header">
                    <div class="cert-logo">
                        <i class="fas fa-graduation-cap"></i>
                        <span>EduVault</span>
                    </div>
                    <h1>Certificate of Completion</h1>
                </div>
                
                <div class="cert-body">
                    <p class="cert-presentation">This is to certify that</p>
                    <h2 class="cert-name">${cert.studentName}</h2>
                    <p class="cert-achievement">has successfully completed the course</p>
                    <h3 class="cert-course">${cert.courseName}</h3>
                    
                    <div class="cert-details">
                        <div class="cert-detail">
                            <span class="label">Date of Completion</span>
                            <span class="value">${cert.date}</span>
                        </div>
                        <div class="cert-detail">
                            <span class="label">Score Achieved</span>
                            <span class="value">${cert.score}%</span>
                        </div>
                        <div class="cert-detail">
                            <span class="label">Level</span>
                            <span class="value">${cert.level}</span>
                        </div>
                        <div class="cert-detail">
                            <span class="label">Duration</span>
                            <span class="value">${cert.duration}</span>
                        </div>
                    </div>
                </div>
                
                <div class="cert-footer">
                    <div class="cert-id">
                        <span>Certificate ID: ${cert.certificateId}</span>
                    </div>
                    <div class="cert-verification">
                        <span>Verify at: eduvault.com/verify/${cert.certificateId}</span>
                    </div>
                </div>
                
                <div class="cert-seal">
                    <i class="fas fa-medal"></i>
                </div>
            </div>
            
            <script>
                window.onload = function() {
                    window.print();
                }
            <\/script>
        </body>
        </html>
    `);
    
    printWindow.document.close();
}

// Auto-generate certificate when course is completed
function autoGenerateCertificate(courseName, studentName, score) {
    const certificateId = 'EV-' + Date.now().toString(36).toUpperCase();
    const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const newCert = {
        id: certificates.length + 1,
        courseName: courseName,
        studentName: studentName,
        date: date,
        certificateId: certificateId,
        score: score,
        level: 'Secondary',
        duration: 'Variable'
    };
    
    // Save to localStorage
    certificates.push(newCert);
    localStorage.setItem('certificates', JSON.stringify(certificates));
    
    // Trigger download
    downloadCertificate(newCert.id);
    
    return newCert;
}

// Verify certificate
function verifyCertificate(certificateId) {
    const cert = certificates.find(c => c.certificateId === certificateId);
    if (cert) {
        return {
            valid: true,
            certificate: cert
        };
    }
    return { valid: false };
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('certificateModal');
    if (event.target === modal) {
        closeCertificateModal();
    }
};

// Add certificate-specific styles
const certStyles = document.createElement('style');
certStyles.textContent = `
    .certificates-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
    
    .certificate-card {
        background: white;
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-md);
    }
    
    .certificate-preview {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        padding: 2rem;
        text-align: center;
        color: white;
    }
    
    .cert-badge {
        width: 60px;
        height: 60px;
        background: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
    }
    
    .cert-badge i {
        font-size: 1.5rem;
        color: #6366f1;
    }
    
    .certificate-preview h3 {
        margin-bottom: 0.5rem;
    }
    
    .certificate-preview p {
        opacity: 0.9;
        font-size: 0.875rem;
    }
    
    .certificate-details {
        padding: 1.5rem;
    }
    
    .cert-info {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
        font-size: 0.875rem;
        color: var(--gray-500);
    }
    
    .cert-info i {
        color: var(--primary-color);
        margin-right: 0.5rem;
    }
    
    .cert-actions {
        display: flex;
        gap: 1rem;
    }
    
    .btn-view, .btn-download {
        flex: 1;
        padding: 0.75rem;
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
    
    .btn-view {
        background: var(--gray-100);
        color: var(--dark-bg);
    }
    
    .btn-view:hover {
        background: var(--gray-200);
    }
    
    .btn-download {
        background: var(--primary-color);
        color: white;
    }
    
    .btn-download:hover {
        background: var(--primary-dark);
    }
    
    /* Progress Certificates */
    .progress-certificates {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .progress-cert-item {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        background: white;
        padding: 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
    }
    
    .cert-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        color: white;
    }
    
    .cert-icon.pending {
        background: var(--gradient-secondary);
    }
    
    .cert-progress-info {
        flex: 1;
    }
    
    .cert-progress-info h4 {
        font-size: 1rem;
        color: var(--dark-bg);
        margin-bottom: 0.25rem;
    }
    
    .cert-progress-info p {
        font-size: 0.75rem;
        color: var(--gray-500);
        margin-bottom: 0.5rem;
    }
    
    .cert-progress-info .progress-bar {
        height: 6px;
        background: var(--gray-200);
        border-radius: 10px;
        overflow: hidden;
    }
    
    .cert-progress-info .progress-fill {
        height: 100%;
        background: var(--gradient-primary);
    }
    
    /* Available Certificates */
    .available-certificates {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
    }
    
    .available-cert {
        background: white;
        padding: 2rem;
        border-radius: var(--radius-lg);
        text-align: center;
        box-shadow: var(--shadow-sm);
        border: 2px dashed var(--gray-200);
    }
    
    .available-cert i {
        font-size: 2.5rem;
        color: var(--gray-300);
        margin-bottom: 1rem;
    }
    
    .available-cert h4 {
        font-size: 1rem;
        color: var(--dark-bg);
        margin-bottom: 0.5rem;
    }
    
    .available-cert p {
        font-size: 0.75rem;
        color: var(--gray-500);
    }
    
    /* Certificate Modal */
    .certificate-modal {
        max-width: 800px;
        padding: 0;
    }
    
    .certificate-template {
        padding: 3rem;
        text-align: center;
        position: relative;
    }
    
    .certificate-template h1 {
        font-size: 2rem;
        color: var(--primary-color);
        margin-bottom: 2rem;
    }
    
    .certificate-template .cert-name {
        font-size: 1.75rem;
        color: var(--dark-bg);
        margin: 1rem 0;
    }
    
    .certificate-template .cert-course {
        font-size: 1.5rem;
        color: var(--primary-color);
        margin-bottom: 2rem;
    }
    
    .certificate-template .cert-details {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin: 2rem 0;
    }
    
    .certificate-template .cert-detail {
        background: var(--gray-100);
        padding: 1rem;
        border-radius: var(--radius-md);
    }
    
    .certificate-template .cert-detail .label {
        display: block;
        font-size: 0.75rem;
        color: var(--gray-500);
    }
    
    .certificate-template .cert-detail .value {
        font-weight: 600;
    }
    
    .certificate-template .cert-seal {
        position: absolute;
        bottom: 2rem;
        right: 2rem;
        width: 80px;
        height: 80px;
        background: var(--gradient-accent);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .certificate-template .cert-seal i {
        font-size: 2rem;
        color: white;
    }
    
    @media (max-width: 768px) {
        .certificates-grid, .available-certificates {
            grid-template-columns: 1fr;
        }
        
        .progress-cert-item {
            flex-direction: column;
            text-align: center;
        }
    }
`;
document.head.appendChild(certStyles);
