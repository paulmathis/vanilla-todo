// jQuery like shorthand function
function $(query) {
  const result = document.querySelectorAll(query);
  if (result.length === 1) return result[0];
  return result;
}

// Event listener triggers function on enter in todo input field
$('#todo-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addTodo(e.target.value);
    e.target.value = '';
  }
});

// Add todo-item to todos ul
function addTodo(value) {
  // Todo item inner html template
  const todoItem = `
  <div>
  <span class="icon">
    <i class="fa fa-circle-o complete-btn"></i>
  </span>
  <span class="todo-text">${value}</span>
  </div>
  <span class="icon">
    <i class="fa fa-trash-o remove-todo"></i>
  </span>`;

  // Create list item and add classes and inner html
  const todo = document.createElement('li');
  todo.classList = 'todo-item';
  todo.innerHTML = todoItem;

  setupListener(todo);

  // Append todo to todos list
  $('#todos').appendChild(todo);
}

// Create event listener for todo item and handle logic
function setupListener(todo) {
  todo.addEventListener('click', e => {
    const classes = e.target.classList;

    // Toggle check mark and text strike-through
    if (classes.contains('complete-btn')) {
      todo.classList.toggle('completed');
      e.target.classList.toggle('fa-circle-o');
      e.target.classList.toggle('fa-check-circle-o');
    }

    // Remove todo item
    if (classes.contains('remove-todo')) {
      todo.remove();
    }
  });
}

// Logic to show each view
$('.views').addEventListener('click', e => {
  // Highlight the selected view button
  $('.views button').forEach(view => {
    view.classList.remove('selected');
  });
  e.target.classList.add('selected');

  $('.todo-item').forEach(todo => {
    // Show all todos
    if (e.target.id === 'all') {
      todo.classList.remove('is-hidden');
    }
    // Show only completed todos
    if (e.target.id === 'complete') {
      todo.classList.add('is-hidden');
      if (todo.classList.contains('completed')) {
        todo.classList.remove('is-hidden');
      }
    }
    // Show only incomplete todos
    if (e.target.id === 'incomplete') {
      todo.classList.remove('is-hidden');
      if (todo.classList.contains('completed')) {
        todo.classList.add('is-hidden');
      }
    }
  });
});

// Add listeners to sample todos
$('.todo-item').forEach(todo => {
  setupListener(todo);
});
