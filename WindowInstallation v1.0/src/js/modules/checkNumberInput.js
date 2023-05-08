const check = (target) => {
    const numInputs = document.querySelectorAll(target)

    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/,"")
        });
    });

}
export default check;