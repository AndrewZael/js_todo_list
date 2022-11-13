const totalTask = document.getElementById('total-task');
const okTask = document.getElementById('ok-task');
const textTask = document.getElementById('text-task');
const addTask = document.getElementById('add-task');
const contentTasks = document.getElementById('tasks');
const arrTasks = [];


// Pinta en pantalla la lista
function printHtmlList(){
    let html = '';
    contentTasks.innerHTML = '';
    for (const item of arrTasks) {
        html += getTemplateTask(item.id, item.task, item.done);
    }
    contentTasks.innerHTML = html;
}

// Muestra en pantalla el total de tareas (Realizadas y total tareas)
function total(){
    totalTask.innerHTML = arrTasks.length;
    okTask.innerHTML = arrTasks.filter(item => item.done === true).length;
    console.log(arrTasks);
}

// Escucha el evento click del botón agregar 
addTask.addEventListener('click', function(){
    textTask.value != '' ? saveTask() : alert('Debe completar el campo tarea');
});

// guarda tarea en arrTasks, muestra tarea en el HTML y limpia el input textTask
function saveTask(){
    let id = Date.now();
    let task = textTask.value;
    arrTasks.push({id, task, done: false});
    printHtmlList();
    textTask.value = '';
    total();
}

// Elimina una tarea
function deleteTask(id, task){
    if(confirm(`¿Seguro que desea eliminar la tarea ${task}?`)){
        const i = arrTasks.findIndex(item => item.id === id);
        arrTasks.splice(i, 1);
        printHtmlList();
        total();
    }
}

// Cambia el la key done de una tarea entre true y false
function taskDone(id, task){
    const checked = document.getElementById(`task-${id}`);
    const i = arrTasks.findIndex(item => item.id === id);
    if(checked.checked) {
        arrTasks[i].done = true;
    }else{
        arrTasks[i].done = false;
    }
    setTimeout(() => {
        printHtmlList();   
    },100);
    total();
}

// Retorna un template tarea
function getTemplateTask(id, task, done){
    return `<li id="content-${id}" class="row mx-0 align-items-center rounded mb-1 py-2 border">
    <span class="col">${id}</span>
    <span class="col">${task}</span>
    <div class="col">
        <div class="form-check">
            <input onchange="taskDone(${id}, '${task}')" class="form-check-input" type="checkbox" value="" id="task-${id}" ${done && 'checked'}>
            <label class="form-check-label" for="task-${id}">Completada</label>
          </div>
    </div>
    <span class="col">
        <button onclick="deleteTask(${id}, '${task}')" class="btn btn-outline-danger border-0">
            <i class="fa-solid fa-trash-can"></i>
        </button>
    </span>
</li>`;
}