const controllers = document.querySelectorAll('.filters label'),
    img = document.querySelector('.editor img'),
    result = document.querySelectorAll('output'),
    resetBtn = document.querySelector('.btn-reset'),
    rages = document.querySelectorAll('.filters input');

function change(e){
    controllers.forEach(key => {
        let name = key.querySelector('input').name;
        let value = key.querySelector('input').value;
        let size = key.querySelector('input').dataset.sizing;
        img.style.setProperty(`--${name}`, `${value}` + size);
        key.querySelector("output").value = value;
    });
}

function reset(e){
    controllers.forEach(key => {
        if(key.querySelector('input').name == "saturate"){
            key.querySelector('input').value = 100;
            key.querySelector('output').value = 100;
            img.style.setProperty(`--${key.querySelector('input').name}`, `${100}` + '%');
        }else{
            img.style.setProperty(`--${key.querySelector('input').name}`, `${key.querySelector('input').value}` + key.querySelector('input').sizing);
            key.querySelector('input').value = 0;
            key.querySelector('output').value = 0;
        }
    });
    
}
controllers.forEach(key => key.addEventListener("change", ()=>{
    change(event);
}));
controllers.forEach(key => key.addEventListener("mousemove", ()=>{
    change(event);
}));

resetBtn.addEventListener('click', reset);
