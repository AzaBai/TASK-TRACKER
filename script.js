let taskList = document.querySelector('.task-list')
let save = document.querySelector('.save')
let taskDescription = document.querySelector('.task-description')
let taskPriority = document.querySelector('.task-priority')
let taskAssign = document.querySelector('.task-assign')
let taskForm = document.querySelector('.task-form')
let deleteBtn  = document.querySelectorAll('.btn-danger')


save.addEventListener('click', (e) => saveTasks(e))


function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || []
}

function saveTasks(event) {
    event.preventDefault()
    let tasks = getTasks()
    let newTask = {
        id: +new Date(),
        description: taskDescription.value,
        isOpen: true,
        assignPerson: taskAssign.value,
        status: taskPriority.value
    }
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]))
    taskForm.reset()
    view()
}

function view() {
    // let tasks = [{
    //     id: 'ytre-43453-ytre-5433-gddsfv',
    //     description: 'Zakonchit verstku proyekta',
    //     isOpen: 'Открыта',
    //     assignPerson:'Ivanov Ivan',
    //     status: 'Срочно'
    // }]
    taskList.innerHTML = ''
    let tasks = getTasks()
    tasks.forEach(task => {
        taskList.innerHTML += `<div class=" p-3 mb-3 block ">
                    <h6>Номер задачи: ${task.id}</h6>
                    <span class="badge bg-primary">${task.isOpen ? 'Open' : 'Close'}</span>
                    <h3 class="my-4">${task.description}</h3>
                    <div class="status">
                        <i class="fas fa-clock"></i>
                        <span class="text-danger">${task.status}</span>
                    </div>
                    <div class="assign mb-3">
                        <i class="far fa-user-circle"></i>
                        <span>${task.assignPerson}</span>
                    </div>
                    <button type="button" class="btn btn-success">Закрыть</button>
                    <button type="button" class="btn btn-danger">Удалить</button>
                </div>`
    })

        document.querySelectorAll('.btn-success').forEach((btn, btnIdx) => {
            let tasks = getTasks()
            btn.addEventListener('click', () => {
                tasks.map((task, taskIdx) => {
                    if (taskIdx === btnIdx) {
                        task.isOpen = !task.isOpen
                        localStorage.setItem('tasks', JSON.stringify(tasks))
                        view()
                    }
                })
            })
        })



        document.querySelectorAll('.btn-danger').forEach((button, idx) => {
            let tasks = getTasks()
            button.addEventListener('click', () => {
                tasks.splice(idx, 1)
                localStorage.setItem('tasks', JSON.stringify(tasks))
                view()
            })
        })

}

view()



deleteBtn.forEach((button, index) => {
    button.addEventListener('click', () => {
        let task = getTasks().filter((el,idx) => idx !== index)
        localStorage.setItem('tasks', JSON.stringify(task))
    })
})