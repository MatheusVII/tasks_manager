import { newTaskModal } from "../components/index.js";

export async function createTask(){
    const title = document.querySelector("input[name='title']").value;
    const selected = document.querySelector("input[name='priority']:checked");
    const priority = selected.getAttribute("id");
    const date = document.querySelector("input[name='dueDate']").value;
    const description = document.querySelector("textarea[name='description']").value

    console.log(title, priority, date, description);

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
   }    
}

export async function listTasks(){
    const tasksList = document.querySelector("#tasksList");
    const priorities = {low: {text: "Baixa", class: "low"}, medium: { text: "Media", class: "medium"}, high: { text: "Alta", class: "high"}, urgent: { text: "Urgente", class: "urgent"}};
    const priorityFilter = document.querySelectorAll("input[name='priorityFilter']");
    const orderFilter = document.querySelector("select[name='orderFilter']").value;
    const matchFilter = document.querySelector("input[name='matchFilter']").value;

    let priorityArray = [];

    priorityFilter.forEach(p => {
        if(p.checked){
            priorityArray.push(p.value);
        }
    })

    const priorityJoin = priorityArray.join(','); 

    const res = await fetch(`http://localhost:3000/api/tasks/search?priority=${priorityJoin}&priorityOrder=${orderFilter}&match=${matchFilter}`, { method: "GET" });

    const data = await res.json();

    tasksList.innerHTML = "";

    if(res.status === 200 && priorityArray.length != 0){
        
        data.data.forEach(task => {
            let priority = task.priority;
            let createdDate = new Date(task.createdAt).toLocaleDateString("pt-BR");
            let dueDate = new Date(task.dueDate).toLocaleDateString("pt-BR");
            let li = document.createElement("li");
            li.innerHTML = `
                <li>
                    <div class="prioridade">
                        <p class='${priorities[priority].class}'>${priorities[priority].text}</p>
                        <button><img src="../assets/icons/concluida.png" alt=""></button>
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
                            <div class="expirado">
                                <h3>Expira Em</h3>
                                <h3>${dueDate}</h3>
                            </div>
                        </div>
                        <button><img src="../assets/icons/lixeira.png" alt=""></button>
                    </div>
                </li>
            `

            tasksList.appendChild(li);
        })
    }
}