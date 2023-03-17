"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const body = document.body;
const rightPanel = document.querySelector("#right-panel");
const toggleOn = document.querySelector("#toggle_on");
const toggleOff = document.querySelector("#toggle_off");
const moon = document.querySelector("#dark_mode");
const sun = document.querySelector("#light_mode");
const search = document.querySelector('#search');
const fonts = document.querySelector("#fonts");
const boldWord = document.querySelector(".bold");
const form = document.querySelector('form');
// light/dark theme
rightPanel.addEventListener('click', () => {
    body.classList.toggle("dark-theme");
    if (body.classList.contains("dark-theme")) {
        sun.classList.add('off');
        sun.classList.remove('on');
        moon.classList.remove('off');
        toggleOff.classList.add('off');
        toggleOn.classList.remove('off');
        search.style.color = 'white';
    }
    else {
        sun.classList.add('on');
        sun.classList.remove('off');
        moon.classList.add('off');
        toggleOn.classList.add('off');
        toggleOff.classList.remove('off');
        search.style.color = 'black';
    }
});
// fonts switch
fonts.addEventListener("change", () => {
    switch (fonts.value) {
        case 'Oswald':
            body.style.fontFamily = `Oswald, sans-serif`;
            break;
        case 'Outfit':
            body.style.fontFamily = `Outfit, sans-serif`;
            break;
        case 'Montserrat':
            body.style.fontFamily = `Montserrat, sans-serif`;
            break;
        case 'Times_New_Roman':
            body.style.fontFamily = `Times New Roman, Times, serif`;
            break;
        case 'Arial':
            body.style.fontFamily = `Arial, Helvetica, sans-serif`;
            break;
        default:
            body.style.fontFamily = `Oswald, sans-serif`;
            break;
    }
});
const myFunc = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('https://api.dictionaryapi.dev/api/v2/entries/en/hello');
    const data = yield response.json();
    return data;
    console.log(data);
});
myFunc();
