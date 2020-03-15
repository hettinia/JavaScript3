'use strict';

const xhrBtn = document.getElementById('xhrBtn');
const axiosBtn = document.getElementById('axiosBtn');
const photosList = document.getElementById('photosList');

xhrBtn.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dog.ceo/api/breeds/image/random', true);
    xhr.responseType = 'json';
    xhr.onload = () => {
        if (xhr.status == 200) {
            const img = document.createElement('img');
            const li = document.createElement('li');
            img.src = xhr.response.message;
            img.style = 'width: 200px;';
            li.appendChild(img);
            photosList.appendChild(li);

        } else {
            console.log('Not Found');
        }
    }

    xhr.onerror = () => {
        console.log('Request Error...');
    }

    xhr.send();
});

axiosBtn.addEventListener('click', () => {
    axios
    .get('https://dog.ceo/api/breeds/image/random')
    .then( response => {
        const img = document.createElement('img');
            const li = document.createElement('li');
            img.src = response.data.message;
            img.style = 'width: 200px;';
            li.appendChild(img);
            photosList.appendChild(li);
        
    })
    .catch( err => console.log(err) );
});