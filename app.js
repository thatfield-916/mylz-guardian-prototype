// ===== MyLZ GUARDIAN PROTOTYPE — App Logic =====

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderCheckins();
  renderSmartActions('now');
  renderRiskDomains();
  renderLifecycle();
  renderNotifications('all');
  initSearch();
  initNotifications();
  initExpert();
  initActionTabs();
});

// ===== NAVIGATION (Centers #7) =====
function initNavigation() {
  const tabs = document.querySelectorAll('.center-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const center = tab.dataset.center;
      document.querySelectorAll('.center-view').forEach(v => v.classList.remove('active'));
      document.getElementById(`view-${center}`).classList.add('active');
      // Close any open panels
      closeAllPanels();
    });
  });
}

// ===== CHECK-INS & RECOMMENDATIONS (#5) =====
function renderCheckins() {
  const container = document.getElementById('checkinCards');
  container.innerHTML = CHECKINS.map(c => `
    <div class="checkin-card">
      <div class="cc-trigger"><span class="dot ${c.triggerType}"></span>${c.trigger}</div>
      <h3>${c.title}</h3>
      <p>${c.description}</p>
      <div class="cc-reco">
        <strong>${c.reco.label}</strong>
        ${c.reco.text}
      </div>
    </div>
  `).join('');
}

// ===== SMART ACTIONS (#1) =====
function initActionTabs() {
  const tabs = document.querySelectorAll('.at-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSmartActions(tab.dataset.urgency);
    });
  });
}

function renderSmartActions(urgency) {
  const container = document.getElementById('actionsList');
  const actions = SMART_ACTIONS[urgency] || [];
  container.innerHTML = actions.map((a, i) => `
    <div class="action-card urgency-${urgency}">
      <div class="ac-top">
        <span class="ac-title">${a.title}</span>
        <span class="ac-urgency ${urgency}">${urgency}</span>
      </div>
      <div class="ac-risk">${a.risk}</div>
      <div class="ac-confidence">
        <span class="why">Why this matters:</span> ${a.why}<br>
        <span class="ignore">If ignored:</span> ${a.ignore}
      </div>
      <div class="ac-delegate">
        ${a.delegates.map(d => delegateButton(d, a.triggersModal && d === 'diy')).join('')}
      </div>
    </div>
  `).join('');
}

function delegateButton(type, triggersModal) {
  const labels = {
    diy: 'Do It Myself',
    difm: 'LZ Does It For Me',
    concierge: 'Ask Concierge',
    bap: 'Ask BAP Attorney'
  };
  const onclick = triggersModal ? `onclick="showPostAction()"` : '';
  return `<button class="delegate-btn ${type}" ${onclick}>${labels[type]}</button>`;
}

// ===== RISK REPORT (#2) =====
function renderRiskDomains() {
  const container = document.getElementById('riskDomains');
  container.innerHTML = RISK_DOMAINS.map(d => `
    <div class="risk-domain">
      <div class="rd-header">
        <span class="rd-title">${d.icon} ${d.title}</span>
        <span class="rd-status ${d.status}">${d.statusLabel}</span>
      </div>
      <div class="rd-items">
        ${d.items.map(item => `
          <div class="rd-item">
            <span class="rd-dot ${item.color}"></span>
            ${item.label}
          </div>
        `).join('')}
      </div>
      <div class="rd-monitor">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Last checked: ${d.lastChecked}
      </div>
    </div>
  `).join('');
}

// ===== LIFECYCLE TIMELINE (#6) =====
function renderLifecycle() {
  const container = document.getElementById('lifecycleTimeline');
  container.innerHTML = LIFECYCLE_EVENTS.map(e => `
    <div class="lc-event ${e.status}">
      <div class="lc-dot"></div>
      <div class="lc-card">
        <div class="lc-date">${e.date}</div>
        <div class="lc-title">${e.title}</div>
        <span class="lc-channel">${e.channel}</span>
      </div>
    </div>
  `).join('');
}

// ===== NOTIFICATIONS (#3) =====
function initNotifications() {
  const toggle = document.getElementById('notifToggle');
  const panel = document.getElementById('notifPanel');
  const prefBtn = document.getElementById('notifPrefBtn');
  const prefBack = document.getElementById('prefBack');
  const prefs = document.getElementById('notifPrefs');
  const list = document.getElementById('notifList');
  const filters = document.getElementById('notifPanel').querySelectorAll('.nf-btn');

  toggle.addEventListener('click', () => {
    closeAllPanels();
    panel.classList.toggle('open');
  });

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderNotifications(btn.dataset.filter);
    });
  });

  prefBtn.addEventListener('click', () => {
    prefs.classList.remove('hidden');
    list.parentElement.querySelector('.notif-filters').classList.add('hidden');
    list.classList.add('hidden');
  });

  prefBack.addEventListener('click', () => {
    prefs.classList.add('hidden');
    list.parentElement.querySelector('.notif-filters').classList.remove('hidden');
    list.classList.remove('hidden');
  });
}

function renderNotifications(filter) {
  const container = document.getElementById('notifList');
  const filtered = filter === 'all' ? NOTIFICATIONS : NOTIFICATIONS.filter(n => n.type === filter);
  container.innerHTML = filtered.map(n => `
    <div class="notif-item ${n.unread ? 'unread' : ''}">
      <div class="ni-icon ${n.iconClass}">${n.icon}</div>
      <div class="ni-body">
        <strong>${n.title}</strong>
        <p>${n.body}</p>
      </div>
      <span class="ni-time">${n.time}</span>
    </div>
  `).join('');
}

// ===== SEARCH + AI ASSISTANT (#8) =====
function initSearch() {
  const toggle = document.getElementById('searchToggle');
  const overlay = document.getElementById('searchOverlay');
  const close = document.getElementById('searchClose');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  const aiChat = document.getElementById('aiChat');
  const modeBtns = document.querySelectorAll('.mode-btn');
  const aiInput = document.getElementById('aiInput');
  const aiSend = document.getElementById('aiSend');

  toggle.addEventListener('click', () => {
    closeAllPanels();
    overlay.classList.add('open');
    setTimeout(() => input.focus(), 100);
  });

  close.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });

  // Mode toggle
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (btn.dataset.mode === 'ai') {
        results.classList.add('hidden');
        aiChat.classList.remove('hidden');
        input.placeholder = 'Ask the AI Assistant...';
      } else {
        results.classList.remove('hidden');
        aiChat.classList.add('hidden');
        input.placeholder = 'Search documents, tasks, or ask a question...';
      }
    });
  });

  // Search filtering
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    if (!q) {
      results.innerHTML = `
        <div class="search-category">
          <h4>Recent</h4>
          <div class="search-item"><span class="si-icon doc"></span>Articles of Organization — California LLC<span class="si-type">Document</span></div>
          <div class="search-item"><span class="si-icon task"></span>File Annual Report — Due Apr 15<span class="si-type">Task</span></div>
          <div class="search-item"><span class="si-icon help"></span>How to add a registered agent<span class="si-type">Help</span></div>
        </div>`;
      return;
    }
    const allItems = [
      { name: 'Articles of Organization — California LLC', type: 'Document', icon: 'doc' },
      { name: 'Operating Agreement — Hatfield Consulting', type: 'Document', icon: 'doc' },
      { name: 'EIN Confirmation Letter', type: 'Document', icon: 'doc' },
      { name: 'Statement of Information — Filed', type: 'Document', icon: 'doc' },
      { name: 'Contractor Agreement — J. Smith', type: 'Document', icon: 'doc' },
      { name: 'Meeting Minutes — Q1 2026', type: 'Document', icon: 'doc' },
      { name: 'File Annual Report — Due Apr 15', type: 'Task', icon: 'task' },
      { name: 'Pay Delaware Franchise Tax', type: 'Task', icon: 'task' },
      { name: 'Review contractor classification', type: 'Task', icon: 'task' },
      { name: 'How to add a registered agent', type: 'Help', icon: 'help' },
      { name: 'What is a Statement of Information?', type: 'Help', icon: 'help' },
      { name: 'Understanding franchise tax', type: 'Help', icon: 'help' },
      { name: 'How to file an annual report', type: 'Help', icon: 'help' },
      { name: 'Employee vs contractor classification', type: 'Help', icon: 'help' },
    ];
    const matches = allItems.filter(i => i.name.toLowerCase().includes(q));
    if (matches.length) {
      results.innerHTML = `<div class="search-category"><h4>Results</h4>${matches.map(m =>
        `<div class="search-item"><span class="si-icon ${m.icon}"></span>${m.name}<span class="si-type">${m.type}</span></div>`
      ).join('')}</div>`;
    } else {
      results.innerHTML = `<div class="search-category"><h4>No results</h4><p style="color:#9ca3af;font-size:0.85rem;">Try a different search or ask the AI Assistant.</p></div>`;
    }
  });

  // AI chat
  function sendAiMessage() {
    const text = aiInput.value.trim();
    if (!text) return;
    const messages = document.getElementById('aiMessages');

    // User message
    messages.innerHTML += `
      <div class="ai-msg user">
        <div class="ai-avatar">TH</div>
        <div class="ai-bubble">${escapeHtml(text)}</div>
      </div>`;

    aiInput.value = '';

    // Bot response (simulated)
    setTimeout(() => {
      const key = Object.keys(AI_RESPONSES).find(k => text.toLowerCase().includes(k));
      const response = AI_RESPONSES[key] || AI_RESPONSES['default'];
      messages.innerHTML += `
        <div class="ai-msg bot">
          <div class="ai-avatar">AI</div>
          <div class="ai-bubble">${formatMarkdown(response)}</div>
        </div>`;
      messages.scrollTop = messages.scrollHeight;
    }, 800);

    messages.scrollTop = messages.scrollHeight;
  }

  aiSend.addEventListener('click', sendAiMessage);
  aiInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendAiMessage();
  });
}

// ===== EXPERT PANEL =====
function initExpert() {
  const btn = document.getElementById('expertBtn');
  const panel = document.getElementById('expertPanel');
  const close = document.getElementById('expertClose');

  btn.addEventListener('click', () => {
    closeAllPanels();
    panel.classList.toggle('hidden');
  });
  close.addEventListener('click', () => panel.classList.add('hidden'));
}

// ===== POST-ACTION MODAL (#4) =====
function showPostAction() {
  document.getElementById('postActionModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('postActionModal').classList.add('hidden');
}

// ===== UTILITIES =====
function closeAllPanels() {
  document.getElementById('notifPanel').classList.remove('open');
  document.getElementById('searchOverlay').classList.remove('open');
  document.getElementById('expertPanel').classList.add('hidden');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

// Close panels on outside click
document.addEventListener('click', (e) => {
  const notifPanel = document.getElementById('notifPanel');
  const notifToggle = document.getElementById('notifToggle');
  const expertPanel = document.getElementById('expertPanel');
  const expertBtn = document.getElementById('expertBtn');

  if (notifPanel.classList.contains('open') &&
      !notifPanel.contains(e.target) &&
      !notifToggle.contains(e.target)) {
    notifPanel.classList.remove('open');
  }

  if (!expertPanel.classList.contains('hidden') &&
      !expertPanel.contains(e.target) &&
      !expertBtn.contains(e.target)) {
    expertPanel.classList.add('hidden');
  }
});

// Keyboard shortcut: Cmd+K for search
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    closeAllPanels();
    document.getElementById('searchOverlay').classList.add('open');
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
  }
  if (e.key === 'Escape') {
    closeAllPanels();
    closeModal();
  }
});
