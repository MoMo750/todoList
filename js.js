const tasks_list = document.getElementById("tasks_list");
const tasks_filter = document.getElementById("tasks_filter");
const task_list_btn = document.getElementById("task_list_btn");
const clear_list_btn = document.getElementById("clear_list_btn");
const todoTasks = document.querySelector(".todoTasks");
const popUp_Delete = document.querySelector(".popUp_Delete");
const delete_task_popup = document.querySelector(".delete_task_popup");
const cansle_task_popup = document.querySelector(".cansle_task_popup");
const tasks_count = document.querySelector(".tasks_count span");
const tasks_total = document.querySelector(".tasks_total span");

console.log(tasks_total);



let arrayTask = [];

if (localStorage.getItem("tasks")) {
    arrayTask = JSON.parse(localStorage.getItem("tasks"));
}

// console.log(arrayTask);
getDataFromLocalStorage();

task_list_btn.addEventListener("click", function(e){
    e.preventDefault();
    if(tasks_list.value.trim() === ""){
            alert("enter your task")
    }else{
        addTaskToArray(tasks_list.value);
        tasks_list.value = "";
        tasks_list.focus();
    }
})

function addTasks(arrayTask){
    todoTasks.innerHTML = "";
    tasks_count.innerHTML = parseInt(tasks_count.innerHTML) + 1;
    // tasks_total.innerHTML = parseInt(tasks_total.innerHTML) + 1;

    arrayTask.forEach((task) =>{
            let tasks = document.createElement("ul");
            tasks.className = "tasks";
            tasks.setAttribute("data-id", task.id);
            
            let li = document.createElement("li");
            li.setAttribute("class", "tittleTasks");
            li.innerHTML = task.tittle;

            let buttonsIi = document.createElement("li");
            buttonsIi.setAttribute("class", "buttons");
            
            let btn_finished = document.createElement("span");
            btn_finished.setAttribute("class", "btn_finished");
            // btn_finished.setAttribute("type", "submit");
            btn_finished.innerHTML = ("finish");

            let btn_del = document.createElement("span");
            btn_del.setAttribute("class", "btn_del");
            // btn_del.setAttribute("type", "submit");
            btn_del.innerHTML = ("deleate");
    
            tasks.appendChild(li);
            tasks.appendChild(buttonsIi);
            buttonsIi.appendChild(btn_finished);
            buttonsIi.appendChild(btn_del);
            todoTasks.appendChild(tasks);
            tasks_list.value = "";
        }
)};

function addTaskToArray(taskText){
    const task = {
        id: Date.now(),
        tittle:taskText,
        completed: false,
}

    arrayTask.push(task);
    addTasks(arrayTask);
    addDataToLocalStorageFrom(arrayTask);
}

function addDataToLocalStorageFrom(arrayTask) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayTask));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
      let tasks = JSON.parse(data);
      addTasks(tasks);
    }
}

// let btn_del = document.querySelector(".btn_del");
let getfinishedBtn = localStorage.getItem("finished");
console.log("kkkkkkkk");
    if(getfinishedBtn && getfinishedBtn === "notfinish"){
        // console.log("e.target");
    }


todoTasks.addEventListener("click", function(e){
    // e.preventDefault;
    if(e.target.classList.contains("btn_del")){
        popUp_Delete.style.opacity = '1';
        delete_task_popup.addEventListener("click", function(){
            popUp_Delete.style.opacity = '0';
            e.target.parentElement.parentElement.remove();
            // tasks_count.innerHTML = parseInt(tasks_count.innerHTML) - 1;
            
            deleteTask(e.target.parentElement.parentElement.getAttribute("data-id"));      
        })
    }

    
    if(e.target.classList.contains("btn_finished")){
        
            e.target.parentElement.classList.toggle("finish");
        if(e.target.parentElement.classList.contains("finish")){
            e.target.innerHTML = "not finish";
            e.target.classList.add("finish");
            e.target.parentElement.previousElementSibling.classList.add("liFinished");
            localStorage.setItem("finished", "notfinish");
            // finshedTask(e.target.parentElement.parentElement.getAttribute("data-id")); 
        }else{
            e.target.innerHTML = "finished";
            e.target.classList.remove("finish");
            e.target.parentElement.previousElementSibling.classList.remove("liFinished");
            localStorage.setItem("finished", "finish");
        } 
        // addDataToLocalStorageFrom(arrayTask);
        finshedTask(e.target.parentElement.parentElement.getAttribute("data-id")); 
    }

});


function deleteTask(taskeId){
    tasks_count.innerHTML = parseInt(tasks_count.innerHTML) - 1;

    arrayTask = arrayTask.filter((task) => task.id != taskeId);
    addDataToLocalStorageFrom(arrayTask);
}
function finshedTask(taskeId){
    for(let i = 0; i < arrayTask.length; i ++){
        if(arrayTask[i].id == taskeId){
            arrayTask[i].completed == false ? (arrayTask[i].completed = true) : (arrayTask[i].completed == false);
        }
    }
    addDataToLocalStorageFrom(arrayTask);
}

cansle_task_popup.addEventListener("click", function(){
    popUp_Delete.style.opacity = '0';
})

clear_list_btn.addEventListener("click", function(){
    // popUp_Delete.style.opacity = '1';
    // document.querySelector(".popUp_Delete p").innerHTML = "are you sure to clear task";
    todoTasks.innerHTML = '';
    tasks_count.innerHTML = "0";
    window.localStorage.removeItem("tasks");
});

// filter input

tasks_filter.addEventListener("input", filterList);

function filterList(){
    const tasks_filter = document.getElementById("tasks_filter");
    const filter = tasks_filter.value.toLowerCase();
    const listItem = document.querySelectorAll(".tasks");

    listItem.forEach((item) =>{
        let text = item.textContent;
        if(text.toLowerCase().includes(filter.toLowerCase())){
            item.style.display = "";
        }else{
            item.style.display = "none";
        }
    })
}


// tasks_total.innerHTML = localStorage.tasks;