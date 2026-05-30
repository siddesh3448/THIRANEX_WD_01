/**
 * TASK-3-TODO-APP - Central Application State and Interactions
 * Vanilla JavaScript (ES6+), Event Delegation, Accessible Dialog API, Dynamic Renderer
 */

// Central application state array
const todos = [];

// Current filter selected ('all' | 'active' | 'completed')
let currentFilter = 'all';

// Track task index/ID slated for potential deletion
let todoIdToDelete = null;

// Track task ID currently being edited inline
let todoIdInEditMode = null;

/* --- DOM Elements Selectors --- */
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const inputError = document.getElementById('input-error');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const headerDate = document.getElementById('header-date');
const srAnnouncements = document.getElementById('sr-announcements');

// Statistics output nodes
const statTotal = document.getElementById('stat-total');
const statActive = document.getElementById('stat-active');
const statCompleted = document.getElementById('stat-completed');

// Action filters tab list
const filterTabs = document.querySelectorAll('.filter-tab');

// Confirmation Modal components
const confirmModal = document.getElementById('confirm-modal');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const modalConfirmBtn = document.getElementById('modal-confirm-btn');

/* --- Page & State Initialization --- */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Load data from persistence
  loadTodos();

  // 2. Format and render header date/clock
  formatCurrentDate();
  setInterval(formatCurrentDate, 60000); // Keep timer updated minute by minute

  // 3. Register Global Event Listeners
  todoForm.addEventListener('submit', handleFormSubmit);
  todoList.addEventListener('click', handleListActions);
  todoList.addEventListener('submit', handleInlineFormSubmit);
  
  // Register inline filter tabs click handlers
  filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const selectedFilter = e.currentTarget.getAttribute('data-filter');
      applyFilter(selectedFilter);
    });
  });

  // Modal actions links
  modalCancelBtn.addEventListener('click', closeConfirmModal);
  modalConfirmBtn.addEventListener('click', handleConfirmDelete);
  
  // Close dialog safely if user clicks the modal backdrop manually
  confirmModal.addEventListener('click', (e) => {
    if (e.target === confirmModal) {
      closeConfirmModal();
    }
  });

  // Handle document Esc key inside editing modes if desired
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && todoIdInEditMode !== null) {
      todoIdInEditMode = null;
      renderTodos();
    }
  });
});

/* --- Core CRUD Operations --- */

/**
 * Creates and appends a new todo task securely to the state
 * @param {string} text - The input description of the task
 */
function addTodo(text) {
  const sanitizedText = text.trim();
  
  if (!sanitizedText) {
    showInputValidationError("Task content cannot be empty.");
    return false;
  }

  const newTodo = {
    id: Date.now(), // Generate unique safe timestamp
    text: sanitizedText,
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);
  saveTodos();
  updateStats();
  
  // If current filter is "completed", we shift automatically to "all" or "active" to show user their new task
  if (currentFilter === 'completed') {
    applyFilter('all');
  } else {
    renderTodos();
  }

  // Speak notification for accessibility
  announceForScreenReader(`Task "${sanitizedText}" successfully created.`);
  
  // Reset fields
  todoInput.value = '';
  clearInputValidationError();
  todoInput.focus();
  return true;
}

/**
 * Toggles the completed status of an existing task
 * @param {number} id - Target system index identifier
 */
function toggleTodo(id) {
  const targetTodo = todos.find(t => t.id === id);
  if (!targetTodo) return;

  targetTodo.completed = !targetTodo.completed;
  saveTodos();
  updateStats();
  renderTodos();

  const statusMsg = targetTodo.completed ? 'completed' : 'active';
  announceForScreenReader(`Task "${targetTodo.text}" marked as ${statusMsg}.`);
}

/**
 * Overwrites task textual label during active edit phases
 * @param {number} id - Target identifier
 * @param {string} newText - Checked revised text
 */
function editTodo(id, newText) {
  const sanitizedText = newText.trim();
  const targetTodo = todos.find(t => t.id === id);
  
  if (!targetTodo) return false;

  if (!sanitizedText) {
    announceForScreenReader("Update failed. Text cannot be empty.");
    return false;
  }

  const oldText = targetTodo.text;
  targetTodo.text = sanitizedText;
  
  saveTodos();
  todoIdInEditMode = null; // Exit inline editing state
  renderTodos();

  announceForScreenReader(`Task updated from "${oldText}" to "${sanitizedText}".`);
  return true;
}

/**
 * Triggers modal confirmation pop-up to delete safety checks
 * @param {number} id - Target identifier
 */
function initiateDeleteTodo(id) {
  const targetTodo = todos.find(t => t.id === id);
  if (!targetTodo) return;

  todoIdToDelete = id;
  
  // Dynamically configure accessible modal details
  const modalTextParagraph = document.getElementById('modal-desc');
  modalTextParagraph.textContent = `Are you sure you want to delete "${targetTodo.text}"? This action is permanent.`;
  
  // Open dialog safely via standard HTML5 engine
  confirmModal.showModal();
}

/**
 * Deletes the specified task from state on confirmation
 * @param {number} id - Target identifier
 */
function deleteTodo(id) {
  const findIndex = todos.findIndex(t => t.id === id);
  if (findIndex === -1) return;

  const deletedText = todos[findIndex].text;
  todos.splice(findIndex, 1);
  
  saveTodos();
  updateStats();
  renderTodos();
  
  announceForScreenReader(`Task "${deletedText}" permanently deleted.`);
}

/* --- Views Render Logic --- */

/**
 * Redraws todo tasks in the DOM dynamically based on filters
 */
function renderTodos() {
  todoList.innerHTML = '';
  
  // Filter todos array according to user query selection
  const filteredList = todos.filter(t => {
    if (currentFilter === 'active') return !t.completed;
    if (currentFilter === 'completed') return t.completed;
    return true; // 'all'
  });

  // Toggle Visibility of Empty State view
  if (filteredList.length === 0) {
    emptyState.style.display = 'flex';
    todoList.style.display = 'none';

    // Show appropriate helper message depending on the filter state
    const emptyTitle = emptyState.querySelector('h3');
    const emptyDesc = emptyState.querySelector('p');

    if (currentFilter === 'all') {
      emptyTitle.textContent = 'Your list is empty';
      emptyDesc.textContent = 'Create a new plan or task above to get started!';
    } else if (currentFilter === 'active') {
      emptyTitle.textContent = 'No active tasks';
      emptyDesc.textContent = 'All chores finished. Add more to-dos or celebrate!';
    } else if (currentFilter === 'completed') {
      emptyTitle.textContent = 'No completed tasks';
      emptyDesc.textContent = "Finish outstanding assignments to see results here.";
    }
  } else {
    emptyState.style.display = 'none';
    todoList.style.display = 'flex';

    // Stagger render lists elements through JavaScript Injection safely
    filteredList.forEach(todo => {
      const isEditingThisOne = todoIdInEditMode === todo.id;
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      li.setAttribute('id', `todo-item-${todo.id}`);

      // Human readable formatted time prefix
      const creationDate = new Date(todo.createdAt);
      const timeStr = creationDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + 
                    ` on ` + creationDate.toLocaleDateString([], { month: 'short', day: 'numeric' });

      if (isEditingThisOne) {
        // Inline Edit Mode View
        li.innerHTML = `
          <form class="edit-form-inline" data-id="${todo.id}" aria-label="Edit task inline">
            <input 
              type="text" 
              class="edit-input-inline" 
              value="${escapeHtml(todo.text)}" 
              maxlength="150" 
              required
              aria-label="Edit task description"
              id="inline-edit-input-${todo.id}"
            />
            <div class="todo-actions">
              <button type="submit" class="btn btn-save-inline" aria-label="Save changes to task">
                Save
              </button>
              <button type="button" class="btn btn-cancel-inline" data-action="cancel-edit" aria-label="Cancel editing">
                Cancel
              </button>
            </div>
          </form>
        `;
        
        // Auto-focus active input element
        setTimeout(() => {
          const inp = li.querySelector(`.edit-input-inline`);
          if (inp) {
            inp.focus();
            inp.select();
          }
        }, 30);

      } else {
        // Normal list viewing element
        li.innerHTML = `
          <div class="todo-item-info">
            <label class="checkbox-container">
              <input 
                type="checkbox" 
                ${todo.completed ? 'checked' : ''} 
                data-id="${todo.id}"
                data-action="toggle"
                aria-label="Mark task '${escapeHtml(todo.text)}' as ${todo.completed ? 'active' : 'completed'}"
              />
              <span class="checkmark"></span>
            </label>
            <div class="todo-details">
              <span class="todo-text">${escapeHtml(todo.text)}</span>
              <span class="todo-timestamp" aria-label="Created at ${timeStr}">
                Created ${timeStr}
              </span>
            </div>
          </div>
          <div class="todo-actions">
            <button 
              type="button" 
              class="btn btn-edit btn-icon-only" 
              data-id="${todo.id}"
              data-action="edit" 
              aria-label="Edit task: ${escapeHtml(todo.text)}"
            >
              ✏️
            </button>
            <button 
              type="button" 
              class="btn btn-delete btn-icon-only" 
              data-id="${todo.id}"
              data-action="delete" 
              aria-label="Delete task: ${escapeHtml(todo.text)}"
            >
              🗑️
            </button>
          </div>
        `;
      }

      todoList.appendChild(li);
    });
  }
}

/**
 * Filter changes state transitions
 * @param {string} filterName - New applied selector
 */
function applyFilter(filterName) {
  if (filterName !== 'all' && filterName !== 'active' && filterName !== 'completed') return;
  
  currentFilter = filterName;
  
  // Transition CSS tabs to matching active class
  filterTabs.forEach(tab => {
    const isCurrent = tab.getAttribute('data-filter') === filterName;
    tab.classList.toggle('active', isCurrent);
    tab.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
  });

  renderTodos();
  announceForScreenReader(`Filter changed to ${filterName} tasks.`);
}

/**
 * Calculates current counts and displays stats counters
 */
function updateStats() {
  const allCount = todos.length;
  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  statTotal.textContent = allCount;
  statActive.textContent = activeCount;
  statCompleted.textContent = completedCount;
}

/* --- Storage management --- */

/**
 * Serializes state elements safely with window.localStorage persistence
 */
function saveTodos() {
  try {
    const serializedData = JSON.stringify(todos);
    window.localStorage.setItem('TASK-3-TODO-APP-DATA', serializedData);
  } catch (err) {
    console.error("Local storage saving issues encountered: ", err);
  }
}

/**
 * Initiates the application with state retrieved from local storage, fallback gracefully
 */
function loadTodos() {
  try {
    const rawData = window.localStorage.getItem('TASK-3-TODO-APP-DATA');
    if (rawData) {
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed)) {
        // Safe arrays insertion into our constant variable reference
        todos.length = 0; // Empty
        parsed.forEach(item => {
          if (item && typeof item === 'object' && 'id' in item && 'text' in item) {
            todos.push({
              id: Number(item.id),
              text: String(item.text),
              completed: Boolean(item.completed),
              createdAt: String(item.createdAt || new Date().toISOString())
            });
          }
        });
      }
    }
  } catch (err) {
    console.error("Local storage load issues encountered - resetting safe defaults", err);
  }
  
  updateStats();
  renderTodos();
}

/* --- Event Routing Actions (Event Delegation) --- */

/**
 * Handle form creation events
 * @param {Event} e - Submit payload
 */
function handleFormSubmit(e) {
  e.preventDefault();
  const textValue = todoInput.value;
  
  // Inline validations and safeguards
  if (!textValue || !textValue.trim()) {
    showInputValidationError("Please enter a valid task description. Empty tasks are not permitted.");
    return;
  }

  // Clear standard inline highlights if valid
  clearInputValidationError();
  
  // Process State modification
  addTodo(textValue);
}

/**
 * Coordinates and routes list action signals elegantly (Using Event Delegation)
 * @param {Event} e - Event payload
 */
function handleListActions(e) {
  const target = e.target;
  
  // If user hits inline cancel
  if (target.getAttribute('data-action') === 'cancel-edit' || target.closest('[data-action="cancel-edit"]')) {
    todoIdInEditMode = null;
    renderTodos();
    return;
  }

  // Task actions router based on delegated dataset definitions
  const actionSource = target.closest('[data-action]');
  if (!actionSource) return;

  const action = actionSource.getAttribute('data-action');
  const todoId = Number(actionSource.getAttribute('data-id'));

  if (action === 'toggle') {
    toggleTodo(todoId);
  } else if (action === 'edit') {
    todoIdInEditMode = todoId;
    renderTodos();
  } else if (action === 'delete') {
    initiateDeleteTodo(todoId);
  }
}

/**
 * Handles inline form edit submit events using event delegation
 * @param {Event} e - Submit event payload
 */
function handleInlineFormSubmit(e) {
  e.preventDefault();
  const inlineForm = e.target.closest('.edit-form-inline');
  if (!inlineForm) return;

  const editId = Number(inlineForm.getAttribute('data-id'));
  const inputElement = inlineForm.querySelector('.edit-input-inline');
  if (inputElement) {
    editTodo(editId, inputElement.value);
  }
}

/* --- Helper and Accessibilities Announcements API --- */

/**
 * Forces Screen Reader utilities to announce dynamic status upgrades
 * @param {string} text - Message context
 */
function announceForScreenReader(text) {
  srAnnouncements.textContent = '';
  // Slight delay ensures the DOM status registers accurately
  setTimeout(() => {
    srAnnouncements.textContent = text;
  }, 50);
}

/**
 * Renders custom calendar timestamp in page header
 */
function formatCurrentDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date();
  headerDate.textContent = today.toLocaleDateString('en-US', options);
}

/**
 * Escapes raw strings securely to prevent XSS issues inside templates
 * @param {string} unsafe - Raw text content
 */
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Shows accessible form helpers error highlights
 * @param {string} message - Description details
 */
function showInputValidationError(message) {
  inputError.textContent = message;
  todoInput.classList.add('input-invalid');
  todoInput.setAttribute('aria-invalid', 'true');
}

/**
 * Reset form validates flags
 */
function clearInputValidationError() {
  inputError.textContent = '';
  todoInput.classList.remove('input-invalid');
  todoInput.setAttribute('aria-invalid', 'false');
}

/* --- Dialog Modal Deletion Confirm Action Hooks --- */
function closeConfirmModal() {
  confirmModal.close();
  
  // Return focus back to delete buttons for keyboard usability routing
  if (todoIdToDelete !== null) {
    const parentItem = document.getElementById(`todo-item-${todoIdToDelete}`);
    if (parentItem) {
      const delBtn = parentItem.querySelector('.btn-delete');
      if (delBtn) delBtn.focus();
    }
  }
  todoIdToDelete = null;
}

function handleConfirmDelete() {
  if (todoIdToDelete !== null) {
    deleteTodo(todoIdToDelete);
  }
  confirmModal.close();
  todoIdToDelete = null;
}
