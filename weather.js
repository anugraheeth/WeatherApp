const key = '48f1c382988d63fd93230b9f5795216b';


async function search() {
    const phrase = document.querySelector('input').value;
     const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${phrase}&limit=3&appid=${key}`);
     const data = await response.json();    
     const ul = document.querySelector('form ul');
     ul.innerHTML = '';
     for( let i = 0; i < data.length;i++){
        const {name,lat,lon,country} = data[i];
        ul.innerHTML += `<li data-lat=${lat} data-lon=${lon} data-name=${name}>
            ${name}
            <span>${country}</span>
            </li>`;
     }
}


const debouncesearch = _.debounce( () =>{
    document.getElementById('list').style.display='block';
    search();
},600);


async function weat(lat,lon,name){
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
    const resp = await result.json();
    const temp = Math.round(resp.main.temp);
    const feelslike = Math.round(resp.main.feels_like);
    const humd = Math.round(resp.main.humidity);
    const windspeed =  Math.round(resp.wind.speed);
    const iconw = resp.weather[0].icon
        
    document.getElementById('city').innerHTML = name;
    document.getElementById('degree').innerHTML = temp +'&#8451;';
    document.getElementById('1').innerHTML=windspeed + '<span>km/h</span>';
    document.getElementById('2').innerHTML=feelslike + '<span>&#8451;</span>';
    document.getElementById('3').innerHTML=humd + '<span>%</span>';
    document.getElementById('wicon').src=`https://openweathermap.org/img/wn/${iconw}@4x.png`;
    document.getElementById('list').style.display='none';
    document.getElementById('land').style.display='none';
    document.getElementById('weather').style.display='block';
    console.log(resp);
}

document.querySelector('input').addEventListener('keyup',debouncesearch);
document.addEventListener('click',ev => {
    const li = ev.target;
    const {lat,lon,name} = li.dataset;
    if(!lat){
        return;
    }
    weat(lat,lon,name);
    document.querySelector('input').value='';
});
