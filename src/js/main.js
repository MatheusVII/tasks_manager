import { mobileNav, newTaskModal, closeModals, restartMatchFilter } from "./components/index.js";
import { createTask, listTasks, alterState } from "./services/index.js";

document.addEventListener("DOMContentLoaded", async() => {
    const btns = document.querySelectorAll('._mobile-nav .main button');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            mobileNav(btn.id);
        })
    })

    await listTasks();

    document.querySelector("#newTaskButton").addEventListener("click", newTaskModal);

    document.querySelector("#overflow").addEventListener("click", closeModals);

    document.querySelector("#closeNewTaskButton").addEventListener("click", newTaskModal);

    document.querySelector("#createNewTaskButton").addEventListener("click", createTask);

    const checkBoxes = document.querySelectorAll("input[name='priorityFilter']");
    checkBoxes.forEach(c => {
        c.addEventListener("change", listTasks);
    });

    document.querySelector("select[name='orderFilter']").addEventListener("change", listTasks);

    document.querySelector("#matchFilterButton").addEventListener("click", listTasks);

    document.querySelector("input[name='matchFilter']").addEventListener("input", async () => {
        if(restartMatchFilter()){
            await listTasks();
        }
    });

    const mobileBtns = document.querySelectorAll("button[name='mobileStateFilter']");
    mobileBtns.forEach(btn => {
        btn.addEventListener("click", async () => {
            await listTasks();
        });
    })
});
