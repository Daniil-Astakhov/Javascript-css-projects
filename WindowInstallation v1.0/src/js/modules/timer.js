const timer = (element, deadline) => {


    const addZero  = (num) => {
        if (num <= 9) {
            return '' + num
        } else {
            return num
        }
    };


    const getTime = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              seconds = Math.floor((t / 1000) % 60),
              minutes = Math.floor((t / 1000/60) %60),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              day = Math.floor((t / (1000 * 60 * 60 * 24)));
        return {
        "total": t,
        'days': day,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,
        };
    };

    const setClock = (selector, endtime) => {

        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInternal = setInterval(updateClock, 1000);
              
        updateClock ();

        function updateClock () {
            const t = getTime(endtime)
            days.textContent = addZero(t.days)
            hours.textContent = addZero(t.hours)
            minutes.textContent = addZero(t.minutes)
            seconds.textContent = addZero(t.seconds)

            if (t.total <= 0) {
                days.textContent = "00"
                hours.textContent = "00"
                minutes.textContent = "00"
                seconds.textContent = "00"
                clearInterval(timeInternal)
            }
        }

    }


    setClock(element, deadline)

   


};
export default timer;