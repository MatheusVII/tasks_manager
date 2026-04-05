import { newTaskModal } from "../components/index.js";

export async function createTask(){
    const title = document.querySelector("input[name='title']").value;
    const priority = document.querySelector("input[name='priority']:checked")?.value;
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
   }    
}