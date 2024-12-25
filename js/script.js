/* Content : 
1. Setting Variables .
2. Creating Empty Array .
3. Checking Local Store 
4. Getting Data From Local Storge 
3.
*/

// 1. Setting Variables
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");
// 2. Empty Array To Store The Task
let arrayOfTasks = [];
// 3. Check If There are Tasks in Local Storge ?
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// 4. Trigger Get Data From Local Storage Function
getDataFromLocalStorage();
// 5. Adding  The Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Free The Input Field
  }
};
// 6. Clicking on Task Element
taskDiv.addEventListener("click", (e) => {
  // A- Delete Button Action
  if (e.target.classList.contains("del")) {
    // (1) Remove Task From Local Storge
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

/*// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});*/

// Functions
// A- Getting Data From Local Storge
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
  // B- Add Element into The Page
}
function addElementsToPageFrom(arrayOfTasks) {
  // (1) Free The Task Div
  taskDiv.innerHTML = "";
  // (2) Looping On Array Of Tasks To :
  arrayOfTasks.forEach((task) => {
    //(A) Creating The Main Div
    let div = document.createElement("div");
    div.className = "task";
    //(B) Checking if The Task is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    //(C) Creating Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    //(D) Append Button To The Main Dic
    div.appendChild(span);
    // (E) Adding Main Task Div into Task Container
    taskDiv.appendChild(div);
  });
}
// C- Adding Task To The Array of Taks
function addTaskToArray(taskText) {
  // (1) Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // (2) Push Task To Array of Tasks
  arrayOfTasks.push(task);
  console.log(arrayOfTasks);
  // (3) Add Task To Page
  addElementsToPageFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks);
}
// D- Adding Data To Local Storage
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
// E- Deleting Task
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

// F- ToggleStatusTask
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks.completed = false);
    }
  }
}
