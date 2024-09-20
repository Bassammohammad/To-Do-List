const tasks = JSON.parse(localStorage.getItem("tasks")) || {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
}

/**
 * Head Section
 */

let currentDay = "Monday"

document.querySelector(".menu-btn").addEventListener("click", function () {
  const hiddenElement = document.querySelector(".hidden-days-of-list")
  if (
    hiddenElement.style.display === "none" ||
    hiddenElement.style.display === ""
  ) {
    hiddenElement.style.display = "block"
  } else {
    hiddenElement.style.display = "none"
  }
})

document.querySelectorAll(".days-of-the-week").forEach((button) => {
  button.addEventListener("click", function () {
    currentDay = this.textContent
    displayTasks()
  })
})

document.querySelector(".submit-input").addEventListener("click", function (e) {
  e.preventDefault()
  const taskInput = document.querySelector(".task-input")
  const timeInput = document.querySelector(".time-input")

  if (!taskInput.value.trim() || !timeInput.value.trim()) {
    alert("Please fill out both the task and time fields.")
  } else {
    tasks[currentDay].push({
      taskName: taskInput.value,
      time: timeInput.value,
      completed: false,
      createdAt: Date.now(),
    })
    taskInput.value = ""
    timeInput.value = ""
    displayTasks()
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
})

document.querySelector(".delete-input").addEventListener("click", function () {
  if (tasks[currentDay].length > 0) {
    tasks[currentDay].pop()
    localStorage.setItem("tasks", JSON.stringify(tasks))
    displayTasks()
  } else {
    alert("there is no item to delete")
  }
})

function displayTasks() {
  const taskList = document.querySelector(".taskList")
  taskList.innerHTML = ""
  tasks[currentDay].forEach((task, index) => {
    const li = document.createElement("li")
    li.classList.add("li-task-list")
    li.textContent = `${task.taskName} - ${task.time}`
    taskList.appendChild(li)

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.classList.add("task-checkbox")
    checkbox.checked = task.completed || false

    if (checkbox.checked) {
      li.style.textDecoration = "line-through"
    } else {
      li.style.textDecoration = "none"
    }
    li.appendChild(checkbox)

    checkbox.addEventListener("click", function () {
      tasks[currentDay][index].completed = this.checked
      localStorage.setItem("tasks", JSON.stringify(tasks))

      if (task.completed) {
        li.style.textDecoration = "line-through"
      } else {
        li.style.textDecoration = "none"
      }
    })
  })
}

document.addEventListener("DOMContentLoaded", displayTasks)
