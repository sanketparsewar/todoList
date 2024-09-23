const addTask = document.getElementById("add-task");
const addBtn = document.getElementById("add-btn");
const taskList = document.querySelector("#task-list");
const message = document.getElementById("message");
// const deleteBtn = document.getElementById("delete-btn");
const taskItem = document.getElementsByClassName("task-item");
const clearAll = document.getElementById("clear-all");
const save = document.getElementById("save");

let taskArray = [];
taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];
display();

addBtn.addEventListener("click", function () {
  let val = addTask.value;
  if (val.trim() != "") {
    taskArray.push({ task: val, completed: false });
    console.log(taskArray);
    display();

    message.innerText = "Todo item Created Succesfully!";
    setTimeout(function () {
      message.innerHTML = "";
    }, 3000);

    addTask.value = "";
  } else {
    alert("Enter valid task");
  }
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
});

function display() {
  let text = "";
  for (let i = 0; i < taskArray.length; i++) {
    text += `<li class='task-item'>
      <buttton id="edit-btn" onclick='editItem(${i})'>🖊</buttton>
        <p id="task-${i}" onclick='completed(${i})' style="cursor:pointer; text-decoration: ${
      taskArray[i].completed ? "line-through" : "none"
    }">${taskArray[i].task}</p>
        <buttton id="delete-btn" onclick='deleteItem(${i})' style="font-size:30px"><i class="fa fa-trash-o"></i></buttton></li>`;
  }
  taskList.innerHTML = text;
}

clearAll.addEventListener("click", function () {
  if (taskArray != 0) {
    console.log("clear");
    taskArray = [];
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
    message.innerText = "All items deleted Succesfully!";
    setTimeout(function () {
      message.innerHTML = "";
    }, 3000);
    display();
  }
});

function editItem(i) {
//   console.log(i, "top");
  let data = taskArray[i].task;
  save.style.visibility = "visible";
  addBtn.style.visibility = "hidden";
  clearAll.style.visibility = "hidden";
  addTask.value = data;
  save.onclick = function () {
    if(addTask.value.trim()!=''){
    taskArray[i].task = addTask.value;

    localStorage.setItem("taskArray", JSON.stringify(taskArray));
    addTask.value = "";
    display();

    save.style.visibility = "hidden";
    addBtn.style.visibility = "visible";
    clearAll.style.visibility = "visible";

    message.innerText = "Task updated successfully!";
    setTimeout(function () {
      message.innerHTML = "";
    }, 3000);}
    else{
        alert("Enter valid data")
    }
  };
  
}

// function finalEdit(i) {
//   let data = addTask.value;

// }

function completed(i) {
  taskArray[i].completed = !taskArray[i].completed;
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
  display();
}

function deleteItem(i) {
  taskArray.splice(i, 1);
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
  display();
  console.log(taskArray);
}
