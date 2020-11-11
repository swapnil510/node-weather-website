console.log('Client side java script file is loaded')
//This is a small POC/demo purposes.
// fetch('http://puzzle.mead.io/puzzle').then( (response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form');
const searchText = document.querySelector('input')

const message1 =  document.querySelector('#message-1');
const message2 =  document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = searchText.value
    console.log('Testing the eventListener with ' + location);

    message1.textContent = 'Loading...';
    message2.textContent = '' ;
    const url = '/weather?address=' + location
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                //console.log(data.error)
                message1.textContent=data.error;
                message1.style.color= "red";
            }else{
                message1.textContent=data.location;
                message2.textContent=data.forecast.weather_descriptions;
                message1.style.color=message2.style.color;
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})