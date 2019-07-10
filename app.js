const form = document.querySelector('form#task-form');
const inputField = document.querySelector('#task');
const ul = document.querySelector('ul.collection');
const clearBtn = document.querySelector('#clear-btn');
const filter = document.querySelector('#filter');

//Load All Events
loadAllEvents();

//All Event
function loadAllEvents(){
    //DOM content loaded
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add Task
    form.addEventListener('submit',addEvent);
    //Remove Task
    ul.addEventListener('click',removeTask);
    //Remove All Tasks
    clearBtn.addEventListener('click',removeAllTasks);
    //Filter Tasks
    filter.addEventListener('keyup',filterTask);
}

//Get Tasks
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');
        //Add class name to li element
        li.className = 'collection-item';
        //Add text node to li element
        li.appendChild(document.createTextNode(task));
        //Create a element
        const a = document.createElement('a');
        //Add class name to a element
        a.className = 'delete-item secondary-content';
        //Add attribute to a element
        a.setAttribute('href','#');
        //Add innerHTML to a element
        a.innerHTML = '<i class="material-icons">clear</i>';
        //Add a element to li element
        li.appendChild(a);
        //Add li element to ul element
        ul.appendChild(li);
    });
}

//Add Event
function addEvent(e){
    if(inputField.value === ''){
        alert('Please insert new task.');
    }else{
        //create li element 
        const li = document.createElement('li');
        //Add class name to li element
        li.className = 'collection-item';
        //Add text node to li element
        li.appendChild(document.createTextNode(inputField.value));
        //create a element 
        const a = document.createElement('a');
        //Add class name to a element
        a.className = 'delete-item secondary-content';
        //Add attribute to a element
        a.setAttribute('href','#');
        //Add innerHtml to a element
        a.innerHTML = '<i class="material-icons">clear</i>';
        //Add a to li element
        li.appendChild(a);
        //Add li to ul element
        ul.appendChild(li);
        //Store task to lacal storate
        storeTaskToLocalStorage(inputField.value);
        //clear input field
        inputField.value = '';
    }
    e.preventDefault();
}

//Store task to local storage
function storeTaskToLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure delete to this Item?')){
            e.target.parentElement.parentElement.remove();
            //Remove task from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove task from local storage
function removeTaskFromLocalStorage(item){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(item.firstChild.textContent === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove All Tasks
function removeAllTasks(){
    //ul.innerHTML = '';
    //faster
    if(confirm('Are you sure you want to delete all tasks?')){
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    }
    //Remove All Tasks From Local Storge
    removeAllTasksFromLocalStorage();
}

function removeAllTasksFromLocalStorage(){
    localStorage.clear();
}

//Filter Task
function filterTask(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent.toLowerCase();
        if(item.indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}