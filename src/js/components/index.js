export function mobileNav(id){
    const btns = document.querySelectorAll(`._mobile-nav .main button`);

    btns.forEach(btn => {
        btn.classList.remove('active');
    })

    const btn = document.querySelector(`._mobile-nav .main #${id}`);

    btn.classList.add('active');
}