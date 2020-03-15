'use strict';

function useXHR () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.randomuser.me/api');
    xhr.responseType = 'json';
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log(xhr.response);
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
    .get('https://www.randomuser.me/api')
    .then( response => console.log(response) )
    .catch( err => console.log(err) );
}

useXHR();
useAxios();