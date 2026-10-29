const base_embededMapSrc=`https://maps.google.com/maps?&hl=${navigator.language}&z=8&output=embed&q=`

const restapiurl="https://countries.dev/"


const  country_form = document.getElementById("country_form")
const name_input=document.getElementById("country-names-input")
const name_datalist = document.getElementById("country-names")

const c_flag = document.querySelector(".country-flag")
const c_map = document.querySelector(".country-map")
const searchBtn = document.getElementById("searchBtn")
const cpy_link = document.querySelector(".copy_link")



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
    const response =await fetch(restapiurl+"name/"+country_name+"?fullText=True&fields=flags,name,latlng,demonym,population,area,")
    document.querySelector(".country-data").classList.remove("loading")
    

    if(response.ok){
        console.log("Request to "+response.url+" was successful")
        
        const data = await response.json();
        let flagdata = data[0].flags
        let nameData = data[0].name;
        let latlongData = data[0].latlng;
        
        let denonymData = data[0].demonym;
        let areadata = data[0].area;
        let populationData = data[0].population;
        cpy_link.style.display="";
        cpy_link.textContent="Copy Link"
        cpy_link.classList.remove("copied")

        cpy_link.onclick=()=>{
            navigator.clipboard.writeText(window.location.href+"?"+"country_name="+nameData).then(()=>{
                cpy_link.classList.add("copied")
                cpy_link.textContent="Link Copied !"

            })
        }

        c_flag.querySelector(".title").innerHTML=`<span class="sthr_text" style="background-image:url(${flagdata.png})">${nameData}'s</span> FLAG`
       c_flag.querySelector("img").src=flagdata.png
        
       c_flag.querySelector("img").alt=flagdata.alt;
        let icon_link=document.querySelector('link[rel="shortcut icon"]')
        icon_link.href=flagdata.png;


       c_map.querySelector(".title").innerHTML = `<span class="sthr_text" style="background-image:url(${flagdata.png})">${nameData}'s</span> MAP`
       c_map.querySelector("iframe").src=base_embededMapSrc +`${nameData}`
        c_map.querySelector(".coords").innerHTML=`Latitude: ${latlongData[0]} <br> Longitude: ${latlongData[1]}`
        c_map.querySelector(".area").textContent=areadata.toLocaleString();

        c_map.querySelector(".population").textContent=populationData.toLocaleString();
        c_map.querySelector(".demonym").textContent=denonymData;
       //c_flag.querySelector(".desc").innerHTML=flagdata.alt;
    }
    else if(response.status==404){
        alert("This Country cannot be found")
    }

}

async function getNames(){
    const response=await fetch(restapiurl+"countries?fields=name")
    const allcountrys= await response.json()
  
  
   for(let country of allcountrys){
     let name = country.name;
        let option = `<option value="${name}"></option>`
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
