document.addEventListener('DOMContentLoaded', (event) => {
    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {
        todo: [],
        inProgress: [],
        done: []
    };

    // Drag and Drop Functionality
    const columns = document.querySelectorAll('.column');

    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('dragenter', dragEnter);
        column.addEventListener('dragleave', dragLeave);
        column.addEventListener('drop', dragDrop);
    });

    let draggedTask = null;

    function dragStart() {
        draggedTask = this;
        setTimeout(() => {
            this.style.display = 'none';
        }, 0);
    }

    function dragEnd() {
        draggedTask.style.display = 'flex';
        draggedTask = null;
        saveTasks();
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        this.style.backgroundColor = '#f0f0f0';
    }

    function dragLeave() {
        this.style.backgroundColor = '#fff';
    }

    function dragDrop() {
        this.style.backgroundColor = '#fff';
        this.querySelector('.tasks').appendChild(draggedTask);
        saveTasks();
    }

    // Task Creation
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            const task = createTaskElement(taskText);
            document.getElementById('todo-tasks').appendChild(task);
            tasks.todo.push(taskText);
            saveTasks();
            newTaskInput.value = '';
        }
    });

    function createTaskElement(text) {
        const task = document.createElement('div');
        task.className = 'task';
        task.draggable = true;
        task.textContent = text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            task.remove();
            saveTasks();
        });

        task.appendChild(deleteButton);
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragend', dragEnd);

        return task;
    }

    // Load tasks into columns
    function loadTasks() {
        tasks.todo.forEach(taskText => {
            const task = createTaskElement(taskText);
            document.getElementById('todo-tasks').appendChild(task);
        });

        tasks.inProgress.forEach(taskText => {
            const task = createTaskElement(taskText);
            document.getElementById('in-progress-tasks').appendChild(task);
        });

        tasks.done.forEach(taskText => {
            const task = createTaskElement(taskText);
            document.getElementById('done-tasks').appendChild(task);
        });
    }

    // Save tasks to local storage
    function saveTasks() {
        const todoTasks = Array.from(document.getElementById('todo-tasks').children).map(task => task.textContent.replace('Delete', '').trim());
        const inProgressTasks = Array.from(document.getElementById('in-progress-tasks').children).map(task => task.textContent.replace('Delete', '').trim());
        const doneTasks = Array.from(document.getElementById('done-tasks').children).map(task => task.textContent.replace('Delete', '').trim());

        localStorage.setItem('tasks', JSON.stringify({
            todo: todoTasks,
            inProgress: inProgressTasks,
            done: doneTasks
        }));
    }

    loadTasks();

    

   

    

    // Library: Motivational Thoughts
    const thoughts = [
        "Believe you can and you're halfway there.",
        "The only limit is your imagination.",
        "Success is the sum of small efforts, repeated day in and day out."
    ];
    const thoughtElement = document.getElementById('thought');
    document.getElementById('new-thought').addEventListener('click', () => {
        const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
        thoughtElement.textContent = `"${randomThought}"`;
    });

    // Library: Notes
    const noteList = document.getElementById('note-list');
    document.getElementById('save-note').addEventListener('click', () => {
        const note = document.getElementById('note').value;
        if (note) {
            const li = document.createElement('li');
            li.textContent = note;
            noteList.appendChild(li);
            document.getElementById('note').value = '';
        }
    });
});
// library functionality
document.addEventListener("DOMContentLoaded", function () {
    const thoughts = [
        "The only limit is your imagination.",
        "Believe in yourself and you will be unstoppable.",
        "Success is the sum of small efforts, repeated daily.",
        "Dream big, work hard, stay focused, and surround yourself with good people.",
        "Difficulties in life are intended to make us better, not bitter.",
        "Every accomplishment starts with the decision to try.",
        "Your only limit is the amount of doubt you allow in your mind."
    ];

    const thoughtElement = document.getElementById("thought");
    const newThoughtButton = document.getElementById("new-thought");
    const noteInput = document.getElementById("note");
    const saveNoteButton = document.getElementById("save-note");
    const noteList = document.getElementById("note-list");

    // Load a random thought initially
    function showRandomThought() {
        const randomIndex = Math.floor(Math.random() * thoughts.length);
        thoughtElement.textContent = thoughts[randomIndex];
    }

    newThoughtButton.addEventListener("click", showRandomThought);

    // Load notes from local storage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        noteList.innerHTML = ""; // Clear existing notes
        notes.forEach(note => addNoteToList(note));
    }

    // Save note function
    function saveNote() {
        const noteText = noteInput.value.trim();
        if (noteText === "") return;

        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.push(noteText);
        localStorage.setItem("notes", JSON.stringify(notes));

        addNoteToList(noteText);
        noteInput.value = ""; // Clear input field
    }

    // Add note to list with delete functionality
    function addNoteToList(noteText) {
        const li = document.createElement("li");
        li.classList.add("note-box");
    
        // Create a span for note text
        const noteSpan = document.createElement("span");
        noteSpan.innerHTML = `<i class="fa-solid fa-sticky-note note-icon"></i> ${noteText}`;
        
        // Create a delete icon
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash", "delete-note");
        deleteIcon.onclick = function() { deleteNote(this, noteText); };
    
        // Append elements
        li.appendChild(noteSpan);
        li.appendChild(deleteIcon);
        noteList.appendChild(li);
    }
    

    // Delete note function
    function deleteNote(element, noteText) {
        let notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes = notes.filter(note => note !== noteText);
        localStorage.setItem("notes", JSON.stringify(notes));

        element.parentElement.remove(); // Remove from UI
    }

    // Event listeners
    saveNoteButton.addEventListener("click", saveNote);

    // Load initial data
    showRandomThought();
    loadNotes();
});

//dashboard functionality

const emojiOptions = ['😀','😂','😎','😊','😍','😡','🥳','🤯','💪','🎉','📚','💻','📝','📅','⏰','🎨','⚽','🏋️‍♂️','🚀','🎵','📖','📞','🏆','💼','🍎','☕','🌍','🎭','💡','🎤','🖥️','🛠️','🔬','🎮','🏡','🚌','🌞','🌜','🎓','💰','🍕','🚴','🏃','🛏️','🎸','🔑','🖊️','📷','🎥','💣','🛒','🚗'];
document.getElementById('emojiPicker').innerHTML = emojiOptions.map(e => `<span class='emoji' onclick='chooseEmoji(this)'>${e}</span>`).join('');
let selectedEmoji = '';

function showPopup() {
    document.getElementById("taskPopup").style.display = "block";
}
function hidePopup() {
    document.getElementById("taskPopup").style.display = "none";
}
function chooseEmoji(ele) {
    selectedEmoji = ele.innerText;
}
function storeTask() {
    let title = document.getElementById("taskTitle").value;
    let from = document.getElementById("taskFrom").value;
    let to = document.getElementById("taskTo").value;
    let period = document.getElementById("taskPeriod").value;
    let theme = document.getElementById("taskTheme").value;
    if (!title || !from || !to || !selectedEmoji) return alert("All fields are required!");
    let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    taskList.push({ title, from, to, period, theme, emoji: selectedEmoji, completed: false });
    localStorage.setItem("taskList", JSON.stringify(taskList));
    renderTasks();
    hidePopup();
}
function renderTasks() {
    let taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = "";
    let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    taskList.forEach((task, index) => {
        let taskElement = document.createElement("div");
        taskElement.className = `task ${task.completed ? 'completed' : ''}`;
        taskElement.style.background = task.theme;
        taskElement.setAttribute("draggable", true);
        taskElement.innerHTML = `<input type='checkbox' onchange='toggleComplete(${index})' ${task.completed ? 'checked' : ''}> ${task.emoji} ${task.title} (${task.from} - ${task.to} ${task.period}) <button onclick='removeTask(${index})'>❌</button>`;
        taskElement.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", index);
        });
        taskContainer.appendChild(taskElement);
    });
}
function toggleComplete(index) {
    let taskList = JSON.parse(localStorage.getItem("taskList"));
    taskList[index].completed = !taskList[index].completed;
    localStorage.setItem("taskList", JSON.stringify(taskList));
    renderTasks();
}
function removeTask(index) {
    let taskList = JSON.parse(localStorage.getItem("taskList"));
    taskList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    renderTasks();
}
renderTasks();

//tracker functionality
let sleepData = JSON.parse(localStorage.getItem('sleepData')) || [];
    let phoneUsageData = JSON.parse(localStorage.getItem('phoneUsageData')) || [];
    let moodData = JSON.parse(localStorage.getItem('moodData')) || [];

    const moodEmojis = {
      "Happy": "😊", "Sad": "😢", "Neutral": "😐", "Excited": "🤩",
      "Angry": "😡", "Tired": "😴", "Anxious": "😰", "Confused": "🤔"
    };

    let sleepChart, phoneUsageChart, moodChart;

    function addSleepHour() {
      const hour = parseFloat(prompt("Enter sleep hours:"));
      if (!isNaN(hour)) {
        const date = new Date().toLocaleDateString();
        sleepData.push({ date, hour });
        localStorage.setItem('sleepData', JSON.stringify(sleepData));
        updateSleepChart();
      }
    }

    function addPhoneUsageHour() {
      const hour = parseFloat(prompt("Enter phone usage hours:"));
      if (!isNaN(hour)) {
        const date = new Date().toLocaleDateString();
        phoneUsageData.push({ date, hour });
        localStorage.setItem('phoneUsageData', JSON.stringify(phoneUsageData));
        updatePhoneUsageChart();
      }
    }

    function openMoodPopup() {
      document.getElementById("overlay").style.display = "block";
      document.getElementById("moodPopup").style.display = "block";
    }

    function closeMoodPopup() {
      document.getElementById("overlay").style.display = "none";
      document.getElementById("moodPopup").style.display = "none";
    }

    function addMood() {
      const selectedMood = document.getElementById("moodSelect").value;
      if (selectedMood) {
        const date = new Date().toLocaleDateString();
        moodData.push({ date, mood: selectedMood });
        localStorage.setItem('moodData', JSON.stringify(moodData));
        closeMoodPopup();
        updateMoodChart();
      }
    }

    function updateSleepChart() {
      const ctx = document.getElementById('sleepChart').getContext('2d');
      if (sleepChart) sleepChart.destroy();
      sleepChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: sleepData.map(entry => entry.date),
          datasets: [{ label: 'Sleep Hours', data: sleepData.map(entry => entry.hour), borderColor: 'blue', fill: false }]
        },
        options: { scales: { y: { beginAtZero: true } } }
      });
    }

    function updatePhoneUsageChart() {
      const ctx = document.getElementById('phoneUsageChart').getContext('2d');
      if (phoneUsageChart) phoneUsageChart.destroy();
      phoneUsageChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: phoneUsageData.map(entry => entry.date),
          datasets: [{ label: 'Phone Usage Hours', data: phoneUsageData.map(entry => entry.hour), borderColor: 'red', fill: false }]
        },
        options: { scales: { y: { beginAtZero: true } } }
      });
    }

    function updateMoodChart() {
      const ctx = document.getElementById('moodChart').getContext('2d');
      const labels = moodData.map(entry => entry.date);
      const data = moodData.map(entry => Object.keys(moodEmojis).indexOf(entry.mood));
      const emojiLabels = Object.keys(moodEmojis);
      if (moodChart) moodChart.destroy();
      moodChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{ label: 'Mood', data, backgroundColor: 'purple' }]
        },
        options: {
          scales: {
            y: { ticks: { callback: value => emojiLabels[value] ? moodEmojis[emojiLabels[value]] + " " + emojiLabels[value] : "" } }
          }
        }
      });
    }

    window.onload = () => {
      updateSleepChart();
      updatePhoneUsageChart();
      updateMoodChart();
    };