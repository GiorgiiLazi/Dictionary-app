const body = document.body as HTMLBodyElement;
const rightPanel = document.querySelector("#right-panel") as HTMLDivElement;
const toggleOn = document.querySelector("#toggle_on") as HTMLSpanElement;
const toggleOff = document.querySelector("#toggle_off") as HTMLSpanElement;
const moon = document.querySelector("#dark_mode") as HTMLSpanElement;
const sun = document.querySelector("#light_mode") as HTMLSpanElement;
const search = document.querySelector('#search') as HTMLInputElement;
const fonts = document.querySelector("#fonts") as HTMLSelectElement;
const boldWord = document.querySelector(".bold") as HTMLDivElement;
const nounMeaning = document.querySelector(".noun-meaning") as HTMLDivElement;
const noun = document.querySelector(".noun") as HTMLDivElement;
const wrapper = document.querySelector(".wrapper") as HTMLDivElement;
const audio = document.querySelector(".audio") as HTMLDivElement;
const transcript = document.querySelector(".transcript") as HTMLDivElement;
const form = document.querySelector('form') as HTMLFormElement;
const firstNounLi = document.querySelector('#first') as HTMLLIElement;
const secondNounLi = document.querySelector('#second') as HTMLLIElement;
const thirdNounLi = document.querySelector('#third') as HTMLLIElement;
const source = document.querySelector(".source #link") as HTMLAnchorElement;
const linkArrow = document.querySelector('.source #pic') as HTMLAnchorElement;
const lastDiv = document.querySelector(".source") as HTMLDivElement;


// light/dark theme
rightPanel.addEventListener('click', () =>{
    body.classList.toggle("dark-theme");
    if(body.classList.contains("dark-theme")){
        sun.classList.add('off')
        sun.classList.remove('on')
        moon.classList.remove('off')
        toggleOff.classList.add('off')
        toggleOn.classList.remove('off')
        search.style.color = 'white';
        fonts.style.color = "orangered"
        source.style.color = "orangered"
        linkArrow.style.color = "orangered"
        search.style.borderColor = "orangered"
        search.style.outlineColor = "orangered"
    }
    else{
        sun.classList.add('on')
        sun.classList.remove('off')
        moon.classList.add('off')
        toggleOn.classList.add('off')
        toggleOff.classList.remove('off')
        search.style.color = 'black';
        fonts.style.color = "darkviolet"
        source.style.color = "darkviolet"
        linkArrow.style.color = "darkviolet"
        search.style.borderColor = "darkviolet"
        search.style.outlineColor = "darkviolet"
    }
});

// fonts switch
fonts.addEventListener("change", ()=>{
    switch(fonts.value){
        case 'Oswald':
            body.style.fontFamily = `Oswald, sans-serif`
            break;
        case 'Outfit':
            body.style.fontFamily = `Outfit, sans-serif`
            break;
        case 'Montserrat':
                body.style.fontFamily = `Montserrat, sans-serif`
            break;
        case 'Times_New_Roman':
                body.style.fontFamily = `Times New Roman, Times, serif`
            break;
        case 'Arial':
                body.style.fontFamily = `Arial, Helvetica, sans-serif`
            break;
        default:
            body.style.fontFamily = `Oswald, sans-serif`
        break
    }
})


// Async function class and interface 
interface ForDictionary{
    URL: string;
    word: string;
    getWord(word:string):any;
    updateUI(word:string):void;
}
class Dictionary implements ForDictionary{
    URL:string
    word:string;
    constructor(message:string){
        this.URL = `https://api.dictionaryapi.dev/api/v2/entries/en/`
        this.word = message;
    }
    async getWord(word:string){
        const response = await fetch(`${this.URL}${this.word}`)
        const data = await response.json()
        return data
        console.log(data)
    }
    async updateUI(word:string){
        const response = await this.getWord(word)
        // API requests
        boldWord.innerText = response[0].word
        transcript.innerText = response[0].phonetic
        firstNounLi.innerText = response[0].meanings[0].definitions[0].definition
        secondNounLi.innerText = response[0].meanings[0].definitions[1].definition
        thirdNounLi.innerText = response[0].meanings[0].definitions[2].definition
        source.innerText = response[0].sourceUrls[0]
        source.href = source.innerText
        linkArrow.href = source.innerText
        // visible UI
        wrapper.classList.remove("off")
        audio.classList.remove("off")
        noun.classList.remove("off")
        nounMeaning.classList.remove('off')
        lastDiv.classList.remove('off')

    }
}

form.addEventListener("submit", e =>{
    e.preventDefault();
    const searchedWord = search.value.trim();
    const dynamicUI = new Dictionary(searchedWord);
    dynamicUI.updateUI(searchedWord)
    console.log(dynamicUI.getWord(searchedWord))
})




// async function hello(){
//     const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/hello")
//     const data = await response.json()
//     return data
//     console.log(data)
// }

// hello().then(data => console.log(data))