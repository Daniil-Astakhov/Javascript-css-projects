export default class ShowInfo {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);

    }


    init(){
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const siblingbtn = btn.closest('.module__info-show').nextElementSibling;
                siblingbtn.classList.toggle('msg');
                siblingbtn.style.marginTop = '20px';
            })
        })
    }
}