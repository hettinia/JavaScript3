'use strict';

function useXHR () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://xkcd.now.sh/?comic=614');
    xhr.responseType = 'json';
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log(xhr.response);
            const img = document.createElement('img');
            img.src = JSON.parse(xhr.response).img;
            document.body.appendChild(img);

        } else {
            console.log('Not Found');
        }
    }

    xhr.onerror = () => {
        console.log('Request Error...');
    }

    xhr.send();

    
}

function useAxios () {
    //const axios = require('axios');
    axios
    .get('https://xkcd.now.sh/?comic=614')
    .then( response => {
        console.log(response.data);
        const img = document.createElement('img');
        img.src = response.data.img;
        document.body.appendChild(img);
    })
    .catch( err => console.log(err) );
}

useXHR();
useAxios();