const body = document.querySelector('body');
const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
stop.disabled = true;
start.onclick = () => {
    console.log(`start`)
    start.disabled = true;
    stop.disabled = false;
    timer = setInterval(intervalColor, 1000);
    intervalColor();
};
const intervalColor = () => {
    body.style.cssText = `background-color: ${getRandomHexColor()};`;
    stop.onclick = () => {
        console.log(`stop`);
        start.disabled = false;
        stop.disabled = true;
        clearInterval(timer);
    };
};
