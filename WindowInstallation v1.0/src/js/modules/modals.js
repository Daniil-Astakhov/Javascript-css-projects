const modals = (state) => {

    function bindModal (triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]')
              scroll = calcScroll()

        trigger.forEach(trigger => {
            let event = trigger.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault()
                    
                }
                if (modal.classList.contains('popup_calc_profile')) {
					if (!state.form || !state.width || !state.height) {
						event.removeEventListener();
					}
				}

				if (modal.classList.contains('popup_calc_end')) {
					if (!state.type || !state.profile) {
						event.removeEventListener();
					}
				}
                windows.forEach(item => {
                    item.style.display = 'none'
                });
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; 
                document.body.style.marginRight = `${scroll}px`
            })
        })

        close.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            windows.forEach(item => {
                item.style.display = 'none'
            }); 
            document.body.style.marginRight = `0px`
        })
        
        modal.addEventListener('click', (e) =>{
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none'
                });
                modal.style.display = 'none';
                document.body.style.overflow = ''; 
                document.body.style.marginRight = '0p'
            }
        })

        
    };

    
    
    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll'
        div.style.visibility = 'hidden'

        document.body.appendChild(div)

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove()

        return scrollWidth;
    }
    

    function showModalByTime(modalSelector, time) {
        setTimeout(function() {
            const modal = document.querySelector(modalSelector);
            if (modal) {
                modal.style.display = "block";
                document.body.style.overflow = '';
            }
        }, time);
    }


    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');

    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    showModalByTime('.popup_engineer', 60000)
};
    


export default modals;