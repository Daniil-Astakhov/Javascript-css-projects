const images = () => {

    const imgPopup = document.createElement('div'),
          workSelector = document.querySelector('.works'),
          bigImg = document.createElement('img');


    imgPopup.classList.add('popup');
    workSelector.appendChild(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImg);

    workSelector.addEventListener('click', (e) => {
        e.preventDefault();
        let target = e.target

        if(target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            const path = target.parentNode.getAttribute('href');
            bigImg.setAttribute('src', path)
        }
        if (target && target.matches('div.popup')) {
            imgPopup.style.display = 'none';
        }   
    })







}

export default images;