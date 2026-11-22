/**
 * Portfolio App Logic
 * - Renders everything from config.js
 * - Blog & Activity management with localStorage
 * - Admin panel for easy editing
 * - Image upload (Base64) support
 */

(function () {
  'use strict';

  // ========== STATE ==========
  let config = window.PORTFOLIO_CONFIG || {};
  let isAdminOpen = false;
  let currentFilter = 'all';

  // Load overrides from localStorage (so user edits persist)
  function loadOverrides() {
    try {
      const saved = localStorage.getItem('masum_portfolio_overrides');
      if (saved) {
        const overrides = JSON.parse(saved);
        if (overrides.blogs) config.blogs = overrides.blogs;
        if (overrides.activities) config.activities = overrides.activities;
        if (overrides.personal) Object.assign(config.personal, overrides.personal);
      }
    } catch (e) {
      console.warn('Could not load overrides', e);
    }
  }

  function saveOverrides() {
    const data = {
      blogs: config.blogs,
      activities: config.activities,
      personal: {
        avatar: config.personal.avatar,
        aboutImage: config.personal.aboutImage
      }
    };
    localStorage.setItem('masum_portfolio_overrides', JSON.stringify(data));
  }

  // ========== RENDER HELPERS ==========
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  function renderHero() {
    const p = config.personal;
    const el = $('#hero-content');
    if (!el) return;

    el.innerHTML = `
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-mono tracking-wide mb-6">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        ${p.currentRole}
      </div>

      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
        ${p.fullName}
      </h1>

      <p class="text-xl sm:text-2xl text-slate-300 font-mono font-medium mb-5">
        ${p.title}
      </p>

      <p class="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
        ${p.tagline}
      </p>

      <div class="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
        <button onclick="openHireModal()" class="px-8 py-4 rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400 text-slate-900 font-extrabold text-base hover:shadow-xl hover:shadow-sky-400/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-3">
          <i class="fa-solid fa-briefcase"></i> Hire Me Now
        </button>
        <a href="#projects" class="px-8 py-4 rounded-xl glass-card text-white font-semibold hover:border-sky-400/50 transition-all flex items-center gap-2">
          View Projects <i class="fa-solid fa-arrow-right text-sky-400"></i>
        </a>
      </div>

      <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3">
        <a href="${p.linkedin}" target="_blank" rel="noopener" class="social-btn"><i class="fa-brands fa-linkedin text-sky-400"></i> LinkedIn</a>
        <a href="${p.github}" target="_blank" rel="noopener" class="social-btn"><i class="fa-brands fa-github"></i> GitHub</a>
        <a href="https://wa.me/${p.whatsapp}" target="_blank" rel="noopener" class="social-btn text-emerald-400"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
        <button onclick="copyToClipboard('${p.email}', 'Email copied!')" class="social-btn"><i class="fa-solid fa-envelope text-cyan-400"></i> Email</button>
      </div>
    `;

    // Portrait
    const portrait = $('#hero-portrait');
    if (portrait) {
      portrait.innerHTML = `
        <div class="relative group">
          <div class="absolute -inset-1.5 bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400 rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition duration-700"></div>
          <div class="relative w-72 sm:w-80 lg:w-96 rounded-2xl glass-panel p-5 border border-white/10 text-center space-y-4">
            <div class="relative w-full h-80 sm:h-96 mx-auto rounded-xl overflow-hidden border border-sky-400/20 bg-slate-900">
              <img src="${p.avatar}" alt="${p.fullName}" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" id="avatar-img">
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">${p.fullName}</h3>
              <p class="text-xs text-sky-400 font-mono mt-1">B.Sc. in CSE • Graduated August 2026</p>
            </div>
            <div class="pt-2 border-t border-slate-700/50 text-xs text-slate-400 space-y-2 text-left">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2"><i class="fa-solid fa-location-dot text-sky-400"></i> ${p.location}</span>
                <span class="text-emerald-400 font-semibold flex items-center gap-1"><i class="fa-solid fa-circle text-[8px]"></i> Available</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-2"><i class="fa-solid fa-building text-sky-400"></i> Nineteen Alpha</span>
                <span class="text-slate-300 font-mono">Software Implementor</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  function renderAbout() {
    const a = config.about;
    const p = config.personal;
    const el = $('#about-content');
    if (!el) return;

    el.innerHTML = `
      <div class="lg:col-span-5 order-2 lg:order-1">
        <div class="glass-card p-4 rounded-2xl relative overflow-hidden group border border-slate-700/50 hover:border-sky-400/40 transition-all">
          <div class="relative h-[420px] sm:h-[480px] w-full rounded-xl overflow-hidden">
            <img src="${p.aboutImage}" alt="${p.fullName}" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" id="about-img">
          </div>
          <div class="mt-4 p-2 text-center">
            <p class="text-xs font-mono text-sky-400">ERP Implementation & Systems Engineering</p>
            <p class="text-sm font-semibold text-white mt-0.5">Adamjee Cantonment College & UITS Alumni</p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-7 order-1 lg:order-2 space-y-6">
        <div>
          <h2 class="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase mb-2">Executive Summary</h2>
          <h3 class="text-3xl sm:text-4xl font-extrabold text-white">${a.heading}</h3>
        </div>
        ${a.paragraphs.map(para => `<p class="text-slate-300 text-base leading-relaxed">${para}</p>`).join('')}
        <div class="grid sm:grid-cols-3 gap-4 pt-4">
          ${a.stats.map(s => `
            <div class="glass-card p-4 rounded-xl text-center">
              <p class="text-2xl font-bold text-sky-400 font-mono">${s.value}</p>
              <p class="text-xs text-slate-400 mt-1">${s.label}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderExperience() {
    const el = $('#experience-list');
    if (!el) return;

    el.innerHTML = config.experience.map(exp => `
      <div class="relative group">
        <div class="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-sky-400 group-hover:bg-sky-400 transition-colors"></div>
        <div class="glass-card p-6 sm:p-8 rounded-2xl border border-slate-700/50">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div>
              <h4 class="text-xl font-bold text-white">${exp.role}</h4>
              <p class="text-sky-400 font-medium text-sm">${exp.company} • ${exp.location}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="px-3.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">${exp.period}</span>
              ${exp.current ? '<span class="px-3.5 py-1 rounded-full text-xs font-mono bg-sky-500/10 border border-sky-500/30 text-sky-400 font-semibold">Current</span>' : ''}
            </div>
          </div>
          <p class="text-slate-300 text-sm leading-relaxed mb-5">${exp.description}</p>
          <div class="grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
            ${exp.highlights.map(h => `
              <div class="flex items-start gap-2"><i class="fa-solid fa-circle-check text-emerald-400 mt-1 text-xs"></i> <span>${h}</span></div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderSkills() {
    const el = $('#skills-grid');
    if (!el) return;

    const colorMap = {
      accent: 'sky',
      blue: 'blue',
      emerald: 'emerald',
      cyan: 'cyan'
    };

    el.innerHTML = config.skills.map(skill => {
      const c = colorMap[skill.color] || 'sky';
      return `
        <div class="glass-card p-6 rounded-2xl">
          <div class="w-12 h-12 rounded-xl bg-${c}-500/10 border border-${c}-500/30 flex items-center justify-center text-${c}-400 text-xl mb-5">
            <i class="fa-solid ${skill.icon}"></i>
          </div>
          <h4 class="text-lg font-bold text-white mb-4">${skill.title}</h4>
          <div class="flex flex-wrap gap-2">
            ${skill.items.map(item => `
              <span class="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-200">${item}</span>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  function renderProjects() {
    const el = $('#projects-grid');
    if (!el) return;

    el.innerHTML = config.projects.map(proj => {
      const badgeColor = proj.badgeColor === 'emerald' ? 'emerald' : 'blue';
      return `
        <div class="project-card glass-card rounded-2xl overflow-hidden flex flex-col justify-between" data-category="${proj.category}">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 rounded-full text-xs font-mono bg-${badgeColor}-500/20 text-${badgeColor}-400 border border-${badgeColor}-500/40">${proj.badge}</span>
              <i class="fa-solid ${proj.icon} text-sky-400 text-xl"></i>
            </div>
            <h4 class="text-xl font-bold text-white mb-2">${proj.title}</h4>
            <p class="text-slate-400 text-sm mb-3 leading-relaxed">${proj.shortDesc}</p>
            ${proj.note ? `<p class="text-xs text-sky-400 font-mono mb-4">${proj.note}</p>` : ''}
          </div>
          <div class="p-6 pt-0">
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${proj.tech.map(t => `<span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">${t}</span>`).join('')}
            </div>
            <button onclick="openProjectModal('${proj.id}')" class="w-full py-2.5 rounded-xl border border-sky-400/40 text-sky-400 hover:bg-sky-400/10 font-medium text-sm transition-all flex items-center justify-center gap-2">
              Details <i class="fa-solid fa-up-right-from-square text-xs"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderEducation() {
    const el = $('#education-grid');
    if (!el) return;

    el.innerHTML = config.education.map(edu => {
      const accent = edu.accent === 'emerald' ? 'emerald' : edu.accent === 'blue' ? 'blue' : 'sky';
      return `
        <div class="glass-card p-6 rounded-2xl relative border-t-4 border-t-${accent}-400 flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono text-${accent}-400">${edu.year}</span>
            <h4 class="text-lg font-bold text-white mt-2">${edu.degree}</h4>
            <p class="text-slate-300 text-sm mt-1">${edu.institute}</p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between">
            <span class="text-xs ${edu.detail.includes('GPA') ? 'text-emerald-400 font-semibold' : 'text-slate-400'}">${edu.detail}</span>
            <i class="fa-solid ${edu.icon} text-${accent}-400"></i>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderBlogs() {
    const el = $('#blogs-grid');
    if (!el) return;

    if (!config.blogs || config.blogs.length === 0) {
      el.innerHTML = `<p class="text-slate-400 col-span-full text-center py-10">No blog posts yet. Use Admin panel to add one.</p>`;
      return;
    }

    el.innerHTML = config.blogs.map(blog => `
      <article class="glass-card rounded-2xl overflow-hidden flex flex-col hover:border-sky-400/30 transition-all">
        ${blog.image ? `
          <div class="h-48 overflow-hidden">
            <img src="${blog.image}" alt="${blog.title}" class="w-full h-full object-cover">
          </div>
        ` : `
          <div class="h-32 bg-gradient-to-br from-sky-500/10 to-emerald-500/10 flex items-center justify-center">
            <i class="fa-solid fa-pen-nib text-4xl text-sky-400/40"></i>
          </div>
        `}
        <div class="p-6 flex flex-col flex-1">
          <div class="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <i class="fa-regular fa-calendar"></i>
            <span>${formatDate(blog.date)}</span>
          </div>
          <h4 class="text-lg font-bold text-white mb-2 line-clamp-2">${blog.title}</h4>
          <p class="text-slate-400 text-sm mb-4 flex-1 line-clamp-3">${blog.excerpt}</p>
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${(blog.tags || []).map(t => `<span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-sky-300">${t}</span>`).join('')}
          </div>
          <button onclick="openBlogModal('${blog.id}')" class="text-sky-400 text-sm font-medium hover:underline flex items-center gap-1">
            Read more <i class="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </div>
      </article>
    `).join('');
  }

  function renderActivities() {
    const el = $('#activities-grid');
    if (!el) return;

    if (!config.activities || config.activities.length === 0) {
      el.innerHTML = `<p class="text-slate-400 col-span-full text-center py-10">No activities yet. Use Admin panel to add one.</p>`;
      return;
    }

    el.innerHTML = config.activities.map(act => `
      <div class="glass-card rounded-2xl overflow-hidden group">
        ${act.image ? `
          <div class="h-48 overflow-hidden">
            <img src="${act.image}" alt="${act.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
        ` : `
          <div class="h-36 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 flex items-center justify-center">
            <i class="fa-solid fa-trophy text-4xl text-emerald-400/40"></i>
          </div>
        `}
        <div class="p-5">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">${act.category || 'Activity'}</span>
            <span class="text-xs text-slate-500">${act.date}</span>
          </div>
          <h4 class="text-base font-bold text-white mb-2">${act.title}</h4>
          <p class="text-slate-400 text-sm leading-relaxed">${act.description}</p>
        </div>
      </div>
    `).join('');
  }

  function renderContact() {
    const p = config.personal;
    const el = $('#contact-channels');
    if (!el) return;

    el.innerHTML = `
      <a href="https://wa.me/${p.whatsapp}" target="_blank" rel="noopener" class="glass-card p-4 rounded-xl flex items-center justify-between hover:border-emerald-500/50 transition-all group">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-lg"><i class="fa-brands fa-whatsapp"></i></div>
          <div>
            <p class="text-xs text-slate-400">WhatsApp Direct</p>
            <p class="text-sm font-semibold text-white">${p.phone}</p>
          </div>
        </div>
        <i class="fa-solid fa-arrow-right text-slate-500 group-hover:text-emerald-400 transition-colors"></i>
      </a>

      <a href="${p.linkedin}" target="_blank" rel="noopener" class="glass-card p-4 rounded-xl flex items-center justify-between hover:border-sky-400/50 transition-all group">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 text-lg"><i class="fa-brands fa-linkedin-in"></i></div>
          <div>
            <p class="text-xs text-slate-400">LinkedIn Profile</p>
            <p class="text-sm font-semibold text-white">masum-rana-b96506203</p>
          </div>
        </div>
        <i class="fa-solid fa-arrow-right text-slate-500 group-hover:text-sky-400 transition-colors"></i>
      </a>

      <div onclick="copyToClipboard('${p.email}', 'Email copied!')" class="glass-card p-4 rounded-xl flex items-center justify-between cursor-pointer hover:border-sky-400/50 transition-all group">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 text-lg"><i class="fa-solid fa-envelope"></i></div>
          <div>
            <p class="text-xs text-slate-400">Email Address</p>
            <p class="text-sm font-semibold text-white">${p.email}</p>
          </div>
        </div>
        <i class="fa-regular fa-copy text-slate-500 group-hover:text-sky-400"></i>
      </div>

      <div class="glass-card p-4 rounded-xl flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-lg"><i class="fa-solid fa-location-dot"></i></div>
        <div>
          <p class="text-xs text-slate-400">Current Location</p>
          <p class="text-sm font-semibold text-white">${p.address}</p>
        </div>
      </div>
    `;
  }

  // ========== UTILS ==========
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  // ========== MODALS ==========
  window.openProjectModal = function (id) {
    const proj = config.projects.find(p => p.id === id);
    if (!proj) return;

    const modal = $('#project-modal');
    const body = $('#project-modal-body');
    body.innerHTML = `
      <h3 class="text-2xl font-bold text-white mb-2">${proj.title}</h3>
      <p class="text-xs font-mono text-sky-400 mb-4">${proj.tech.join(' • ')}</p>
      <div class="space-y-3 text-sm text-slate-300 leading-relaxed border-t border-slate-700 pt-4">
        ${proj.details.map(d => `<p>• ${d}</p>`).join('')}
      </div>
    `;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.openBlogModal = function (id) {
    const blog = config.blogs.find(b => b.id === id);
    if (!blog) return;

    const modal = $('#blog-modal');
    const body = $('#blog-modal-body');
    body.innerHTML = `
      <div class="text-xs text-slate-400 mb-2 flex items-center gap-2">
        <i class="fa-regular fa-calendar"></i> ${formatDate(blog.date)}
      </div>
      <h3 class="text-2xl font-bold text-white mb-4">${blog.title}</h3>
      ${blog.image ? `<img src="${blog.image}" class="w-full rounded-xl mb-5 max-h-64 object-cover" alt="">` : ''}
      <div class="prose prose-invert text-slate-300 text-sm leading-relaxed whitespace-pre-line">${blog.content}</div>
      <div class="flex flex-wrap gap-2 mt-6">
        ${(blog.tags || []).map(t => `<span class="text-xs px-3 py-1 rounded-full bg-slate-800 text-sky-300">${t}</span>`).join('')}
      </div>
    `;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  window.openHireModal = function () {
    $('#hire-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeHireModal = function () {
    $('#hire-modal').classList.add('hidden');
    document.body.style.overflow = '';
  };

  // ========== FILTER ==========
  window.filterProjects = function (category) {
    currentFilter = category;
    const cards = $$('.project-card');
    const buttons = $$('.filter-btn');

    buttons.forEach(btn => {
      btn.classList.remove('bg-sky-400', 'text-slate-900', 'font-bold');
      btn.classList.add('glass-card', 'text-slate-300');
    });

    // Highlight active
    buttons.forEach(btn => {
      if (btn.dataset.filter === category) {
        btn.classList.remove('glass-card', 'text-slate-300');
        btn.classList.add('bg-sky-400', 'text-slate-900', 'font-bold');
      }
    });

    cards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // ========== CLIPBOARD & TOAST ==========
  window.copyToClipboard = function (text, msg) {
    navigator.clipboard.writeText(text).then(() => showToast(msg))
      .catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(msg);
      });
  };

  function showToast(message) {
    const toast = $('#toast');
    $('#toast-message').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  window.handleFormSubmit = function (e) {
    e.preventDefault();
    showToast('Thank you! Message sent successfully.');
    e.target.reset();
  };

  // ========== ADMIN PANEL ==========
  window.toggleAdmin = function () {
    isAdminOpen = !isAdminOpen;
    const panel = $('#admin-panel');
    if (isAdminOpen) {
      panel.classList.remove('translate-x-full');
      renderAdminForms();
    } else {
      panel.classList.add('translate-x-full');
    }
  };

  function renderAdminForms() {
    // Blogs list
    const blogList = $('#admin-blog-list');
    blogList.innerHTML = config.blogs.map((b, i) => `
      <div class="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg mb-2">
        <span class="text-sm text-white truncate flex-1">${b.title}</span>
        <button onclick="deleteBlog(${i})" class="text-red-400 hover:text-red-300 ml-2"><i class="fa-solid fa-trash"></i></button>
      </div>
    `).join('') || '<p class="text-slate-500 text-sm">No blogs yet</p>';

    // Activities list
    const actList = $('#admin-activity-list');
    actList.innerHTML = config.activities.map((a, i) => `
      <div class="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg mb-2">
        <span class="text-sm text-white truncate flex-1">${a.title}</span>
        <button onclick="deleteActivity(${i})" class="text-red-400 hover:text-red-300 ml-2"><i class="fa-solid fa-trash"></i></button>
      </div>
    `).join('') || '<p class="text-slate-500 text-sm">No activities yet</p>';
  }

  window.addBlog = function () {
    const title = $('#admin-blog-title').value.trim();
    const excerpt = $('#admin-blog-excerpt').value.trim();
    const content = $('#admin-blog-content').value.trim();
    const tags = $('#admin-blog-tags').value.split(',').map(t => t.trim()).filter(Boolean);
    const date = $('#admin-blog-date').value || new Date().toISOString().slice(0, 10);
    const imageInput = $('#admin-blog-image');

    if (!title || !content) {
      showToast('Title and content are required');
      return;
    }

    const newBlog = {
      id: 'b' + Date.now(),
      title,
      excerpt: excerpt || content.slice(0, 120) + '...',
      content,
      date,
      tags,
      image: ''
    };

    if (imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        newBlog.image = e.target.result;
        config.blogs.unshift(newBlog);
        saveOverrides();
        renderBlogs();
        renderAdminForms();
        clearBlogForm();
        showToast('Blog post added!');
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      config.blogs.unshift(newBlog);
      saveOverrides();
      renderBlogs();
      renderAdminForms();
      clearBlogForm();
      showToast('Blog post added!');
    }
  };

  function clearBlogForm() {
    $('#admin-blog-title').value = '';
    $('#admin-blog-excerpt').value = '';
    $('#admin-blog-content').value = '';
    $('#admin-blog-tags').value = '';
    $('#admin-blog-date').value = '';
    $('#admin-blog-image').value = '';
  }

  window.deleteBlog = function (index) {
    if (confirm('Delete this blog post?')) {
      config.blogs.splice(index, 1);
      saveOverrides();
      renderBlogs();
      renderAdminForms();
      showToast('Blog deleted');
    }
  };

  window.addActivity = function () {
    const title = $('#admin-act-title').value.trim();
    const description = $('#admin-act-desc').value.trim();
    const category = $('#admin-act-category').value.trim() || 'Activity';
    const date = $('#admin-act-date').value || new Date().getFullYear().toString();
    const imageInput = $('#admin-act-image');

    if (!title || !description) {
      showToast('Title and description are required');
      return;
    }

    const newAct = {
      id: 'a' + Date.now(),
      title,
      description,
      category,
      date,
      image: ''
    };

    if (imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        newAct.image = e.target.result;
        config.activities.unshift(newAct);
        saveOverrides();
        renderActivities();
        renderAdminForms();
        clearActForm();
        showToast('Activity added!');
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      config.activities.unshift(newAct);
      saveOverrides();
      renderActivities();
      renderAdminForms();
      clearActForm();
      showToast('Activity added!');
    }
  };

  function clearActForm() {
    $('#admin-act-title').value = '';
    $('#admin-act-desc').value = '';
    $('#admin-act-category').value = '';
    $('#admin-act-date').value = '';
    $('#admin-act-image').value = '';
  }

  window.deleteActivity = function (index) {
    if (confirm('Delete this activity?')) {
      config.activities.splice(index, 1);
      saveOverrides();
      renderActivities();
      renderAdminForms();
      showToast('Activity deleted');
    }
  };

  // Change main photos from admin
  window.changeAvatar = function () {
    const input = $('#admin-avatar-input');
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        config.personal.avatar = e.target.result;
        saveOverrides();
        renderHero();
        showToast('Profile photo updated!');
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  window.changeAboutImage = function () {
    const input = $('#admin-about-input');
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        config.personal.aboutImage = e.target.result;
        saveOverrides();
        renderAbout();
        showToast('About photo updated!');
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  window.exportConfig = function () {
    const dataStr = JSON.stringify({ blogs: config.blogs, activities: config.activities }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported!');
  };

  window.resetToDefault = function () {
    if (confirm('Reset all blogs & activities to original? This cannot be undone.')) {
      localStorage.removeItem('masum_portfolio_overrides');
      location.reload();
    }
  };

  // ========== INIT ==========
  function init() {
    loadOverrides();
    renderHero();
    renderAbout();
    renderExperience();
    renderSkills();
    renderProjects();
    renderEducation();
    renderBlogs();
    renderActivities();
    renderContact();

    // Mobile menu
    const mobileBtn = $('#mobile-menu-btn');
    const mobileMenu = $('#mobile-menu');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    }
    $$('.mobile-link').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    // Close modals on outside click
    ['project-modal', 'blog-modal', 'hire-modal'].forEach(id => {
      const modal = document.getElementById(id);
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
          }
        });
      }
    });

    // Keyboard shortcut for admin: Ctrl + Shift + A
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        toggleAdmin();
      }
    });

    // Active nav on scroll
    const sections = $$('section[id]');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 120) {
          current = section.getAttribute('id');
        }
      });
      $$('.nav-link').forEach(link => {
        link.classList.remove('text-sky-400');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('text-sky-400');
        }
      });
    });
  }

  // Run when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
