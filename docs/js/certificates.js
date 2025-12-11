// Certificate Generation JavaScript

function generatePhaseCert() {
  const phase = document.getElementById('phase-select').value;
  if (!phase) {
    window.gypsyApp.showError('Please select a phase');
    return;
  }

  const phaseNames = {
    foundation: 'Foundation Obedience',
    advanced: 'Advanced Obedience',
    task: 'Task-Specific Training',
    public: 'Public Access Training'
  };

  const certData = {
    type: 'phase',
    title: 'Certificate of Achievement',
    subtitle: `${phaseNames[phase]} - Phase Completion`,
    recipient: 'Gypsy',
    description: `Has successfully completed the ${phaseNames[phase]} phase of professional service dog training`,
    handler: 'Marine Corps Veteran',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  renderCertificate(certData);
}

function generateTaskCert() {
  const taskName = document.getElementById('task-select').value;
  if (!taskName) {
    window.gypsyApp.showError('Please select a task');
    return;
  }

  const certData = {
    type: 'task',
    title: 'Certificate of Mastery',
    subtitle: `Service Dog Task: ${taskName}`,
    recipient: 'Gypsy',
    description: `Has demonstrated mastery of the ${taskName} task, meeting all service dog training standards`,
    handler: 'Marine Corps Veteran',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  renderCertificate(certData);
}

function generateGraduationCert() {
  const certData = {
    type: 'graduation',
    title: 'Service Dog Graduation Certificate',
    subtitle: 'Full Service Dog Certification',
    recipient: 'Gypsy',
    breed: 'Blue Nose Pitbull',
    description: `Has successfully completed all phases of professional service dog training and is hereby certified as a fully trained service dog, meeting all ADA requirements and standards`,
    handler: 'Marine Corps Veteran Handler',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    special: true
  };

  renderCertificate(certData);
}

function generateCustomCert() {
  const achievement = document.getElementById('custom-achievement').value;
  if (!achievement) {
    window.gypsyApp.showError('Please enter an achievement');
    return;
  }

  const certData = {
    type: 'custom',
    title: 'Certificate of Achievement',
    subtitle: achievement,
    recipient: 'Gypsy',
    description: `Is hereby recognized for outstanding achievement in service dog training`,
    handler: 'Marine Corps Veteran',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  renderCertificate(certData);
}

function renderCertificate(data) {
  const container = document.getElementById('certificate-container');
  const preview = document.getElementById('cert-preview');

  const certHTML = `
    <div class="certificate ${data.special ? 'certificate-special' : ''}">
      <div class="cert-border">
        <div class="cert-inner-border">
          <div class="cert-header">
            <div class="cert-emblem">🐕‍🦺</div>
            <h1 class="cert-title">${data.title}</h1>
            <div class="cert-subtitle">${data.subtitle}</div>
          </div>

          <div class="cert-body">
            <div class="cert-presented">This certificate is proudly presented to</div>
            <div class="cert-recipient">${data.recipient}</div>
            ${data.breed ? `<div class="cert-breed">${data.breed}</div>` : ''}

            <div class="cert-description">${data.description}</div>

            <div class="cert-footer">
              <div class="cert-signature-section">
                <div class="cert-signature-line"></div>
                <div class="cert-signature-label">Handler Signature</div>
                <div class="cert-signature-name">${data.handler}</div>
              </div>

              <div class="cert-seal">
                <div class="cert-seal-inner">
                  <div class="cert-seal-text">Service Dog<br/>Training<br/>Certified</div>
                </div>
              </div>

              <div class="cert-signature-section">
                <div class="cert-signature-line"></div>
                <div class="cert-signature-label">Date</div>
                <div class="cert-signature-name">${data.date}</div>
              </div>
            </div>

            <div class="cert-motto">
              <div class="cert-flag">🇺🇸</div>
              <div>Semper Fi • Dedicated Service Dog Training</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = certHTML;
  preview.style.display = 'block';
  preview.scrollIntoView({ behavior: 'smooth' });

  // Save to local storage
  saveCertificateRecord(data);
}

function saveCertificateRecord(data) {
  const certs = JSON.parse(localStorage.getItem('certificates') || '[]');
  certs.unshift({
    ...data,
    generatedAt: new Date().toISOString()
  });
  localStorage.setItem('certificates', JSON.stringify(certs));
  loadPastCertificates();
}

function loadPastCertificates() {
  const certs = JSON.parse(localStorage.getItem('certificates') || '[]');
  const container = document.getElementById('past-certs-list');

  if (certs.length === 0) {
    container.innerHTML = '<p class="empty-state">No certificates generated yet. Create your first one above!</p>';
    return;
  }

  let html = '';
  certs.forEach((cert, index) => {
    html += `
      <div class="past-cert-card">
        <div class="past-cert-icon">${cert.special ? '🌟' : '🏆'}</div>
        <h4>${cert.title}</h4>
        <p>${cert.subtitle}</p>
        <small>${new Date(cert.generatedAt).toLocaleDateString()}</small>
        <button class="btn btn-sm btn-secondary" onclick="regenerateCert(${index})">View Again</button>
      </div>
    `;
  });

  container.innerHTML = html;
}

function regenerateCert(index) {
  const certs = JSON.parse(localStorage.getItem('certificates') || '[]');
  if (certs[index]) {
    renderCertificate(certs[index]);
  }
}

function printCertificate() {
  window.print();
}

function saveCertificatePDF() {
  window.print();
  window.gypsyApp.showMessage('Use your browser\'s print dialog to save as PDF! 📄');
}

function closeCertificate() {
  document.getElementById('cert-preview').style.display = 'none';
}

// Load past certificates on page load
document.addEventListener('DOMContentLoaded', function() {
  loadPastCertificates();
});
