'use strict';

/* ==========================================================================
   Constants & DOM references
   ========================================================================== */

const STORAGE_KEY = 'inkwell:notes';
const THEME_KEY = 'inkwell:theme';

const form = document.getElementById('note-form');
const titleInput = document.getElementById('note-title');
const contentInput = document.getElementById('note-content');
const titleError = document.getElementById('title-error');
const contentError = document.getElementById('content-error');
const submitBtn = document.getElementById('submit-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const composerHeading = document.getElementById('composer-heading');
const composerSub = document.getElementById('composer-mode-label');
const composerEyebrow = document.querySelector('.eyebrow');

const notesList = document.getElementById('notes-list');
const notesCount = document.getElementById('notes-count');
const searchInput = document.getElementById('note-search');
const emptyState = document.getElementById('empty-state');
const noResultsState = document.getElementById('no-results-state');
const formStatus = document.getElementById('form-status');
const cardTemplate = document.getElementById('note-card-template');

const themeToggle = document.getElementById('theme-toggle');
const themeToggleLabel = themeToggle.querySelector('.theme-toggle-label');

/* ==========================================================================
   State
   ========================================================================== */

let notes = [];
let editingId = null;
let openConfirmItem = null;

/* ==========================================================================
   Init
   ========================================================================== */

function initApp() {
  initTheme();
  notes = loadNotes();
  renderNotes();

  form.addEventListener('submit', handleSubmit);
  cancelEditBtn.addEventListener('click', cancelEdit);
  searchInput.addEventListener('input', () => renderNotes());
  themeToggle.addEventListener('click', toggleTheme);
  notesList.addEventListener('click', handleNotesListClick);
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleEscapeKey);

  titleInput.addEventListener('input', () => clearFieldError(titleInput, titleError));
  contentInput.addEventListener('input', () => clearFieldError(contentInput, contentError));
}

/* ==========================================================================
   Theme
   ========================================================================== */

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved ? saved === 'dark' : prefersDark;
  applyTheme(isDark);
}

function applyTheme(isDark) {
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggleLabel.textContent = isDark ? 'Light mode' : 'Dark mode';
}

function toggleTheme() {
  const isDark = document.documentElement.dataset.theme !== 'dark';
  applyTheme(isDark);
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

/* ==========================================================================
   Storage
   ========================================================================== */

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Could not read saved notes, starting fresh.', err);
    return [];
  }
}

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return true;
  } catch (err) {
    console.error('Could not save notes.', err);
    announce('Your note could not be saved — storage might be full.');
    return false;
  }
}

/* ==========================================================================
   Validation
   ========================================================================== */

function validateForm() {
  let valid = true;

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title) {
    showFieldError(titleInput, titleError, 'Give your note a title.');
    valid = false;
  } else {
    clearFieldError(titleInput, titleError);
  }

  if (!content) {
    showFieldError(contentInput, contentError, 'A note needs some content.');
    valid = false;
  } else {
    clearFieldError(contentInput, contentError);
  }

  return valid;
}

function showFieldError(input, errorEl, message) {
  input.setAttribute('aria-invalid', 'true');
  errorEl.textContent = message;
}

function clearFieldError(input, errorEl) {
  input.setAttribute('aria-invalid', 'false');
  errorEl.textContent = '';
}

/* ==========================================================================
   Create / Update
   ========================================================================== */

function handleSubmit(event) {
  event.preventDefault();

  if (!validateForm()) {
    announce('Fix the highlighted fields before saving.');
    return;
  }

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const now = new Date().toISOString();

  if (editingId) {
    const note = notes.find((n) => n.id === editingId);
    if (note) {
      note.title = title;
      note.content = content;
      note.updatedAt = now;
    }
    announce('Note updated.');
  } else {
    notes.unshift({
      id: generateId(),
      title,
      content,
      createdAt: now,
      updatedAt: now,
    });
    announce('Note saved.');
  }

  saveNotes();
  resetForm();
  renderNotes();
}

function generateId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `note-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/* ==========================================================================
   Edit mode
   ========================================================================== */

function startEdit(id) {
  const note = notes.find((n) => n.id === id);
  if (!note) return;

  editingId = id;
  titleInput.value = note.title;
  contentInput.value = note.content;
  clearFieldError(titleInput, titleError);
  clearFieldError(contentInput, contentError);

  composerEyebrow.textContent = 'Editing';
  composerHeading.textContent = 'Edit Note';
  composerSub.textContent = 'Update the note, then save your changes.';
  submitBtn.textContent = 'Update Note';
  cancelEditBtn.hidden = false;

  titleInput.focus();
  composerHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cancelEdit() {
  resetForm();
}

function resetForm() {
  editingId = null;
  form.reset();
  clearFieldError(titleInput, titleError);
  clearFieldError(contentInput, contentError);
  composerEyebrow.textContent = 'Compose';
  composerHeading.textContent = 'New Note';
  composerSub.textContent = 'Write something worth keeping.';
  submitBtn.textContent = 'Save Note';
  cancelEditBtn.hidden = true;
}

/* ==========================================================================
   Delete (inline accessible confirm)
   ========================================================================== */

function handleNotesListClick(event) {
  const item = event.target.closest('.note-item');
  if (!item) return;
  const id = item.dataset.id;

  if (event.target.closest('.edit-btn')) {
    startEdit(id);
  } else if (event.target.closest('.delete-btn')) {
    if (openConfirmItem && openConfirmItem !== item) {
      toggleDeleteConfirm(openConfirmItem, openConfirmItem.dataset.id, false);
    }
    toggleDeleteConfirm(item, id, true);
  } else if (event.target.closest('.confirm-yes')) {
    deleteNote(id);
  } else if (event.target.closest('.confirm-no')) {
    toggleDeleteConfirm(item, id, false);
  }
}

function handleOutsideClick(event) {
  if (!openConfirmItem) return;
  if (openConfirmItem.contains(event.target)) return;
  toggleDeleteConfirm(openConfirmItem, openConfirmItem.dataset.id, false);
}

function handleEscapeKey(event) {
  if (event.key === 'Escape' && openConfirmItem) {
    toggleDeleteConfirm(openConfirmItem, openConfirmItem.dataset.id, false);
  }
}

function toggleDeleteConfirm(item, id, show) {
  const view = item.querySelector('.note-view');
  const confirmPane = item.querySelector('.note-confirm');

  if (show) {
    const note = notes.find((n) => n.id === id);
    confirmPane.querySelector('.confirm-title').textContent = note ? note.title : 'this note';
    view.hidden = true;
    confirmPane.hidden = false;
    confirmPane.querySelector('.confirm-no').focus();
    openConfirmItem = item;
  } else {
    confirmPane.hidden = true;
    view.hidden = false;
    if (openConfirmItem === item) openConfirmItem = null;
    const deleteBtn = item.querySelector('.delete-btn');
    if (deleteBtn) deleteBtn.focus();
  }
}

function deleteNote(id) {
  const note = notes.find((n) => n.id === id);
  notes = notes.filter((n) => n.id !== id);
  saveNotes();
  if (editingId === id) resetForm();
  renderNotes();
  announce(note ? `"${note.title}" deleted.` : 'Note deleted.');
}

/* ==========================================================================
   Render
   ========================================================================== */

function getFilteredNotes() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return notes;
  return notes.filter(
    (n) => n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query)
  );
}

function renderNotes() {
  openConfirmItem = null;
  const filtered = getFilteredNotes();
  notesList.innerHTML = '';

  filtered.forEach((note) => {
    const card = buildNoteCard(note);
    notesList.appendChild(card);
  });

  notesCount.textContent = String(notes.length);

  const hasNotes = notes.length > 0;
  const hasResults = filtered.length > 0;
  emptyState.hidden = hasNotes;
  noResultsState.hidden = !hasNotes || hasResults;

  if (searchInput.value.trim()) {
    announce(`${filtered.length} note${filtered.length === 1 ? '' : 's'} found.`);
  }
}

function buildNoteCard(note) {
  const fragment = cardTemplate.content.cloneNode(true);
  const item = fragment.querySelector('.note-item');
  const card = fragment.querySelector('.note-card');

  item.dataset.id = note.id;
  card.classList.add('note-enter');

  fragment.querySelector('.note-title').textContent = note.title;
  fragment.querySelector('.note-content').textContent = note.content;
  fragment.querySelector('.note-timestamp').textContent = `Edited ${formatTimestamp(note.updatedAt)}`;

  return fragment;
}

function formatTimestamp(iso) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/* ==========================================================================
   Status announcements
   ========================================================================== */

function announce(message) {
  formStatus.textContent = message;
}

/* ==========================================================================
   Boot
   ========================================================================== */

document.addEventListener('DOMContentLoaded', initApp);