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
const transcript = document.querySelector(".transcript");
const form = document.querySelector('form');
const firstNounLi = document.querySelector('#first');
const secondNounLi = document.querySelector('#second');
const thirdNounLi = document.querySelector('#third');
const source = document.querySelector(".source a");
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
class Dictionary {
    constructor(message) {
        this.URL = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
        this.word = message;
    }
    getWord(word) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.URL}${this.word}`);
            const data = yield response.json();
            return data;
            console.log(data);
        });
    }
    updateUI(word) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getWord(word);
            boldWord.innerText = response[0].word;
            transcript.innerText = response[0].phonetic;
            firstNounLi.innerText = response[0].meanings[0].definitions[0].definition;
            secondNounLi.innerText = response[0].meanings[0].definitions[1].definition;
            thirdNounLi.innerText = response[0].meanings[0].definitions[2].definition;
            source.innerText = response[0].sourceUrls[0];
        });
    }
}
form.addEventListener("submit", e => {
    e.preventDefault();
    const searchedWord = search.value.trim();
    const dynamicUI = new Dictionary(searchedWord);
    dynamicUI.updateUI(searchedWord);
    console.log(dynamicUI.getWord(searchedWord));
});
// async function hello(){
//     const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/hello")
//     const data = await response.json()
//     return data
//     console.log(data)
// }
// hello().then(data => console.log(data))
