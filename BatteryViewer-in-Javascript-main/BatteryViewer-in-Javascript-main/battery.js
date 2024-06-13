if("getBattery" in navigator){
    const batt_percentEl=document.querySelector(".battery_percentage");
    const batt_powerEl=document.querySelector(".battery_power");
    const batt_baseEl=document.querySelector(".battery_base");
    const platformEl =document.getElementById("platform")

    const percent_color_ranges=new Map()
    percent_color_ranges.set([0,20],"--low")
    percent_color_ranges.set([20,50],"--medium")
    percent_color_ranges.set([50,70],"--average")
    percent_color_ranges.set([70,100],"--high")

    navigator.getBattery().then((batt_manager)=>{

        
        batt_manager.onlevelchange=updateBatteryUI;
        batt_manager.onchargingchange=updateBatteryonCharge;
        updateBatteryUI()
        updateBatteryonCharge()
        function updateBatteryUI(){
            let percent_left=batt_manager.level * 100;
            
            for(let key of percent_color_ranges.keys()){
                if(percent_left <=key[1] && percent_left >=key[0]){
                    batt_powerEl.style.backgroundColor= `var(${percent_color_ranges.get(key)})`
                    
                }
            }

            batt_percentEl.textContent=percent_left +"%"
            batt_powerEl.style.width=percent_left+"%"
    
        }
        function updateBatteryonCharge(){
            let ischarging = batt_manager.charging;
            batt_baseEl.classList.toggle("charging",ischarging)
            platformEl.parentElement.hidden=!ischarging;
            platformEl.textContent=navigator.userAgentData.platform
        }

    })
  
}