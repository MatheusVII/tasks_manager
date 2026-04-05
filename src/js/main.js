import { mobileNav, newTaskModal, closeModals } from "./components/index.js";
import { createTask } from "./services/index.js";

const btns = document.querySelectorAll('._mobile-nav .main button');
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        mobileNav(btn.id);
    })
})

document.querySelector("#newTaskButton").addEventListener("click", newTaskModal);

document.querySelector("#overflow").addEventListener("click", closeModals);

document.querySelector("#closeNewTaskButton").addEventListener("click", newTaskModal);

document.querySelector("#createNewTaskButton").addEventListener("click", createTask);