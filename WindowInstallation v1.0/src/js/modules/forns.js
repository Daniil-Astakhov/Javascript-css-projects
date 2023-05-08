

const forms = (state) => {
    const form = document.querySelectorAll('.form'),
          inputs = document.querySelectorAll('input'),
          modals = document.querySelectorAll('[data-modal]'),
          phoneInput = document.querySelectorAll('input[name="user_phone"]'),
          userInput = document.querySelectorAll('input[name="user_name"]')

    phoneInput.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/,"")
        });
    });
    userInput.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\d/,"")
        });
    });

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо, с Вами скоро свяжутся',
        error: 'Чтото пошло не так'
    }

    const closeAll = () => {
        modals.forEach(item => {
            item.style.display = 'none'
        });
    }

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = ''
        })
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;

        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };


    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);
           

            const formData = new FormData(item);
            if(item.getAttribute('data-calck') === "end"){
                for (let key in state){
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(result => {
                    console.log(result);
                    statusMessage.textContent = message.success
                })
                .catch(()=> statusMessage.textContent = message.error)
                .finally(() => {
                    clearInputs();
                    setTimeout(()=>{
                        statusMessage.remove();
                        closeAll();
                    }, 3000);
                });

        });
    });

}

export default forms;