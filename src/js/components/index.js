export function mobileNav(id){
    const btns = document.querySelectorAll(`._mobile-nav .main button`);

    btns.forEach(btn => {
        btn.classList.remove('active');
    })

    const btn = document.querySelector(`._mobile-nav .main #${id}`);

    btn.classList.add('active');
}

export function newTaskModal(){
    const modal = document.querySelector("#newTaskModal");
    const overflow = document.querySelector("#overflow");

    modal.classList.toggle('active');
    overflow.classList.toggle('active');

    const inputs = document.querySelectorAll("#newTaskModal input");
    const textarea = document.querySelector("textarea[name='description']");

    textarea.value = "";
    inputs.forEach(i => { i.value = "" }); 
}

export function closeModals(){
    const modal = document.querySelector("#newTaskModal");
    const overflow = document.querySelector("#overflow");

    modal.classList.remove('active');
    overflow.classList.remove('active');
}

export function restartMatchFilter(){
    const input = document.querySelector("input[name='matchFilter']").value;

    if(input.length === 0){
        return true
    }

    return false
}