import flatpickr from 'flatpickr';
import { Ukraine } from 'flatpickr/dist/l10n/uk.js';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';


const input = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

input.disabled = false;
startButton.disabled = true;
flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    "locale": Ukraine,
    // Дата: "сегодня"
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const timeDifference = selectedDates[0] - Date.now();
        if (timeDifference < 0) {
            Notiflix.Notify.failure("Please choose a date in the future");
            
        } else {
            startButton.disabled = false;
            console.log(selectedDates[0]);
        }
        
    },
});

const addLeadingZero=(value) => {
    if (100 > value) {
        return String(value).padStart(2, '0');
    }
    return String(value).padStart(3, '0');
};

const startTime = () => {
    startButton.disabled = true;
    input.disabled = true;
    const timeValue = new Date(input.value);
    const timeInterval = setInterval(() => {
        const timeDiff = convertMs(timeValue - new Date());
        if (new Date() >= timeValue-1000) {
            clearInterval(timeInterval);
            input.disabled = false;
        }
        daysValue.textContent = addLeadingZero(timeDiff.days);
        hoursValue.textContent = addLeadingZero(timeDiff.hours);
        minutesValue.textContent = addLeadingZero(timeDiff.minutes);
        secondsValue.textContent = addLeadingZero(timeDiff.seconds);
        
    }, 1000);
};
startButton.addEventListener('click', startTime);

function convertMs(ms) {
    // Количество миллисекунд в единицу времени
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Оставшиеся дни
    const days = Math.floor(ms / day);
    // Оставшиеся часы
    const hours = Math.floor((ms % day) / hour);
    // Оставшиеся минуты
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Оставшиеся секунды
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};