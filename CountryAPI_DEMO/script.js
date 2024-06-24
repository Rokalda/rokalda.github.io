const base_embededMapSrc=`https://maps.google.com/maps?&hl=${navigator.language}&z=8&output=embed&q=`

const restapiurl="https://restcountries.com/v3.1/"


const  country_form = document.getElementById("country_form")
const name_input=document.getElementById("country-names-input")
const name_datalist = document.getElementById("country-names")
const coa_El = document.querySelector(".country-coa")
const c_flag = document.querySelector(".country-flag")
const c_map = document.querySelector(".country-map")
const searchBtn = document.getElementById("searchBtn")

country_form.onsubmit=(e)=>{
    console.log(e)
    e.preventDefault();
    displayCountryData(name_input.value)
}


getNames()

window.onload=()=>{
    let win_url = new URL(window.location.href)
    if(win_url.searchParams.get("country_name")!=null){
        displayCountryData(win_url.searchParams.get("country_name"))
    }
   
    
}

async function displayCountryData(country_name){
    document.querySelector(".country-data").classList.add("loading")
    const response =await fetch(restapiurl+"name/"+country_name+"?fullText=True&fields=flags,name,latlng,coatOfArms,demonyms,population,area")
    document.querySelector(".country-data").classList.remove("loading")

    if(response.ok){
        console.log("Request to "+response.url+" was successful")

        const data = await response.json();
        let flagdata = data[0].flags
        let nameData = data[0].name;
        let latlongData = data[0].latlng;
        let coaData = data[0].coatOfArms;
        let denonymData = data[0].demonyms;
        let areadata = data[0].area;
        let populationData = data[0].population;

        c_flag.querySelector(".title").innerHTML=`<span class="sthr_text" style="background-image:url(${flagdata.png})">${nameData.common}'s</span> FLAG`
       c_flag.querySelector("img").src=flagdata.png
        
       c_flag.querySelector("img").alt=flagdata.alt;
        let icon_link=document.querySelector('link[rel="shortcut icon"]')
        icon_link.href=flagdata.png;
       if(coaData.png ==""){
        coa_El.querySelector(".title").innerHTML=`<span class="sthr_text" style="background-image:url(${flagdata.png})">${nameData.common}</span> has no Coat of Arms`
        coa_El.querySelector("img").src=coaData.png;

       }
       else{
        coa_El.querySelector(".title").innerHTML=`<span class="sthr_text" style="background-image:url(${flagdata.png})">${nameData.common}'s</span> Coat of Arms`
        coa_El.querySelector("img").src=coaData.png;
       }

       c_map.querySelector(".title").innerHTML = `<span class="sthr_text" style="background-image:url(${flagdata.png})">${nameData.common}'s</span> MAP`
       c_map.querySelector("iframe").src=base_embededMapSrc +`${nameData.common}`
        c_map.querySelector(".coords").innerHTML=`Latitude: ${latlongData[0]} <br> Longitude: ${latlongData[1]}`
        c_map.querySelector(".area").textContent=areadata.toLocaleString();

        c_map.querySelector(".population").textContent=populationData.toLocaleString();
        c_map.querySelector(".demonym").textContent=denonymData.eng.m;
       //c_flag.querySelector(".desc").innerHTML=flagdata.alt;
    }
    else if(response.status==404){
        alert("This Country cannot be found")
    }

}

async function getNames(){
    const response=await fetch(restapiurl+"all?fields=name")
    const allcountrys= await response.json()
    allcountrys.sort((a,b)=>a.name.common.localeCompare(b.name.common))
  
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
