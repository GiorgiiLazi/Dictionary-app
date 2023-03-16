"use strict";
const body = document.body;
const rightPanel = document.querySelector("#right-panel");
const toggleOn = document.querySelector("#toggle_on");
const toggleOff = document.querySelector("#toggle_off");
const moon = document.querySelector("#dark_mode");
const sun = document.querySelector("#light_mode");
rightPanel.addEventListener('click', () => {
    body.classList.toggle("dark-theme");
    if (body.classList.contains("dark-theme")) {
        sun.classList.add('off');
        sun.classList.remove('on');
        moon.classList.remove('off');
        toggleOff.classList.add('off');
        toggleOn.classList.remove('off');
    }
    else {
        sun.classList.add('on');
        sun.classList.remove('off');
        moon.classList.add('off');
        toggleOn.classList.add('off');
        toggleOff.classList.remove('off');
    }
});
