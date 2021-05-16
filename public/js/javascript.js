console.log('Client side javaScript');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2');

//messageOne.textContent = 'From JavaScript';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;

    messageOne.textContent = 'loading ...';
    messageTwo.textContent = '';

    //console.log(location);
    fetch('http://localhost:3000/weather?address='+location).then( (response) => {
    response.json().then( (data)=> {
        if(data.error)
        {
           //console.log(data.error);
           messageOne.textContent = data.error;
        }
        else
        {
           // console.log(data.location);
            // console.log(data.forecast);
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
})