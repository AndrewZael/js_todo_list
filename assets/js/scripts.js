const totalTask = document.getElementById('total-task');
const okTask = document.getElementById('ok-task');
const textTask = document.getElementById('text-task');
const addTask = document.getElementById('add-task');
const contentTasks = document.getElementById('tasks');
const contentNotice = document.getElementById('notice');
const headTasks = document.getElementById('header-tasks');
const arrTasks = [];

printHtmlList();
notice();

// Escucha el evento click del botón agregar 
addTask.addEventListener('click', function(){
    textTask.value != '' ? saveTask() : alert('Debe completar el campo tarea');
});

// Pinta en pantalla la lista
function printHtmlList(){
    let html = '';
    contentTasks.innerHTML = '';
    for (const item of arrTasks) {
        html += getTemplateTask(item.id, item.task, item.done);
    }
    contentTasks.innerHTML = html;
}

// guarda tarea en arrTasks, muestra tarea en el HTML y limpia el input textTask
function saveTask(){
    let id = Date.now();
    let task = textTask.value;
    let done = false;
    arrTasks.unshift({id, task, done});
    textTask.value = '';
    printHtmlList();
    total();
    notice();
}

// Muestra en pantalla el total de tareas (Realizadas y total tareas)
function total(){
    totalTask.innerHTML = arrTasks.length;
    okTask.innerHTML = arrTasks.filter(item => item.done === true).length;
}

// Elimina una tarea
function deleteTask(id, task){
    if(confirm(`¿Seguro que desea eliminar la tarea ${task}?`)){
        const i = arrTasks.findIndex(item => item.id === id);
        const taksHtml = document.querySelectorAll('.item-task');
        taksHtml[i].classList.add('alert-danger', 'border-danger', 'remove');
        arrTasks.splice(i, 1);
        setTimeout(() => {
            printHtmlList();
            total();
            notice();
        },2000);
    }
}

// Cambia la key done de una tarea entre true y false
function taskDone(id){
    const i = arrTasks.findIndex(item => item.id === id);
    arrTasks[i].done = !arrTasks[i].done; 
    setTimeout(() => {
        printHtmlList();   
    },100);
    total();
}

// Retorna un template tarea
function getTemplateTask(id, task, done){
    return `<li id="content-${id}" class="item-task row mx-0 align-items-center rounded mb-1 py-3 py-sm-2 border ${done && 'alert-success border-success'}">
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
            <input onchange="taskDone(${id})" class="form-check-input" type="checkbox" value="" id="task" ${done && 'checked'}>
            <label class="form-check-label" for="task">Completada</label>
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

// Verifica si existe alguna tarea agregada
function notice(){
    if(arrTasks.length === 0){
        headTasks.classList.add('invisible');
        contentNotice.innerHTML = `
        <div class="text-center p-5 pb-5">
            <i class="fa-solid fa-inbox fa-10x text-info"></i>
            <h2 class="mt-4 mb-2">Está algo vacío por aquí</h2>
            <p>Agrega nuevas tareas a tu lista.</p>
        </div>`;
    }else{
        headTasks.classList.remove('invisible');
        contentNotice.innerHTML = '';
    }
}
