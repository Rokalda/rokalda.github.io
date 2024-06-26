const colors=["#B197FC","#89ed07","#26b0ff","#ffd105"]

if(navigator.maxTouchPoints>0){
   document.ontouchmove=addStar;
}
else{
   document.onpointermove=addStar;
}


function addStar(ev){
   let x_pos;
   let y_pos;
   if(ev.type=="touchmove"){
      x_pos= ev.touches[0].clientX
      y_pos=ev.touches[0].clientY
   }
   else{
     x_pos=ev.clientX;
      y_pos=ev.clientY;
   }
   let index=Math.floor(Math.random()*colors.length);

   let star = document.createElement("div");

   star.ontransitionend=()=>{
     
      document.body.removeChild(star)
   }

   star.className="star"
    star.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="white" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>`

    star.style.left=`${x_pos}px`;
    star.style.top=`${y_pos}px`;
    
   star.querySelector("path").setAttribute("fill",colors[index])

    document.body.appendChild(star)
    
    setTimeout(()=>{
     star.className+=" fade"
    },300)
}


