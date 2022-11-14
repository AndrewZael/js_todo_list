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
    textTask.value = '';
    printHtmlList();
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
    checked.checked ? arrTasks[i].done = true : arrTasks[i].done = false; 
    setTimeout(() => {
        printHtmlList();   
    },100);
    total();
}

// Retorna un template tarea
function getTemplateTask(id, task, done){
    return `<li id="content-${id}" class="row mx-0 align-items-center rounded mb-1 py-3 py-sm-2 border">
    <div class="col-6 col-sm-3 mb-3 mb-sm-0">
        <small class="d-block d-sm-none fw-bold mb-1">ID</small>
        <span>${id}</span>
    </div>
    <div class="col-6 col-sm-3 mb-3 mb-sm-0">
        <small class="d-block d-sm-none fw-bold mb-1">Tarea</small>
        <span class="col">${task}</span>
    </div>

    <div class="col-6 col-sm-3 mb-3 mb-sm-0">
        <small class="d-block d-sm-none fw-bold mb-1">¿Tarea realizada?</small>
        <div class="form-check">
            <input onchange="taskDone(${id}, '${task}')" class="form-check-input" type="checkbox" value="" id="task-${id}" ${done && 'checked'}>
            <label class="form-check-label" for="task-${id}">Completada</label>
          </div>
    </div>

    <div class="col-6 col-sm-3">
        <span class="col">
            <button onclick="deleteTask(${id}, '${task}')" class="btn btn-outline-danger border-0">
                <i class="fa-solid fa-trash-can"></i> <span class="d-sm-none">Eliminar</span>
            </button>
        </span>
    </div>
    
</li>`;
}