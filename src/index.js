import _ from 'lodash';
import './style.css';

function beep() {
    const body = document.querySelector('body') 
    body.innerText = 'Hi';
    console.log('hi')
}
beep();


