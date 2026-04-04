import { mobileNav } from "./components/index.js";

const btns = document.querySelectorAll('._mobile-nav .main button');
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        mobileNav(btn.id);
    })
})