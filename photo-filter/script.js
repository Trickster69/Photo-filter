const controllers = document.querySelectorAll('.filters label'),
    img = document.querySelector('.editor img'),
    result = document.querySelectorAll('output'),
    resetBtn = document.querySelector('.btn-reset'),
    saveBtn = document.querySelector('.btn-save'),    
    rages = document.querySelectorAll('.filters input'),
    nextPicBtn = document.querySelector('.btn-next'),
    openPicBtn = document.querySelector('.btn-load--input'),
    loadPicBtn = document.querySelector('.btn-load'),
    allBtn = document.querySelectorAll('.btn'),
    fullScreenBtn = document.querySelector('.fullscreen '),
    canvas = document.querySelector('canvas');
let b = 1;   

const imgC = new Image();
const ctx = canvas.getContext('2d');
imgC.setAttribute('crossOrigin', 'anonymous'); 
imgC.src = img.src;

imgC.onload = function() {
    // img.remove();
    canvas.height = imgC.naturalHeight;
    canvas.width = imgC.naturalWidth;
    ctx.drawImage(imgC, 0, 0);
  };

function setActiveBtn(e){
    allBtn.forEach(key=>{
        key.classList.remove('btn-active')
    });
    e.currentTarget.classList.add('btn-active');
}

  
function change(e){
    let arrChanges = [];
    controllers.forEach(key => {
        let name = key.querySelector('input').name;
        let value = key.querySelector('input').value;
        let size = key.querySelector('input').dataset.sizing;
        key.querySelector('output').value = value;
        
        arrChanges.push(`${name}(${value}${size})`);
        ctx.filter = arrChanges.join('');
        ctx.drawImage(imgC, 0, 0);
    });
    
}

function reset(e){
    let arrReset = [];    

    controllers.forEach(key => {
        if(key.querySelector('input').name == 'saturate'){            
            key.querySelector('input').value = 100;
            key.querySelector('output').value = 100;
            
            arrReset.push(`${key.querySelector('input').name}(${key.querySelector('input').value}${key.querySelector('input').dataset.sizing})`);  
            ctx.filter = arrReset.join('');          
            ctx.drawImage(imgC, 0, 0);
        }else{
            key.querySelector('input').value = 0;
            key.querySelector('output').value = 0;

            arrReset.push(`${key.querySelector('input').name}(${key.querySelector('input').value}${key.querySelector('input').dataset.sizing})`);            
            ctx.filter = arrReset.join('');
            ctx.drawImage(imgC, 0, 0);
        }
    });
    setActiveBtn(event);
}


controllers.forEach(key => key.addEventListener('input', ()=>{
    change(event);
}));
resetBtn.addEventListener('click', ()=>{
    reset(event);
    setActiveBtn(event);
});
saveBtn.addEventListener('click', ()=>{
    setActiveBtn(event);  
    var link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();      
});



nextPicBtn.addEventListener('click', ()=>{
    setActiveBtn(event);
    let now = new Date();
    let timeDay = '';
    let hours = now.getHours();
    let minutes = now.getMinutes();
    console.log(hours);
    
    if((hours >= 6 && minutes >=0)&& (hours <=11 && minutes <= 59)){
        timeDay = 'morning';
    }else if((hours >= 12 && minutes >=0)&& (hours <=17 && minutes <= 59)){
        timeDay = 'day';
    }else if((hours >= 18 && minutes >=0)&& (hours <=23 && minutes <= 59)){
        timeDay = 'evening';
    }else if((hours >= 0 && minutes >=0)&& (hours <=5 && minutes <= 59)){
        timeDay = 'night';
    }
    console.log(timeDay);
    imgC.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeDay}/${b <= 9?`0${b}`:b}.jpg`;
    console.log(b);
    if(b>19){
        b=1;
    }else{
        b++;
    }
    
})

openPicBtn.addEventListener('change', (e)=> {
    
    const file = openPicBtn.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        imgC.src = reader.result;
        imgC.src.innerHTML = '';
        imgC.src.append(img);

    };
    reader.readAsDataURL(file);
});
loadPicBtn.addEventListener('click', ()=>{
    setActiveBtn(event);
})

fullScreenBtn.addEventListener('click',()=>{
    
})

