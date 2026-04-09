import { newTaskModal } from "../components/index.js";

export async function createTask(){
    const title = document.querySelector("input[name='title']").value;
    const selected = document.querySelector("input[name='priority']:checked");
    const priority = selected.getAttribute("id");
    const date = document.querySelector("input[name='dueDate']").value;
    const description = document.querySelector("textarea[name='description']").value

    const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
            title: title,
            priority: priority,
            dueDate: date,
            description: description
        })
    })

   if(res.status === 201){
        newTaskModal();
        listTasks();
   }    
}

export async function listTasks(){
    const tasksList = document.querySelector("#tasksList");
    const priorities = {low: {text: "Baixa", class: "low"}, medium: { text: "Media", class: "medium"}, high: { text: "Alta", class: "high"}, urgent: { text: "Urgente", class: "urgent"}};
    const priorityFilter = document.querySelectorAll("input[name='priorityFilter']");
    const orderFilter = document.querySelector("select[name='orderFilter']").value;
    const matchFilter = document.querySelector("input[name='matchFilter']").value;
    const mobileStateFilter = document.querySelector("button[name='mobileStateFilter'].active");
    const state = mobileStateFilter.dataset.state;

    let actualState;

    let priorityArray = [];

    priorityFilter.forEach(p => {
        if(p.checked){
            priorityArray.push(p.value);
        }
    })

    const priorityJoin = priorityArray.join(',');

    tasksList.innerHTML = "";

    const res = await fetch(`http://localhost:3000/api/tasks/search?priority=${priorityJoin}&priorityOrder=${orderFilter}&match=${matchFilter}&state=${state}`, { method: "GET" });

    const data = await res.json();

    if(res.status === 200 && priorityArray.length != 0){
        
        data.data.forEach(task => {
            let priority = task.priority;
            actualState = task.state;
            let createdDate = new Date(task.createdAt).toLocaleDateString("pt-BR");
            let dbDueDate = task.dueDate.split('-');
            let dueDate = `${dbDueDate[2]}/${dbDueDate[1]}/${dbDueDate[0]}`;
            let dbStageChanged;
            let stateChanged;

            if (task.state != 'pending'){
                dbStageChanged = task.state_changed_at != null ? task.state_changed_at.split('-') : null;
                stateChanged = dbStageChanged != null ? `${dbStageChanged[2]}/${dbStageChanged[1]}/${dbStageChanged[0]}` : null;
            }


            let li = document.createElement("li");
            li.innerHTML = `
                <li>
                    <div class="prioridade">
                        <p class='${priorities[priority].class}'>${priorities[priority].text}</p>
                        ${task.state === 'pending' ? `<button id='completeTaskButton' data-id='${task.id}'><img src="../assets/icons/concluida.png" alt=""></button>` : ''}
                    </div>
                    <div class="titulo">
                        <h3>${task.title}</h3>
                    </div>
                    <div class="descricao">
                        <p>${task.description}</p>
                    </div>
                    <div class="footer">
                        <div class="date">
                            <div class="criado">
                                <h3>Criado Em</h3>
                                <h3>${createdDate}</h3>
                            </div>
                            ${task.state === 'completed' ? `
                                <div class="expirado">
                                    <h3>Completado Em</h3>
                                    <h3>${stateChanged || null}</h3>
                                </div>
                                
                                ` : ``}
                            ${task.state === 'canceled' ? `

                                <div class="expirado">
                                    <h3>Cancelado Em</h3>
                                    <h3>${stateChanged || null}</h3>
                                </div>

                                ` : ``}
                            
                            ${task.state === 'pending' ? `

                                <div class="expirado">
                                    <h3>Expira Em</h3>
                                    <h3>${dueDate}</h3>
                                </div>

                                ` : ``}

                        </div>
                        ${task.state === 'pending' ? `<button id='cancelTaskButton' data-id='${task.id}'><img src="../assets/icons/cancelar.png" alt=""></button>` : `<button id='deleteTaskButton' data-id='${task.id}'><img src="../assets/icons/lixeira.png" alt=""></button>`}
                    </div>
                </li>
            `
    
            tasksList.appendChild(li);
        });

        restartTasksButtons(actualState);
    }
}

export async function alterState(id, state){
    const date = new Date().toISOString().split("T")[0];
    
    const res = await fetch(`http://localhost:3000/api/tasks/state/${id}`,{
        method: "PUT",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({
            state: state,
            state_changed_at: date
        })
    });

    if(res.status === 204){
       listTasks(); 
    }
}

export async function deleteTask(id){
    id = parseInt(id);

    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE"
    });

    if(res.status === 204){
        listTasks()
    }
}

function restartTasksButtons(state){

    if(state != 'pending'){
        const deleteTaskButtons = document.querySelectorAll("#deleteTaskButton");
        deleteTaskButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                deleteTask(btn.dataset.id);
            })
        }); 
    }
    const cancelTaskButtons = document.querySelectorAll("#cancelTaskButton");
    cancelTaskButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            alterState(btn.dataset.id, "canceled");
        })
    })

    const completeTaskButtons = document.querySelectorAll("#completeTaskButton");
    completeTaskButtons.forEach(btn => {
        btn.addEventListener("click", async() => {
            alterState(btn.dataset.id, "completed");
        });
    })
}