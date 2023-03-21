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
const audioPlayer = document.querySelector(".audio") as HTMLDivElement;
const audioPlayerElements = document.querySelector(".audio span") as HTMLSpanElement;
const playBtn = document.querySelector(".play") as HTMLSpanElement;
const transcript = document.querySelector(".transcript") as HTMLDivElement;
const form = document.querySelector('form') as HTMLFormElement;
const firstNounLi = document.querySelector('#first') as HTMLLIElement;
const secondNounLi = document.querySelector('#second') as HTMLLIElement;
const thirdNounLi = document.querySelector('#third') as HTMLLIElement;
const source = document.querySelector(".source #link") as HTMLAnchorElement;
const linkArrow = document.querySelector('.source #pic') as HTMLAnchorElement;
const lastDiv = document.querySelector(".source") as HTMLDivElement;
const author = document.querySelector('#author') as HTMLAnchorElement;

// audio context
let audioContext:AudioContext
let samples:Array<AudioBuffer>;

// light/dark theme switch
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
        author.style.color = "orangered"
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
        author.style.color = "darkviolet"
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
    getWord(word:string):Promise<unknown>;
    updateUI(word:string):Promise<void>;
    getAudioFile(filepath:string):Promise<AudioBuffer>;
    setupSamples(paths:string):Promise<AudioBuffer[]>
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
        // console.log(data)
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
        audioPlayer.classList.remove("off")
        noun.classList.remove("off")
        nounMeaning.classList.remove('off')
        lastDiv.classList.remove('off')
        // remove previous event listeners
        // playBtn.removeEventListener('click', playSample())
        playBtn.removeEventListener("click", noAudio)
        // Audio API paths management
        const samplePath:string = await response[0].phonetics[0].audio
        if(samplePath == ""){
            playBtn.addEventListener("click", noAudio)
        }else{
            const audioResponse = await this.setupSamples(samplePath)
            .then(response => {
                samples = response
                // console.log(samplePath)
                playBtn.addEventListener("click", () =>{
                    playSample(samples[0], 0)
                })
            })
        }
    }
    async getAudioFile(filepath:string):Promise<AudioBuffer>{
        audioContext = new AudioContext()
        const response = await fetch(filepath);
        const arrayBuffer = await response.arrayBuffer()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        return audioBuffer
    }
    async setupSamples(path:string):Promise<AudioBuffer[]>{
        console.log("setting up sample")
        const audioBuffers = []
        const sample = await this.getAudioFile(path)
        audioBuffers.push(sample)
        console.log("setting up sample done")
        return audioBuffers
    }
}
// form event listener
form.addEventListener("submit", e =>{
    e.preventDefault();
    const searchedWord = search.value.trim().toLowerCase();
    const dynamicUI = new Dictionary(searchedWord);
    dynamicUI.updateUI(searchedWord)
    console.log(dynamicUI.getWord(searchedWord))
})
// functions for Audio Player
function playSample(audioBuffer:AudioBuffer, time:any){
    const sampleSrc = audioContext.createBufferSource()
    sampleSrc.buffer = audioBuffer;
    sampleSrc.connect(audioContext.destination)
    sampleSrc.start(time) 
}

function noAudio(){
    alert("Sorry, this word was not provided with audio sample by database")
}