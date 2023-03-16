const body = document.body as HTMLBodyElement;
const rightPanel = document.querySelector("#right-panel") as HTMLDivElement;
const toggleOn = document.querySelector("#toggle_on") as HTMLSpanElement;
const toggleOff = document.querySelector("#toggle_off") as HTMLSpanElement;
const moon = document.querySelector("#dark_mode") as HTMLSpanElement;
const sun = document.querySelector("#light_mode") as HTMLSpanElement;

rightPanel.addEventListener('click', () =>{
    body.classList.toggle("dark-theme");
    if(body.classList.contains("dark-theme")){
        sun.classList.add('off')
        sun.classList.remove('on')
        moon.classList.remove('off')
        toggleOff.classList.add('off')
        toggleOn.classList.remove('off')
    }
    else{
        sun.classList.add('on')
        sun.classList.remove('off')
        moon.classList.add('off')
        toggleOn.classList.add('off')
        toggleOff.classList.remove('off')
        

        
        
    }
    }
    
    
)
