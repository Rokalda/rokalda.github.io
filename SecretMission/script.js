window.onload=()=>{
    const h1El=document.querySelector("h1")
    let newString=""
    for (let c of h1El.textContent) {
        if(c!=' '){
            newString+=`<span class="stag_lttr">${c}</span>`
            
        }
        else{
            newString+=`<span class="stag_lttr"></span>`

        }
        
        
    }
    
    h1El.innerHTML=newString;
    anime({
        targets:".stag_lttr",
    
        translateY: 400,
        delay:anime.stagger(50),
    })    
}
