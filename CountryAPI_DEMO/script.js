const base_embededMapSrc=`https://maps.google.com/maps?&hl=${navigator.language}&z=8&output=embed&q=`

const restapiurl="https://restcountries.com/v3.1/"


const  country_form = document.getElementById("country_form")
const name_input=document.getElementById("country-names-input")
const name_datalist = document.getElementById("country-names")
const c_flag = document.querySelector(".country-flag")
const c_map = document.querySelector(".country-map")
const searchBtn = document.getElementById("searchBtn")

country_form.onsubmit=(e)=>{
    e.preventDefault();
    getCountryData()
}


getNames()


async function getCountryData(){
    document.querySelector(".country-data").classList.add("loading")
    const response =await fetch(restapiurl+"name/"+name_input.value+"?fields=flags,latlng")
    document.querySelector(".country-data").classList.remove("loading")

    if(response.ok){
        const data = await response.json();
        let flagdata = data[0].flags
        let latilong=data[0].latlng
    
        console.log(latilong)
    
    
        c_flag.querySelector(".title").textContent=`${name_input.value}'s FLAG`
       c_flag.querySelector("img").src=flagdata.png
    
       c_map.querySelector(".title").textContent = `${name_input.value}'s MAP`
       c_map.querySelector("iframe").src=base_embededMapSrc +`${latilong[0]},${latilong[1]}`
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