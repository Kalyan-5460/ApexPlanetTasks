document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.querySelector('.task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.querySelector('.task-list');
  const progressBar = document.querySelector('.progress');
  const progressNumbers = document.getElementById('numbers');

  const updateProgress = () => {
    const total = taskList.children.length;
    const completed = taskList.querySelectorAll('.checkbox:checked').length;

    progressBar.style.width = total ? `${(completed / total) * 100}%` : '0%';
    progressNumbers.textContent = `${completed}/${total}`;

    if (total > 0 && completed === total) {
      confetti();
    }
  };

  const saveTasks = () => {
    const tasks = Array.from(taskList.children).map(li => ({
      text: li.querySelector('span').textContent,
      completed: li.querySelector('.checkbox').checked,
    }));
    localStorage.setItem('soloTasks', JSON.stringify(tasks));
  };

  const loadTasks = () => {
    const saved = JSON.parse(localStorage.getItem('soloTasks')) || [];
    saved.forEach(task => addTask(task.text, task.completed, false));
  };

  const addTask = (text, completed = false, triggerConfetti = true) => {
    const taskText = text || taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
      <span>${taskText}</span>
      <div class="task-buttons">
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    const checkbox = li.querySelector('.checkbox');
    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    if (completed) {
      li.classList.add('completed');
      editBtn.disabled = true;
      editBtn.style.opacity = '0.5';
    }

    checkbox.addEventListener('change', () => {
      const isChecked = checkbox.checked;
      li.classList.toggle('completed', isChecked);
      editBtn.disabled = isChecked;
      updateProgress();
      saveTasks();
    });

    editBtn.addEventListener('click', () => {
      if (!checkbox.checked) {
        taskInput.value = li.querySelector('span').textContent;
        li.remove();
        updateProgress();
        saveTasks();
      }
    });

    deleteBtn.addEventListener('click', () => {
      li.remove();
      updateProgress();
      saveTasks();
    });

    taskList.appendChild(li);
    taskInput.value = '';
    updateProgress(triggerConfetti);
    saveTasks();
  };

  addTaskBtn.addEventListener('click', e => {
    e.preventDefault();
    addTask();
  });

  taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  });

  loadTasks();
  updateProgress();
});
