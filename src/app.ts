const body = document.body as HTMLBodyElement;
const rightPanel = document.querySelector("#right-panel") as HTMLDivElement;
const toggleOn = document.querySelector("#toggle_on") as HTMLSpanElement;
const toggleOff = document.querySelector("#toggle_off") as HTMLSpanElement;
const moon = document.querySelector("#dark_mode") as HTMLSpanElement;
const sun = document.querySelector("#light_mode") as HTMLSpanElement;
const search = document.querySelector('#search') as HTMLInputElement;
const fonts = document.querySelector("#fonts") as HTMLSelectElement;
const boldWord = document.querySelector(".bold") as HTMLDivElement;
const form = document.querySelector('form') as HTMLFormElement;

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
    }
    else{
        sun.classList.add('on')
        sun.classList.remove('off')
        moon.classList.add('off')
        toggleOn.classList.add('off')
        toggleOff.classList.remove('off')
        search.style.color = 'black';
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
