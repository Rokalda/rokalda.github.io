const base_embededMapSrc=`https://maps.google.com/maps?&hl=${navigator.language}&z=8&output=embed&q=`

const restapiurl="https://restcountries.com/v3.1/"


const  country_form = document.getElementById("country_form")
const name_input=document.getElementById("country-names-input")
const name_datalist = document.getElementById("country-names")
const c_flag = document.querySelector(".country-flag")
const c_map = document.querySelector(".country-map")
const searchBtn = document.getElementById("searchBtn")

country_form.onsubmit=(e)=>{
    console.log(e)
    e.preventDefault();
    getCountryData()
}


getNames()


async function getCountryData(){
    document.querySelector(".country-data").classList.add("loading")
    const response =await fetch(restapiurl+"name/"+name_input.value+"?fullText=True&fields=flags,name")
    document.querySelector(".country-data").classList.remove("loading")

    if(response.ok){
        console.log("Request to "+response.url+" was successful")
        const data = await response.json();
        let flagdata = data[0].flags
        let nameData = data[0].name;
    
        
        c_flag.querySelector(".title").innerHTML=`<span class="sthr_text" style="background-image:url(${flagdata.png})">${nameData.common}'s</span> FLAG`
       c_flag.querySelector("img").src=flagdata.png
       c_flag.querySelector("img").alt=flagdata.alt;
      
       
       c_map.querySelector(".title").innerHTML = `<span class="sthr_text" style="background-image:url(${flagdata.png})">${nameData.common}'s</span> MAP`
       c_map.querySelector("iframe").src=base_embededMapSrc +`${nameData.common}`

       c_flag.querySelector(".desc").innerHTML=flagdata.alt;
    }
    else if(response.status==404){
        alert("This Country cannot be found")
    }

}

async function getNames(){
    const response=await fetch(restapiurl+"all?fields=name")
    const allcountrys= await response.json()
   for(let country of allcountrys){
     let name = country.name;
        let option = `<option value="${name.common}"></option>`
        name_datalist.innerHTML+=option;
   }
}


function parseforColorNames(string){
    let arr_of_words = string.split(" ")
    let parsedString=""
    for(let word of arr_of_words){
        word=` <span style="color:${word}">${word}</span> `
        parsedString+=word
    }
    return parsedString

}