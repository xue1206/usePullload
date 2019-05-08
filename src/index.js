import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// function createPromise(count) {
//     console.log('in: ', count);
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             count === 0 ? res(count) : rej(count)
//         }, 2000)   
//     })
// }

// async function tryTillSuc() {
//     while(true) {
//         try {
//             const result = await createPromise();
//             return result;
//         } catch(err) {

//         }
//     }
//     return 'timeout';
// }

// function tryTillSucP() {
//     let count = 3;
//     function _try() {
//         return createPromise(count).then(d => {
//             count --;
//             return count === 0 ? count : _try();
//         }, e=>{
//             return _try();
//         })
//     }
//     return _try();
// }

// tryTillSuc().then(s => {
//     console.log(s);
// }, e => {
//     console.log(e);
// });

// async function delay(millseconds) {
//     return await new Promise((res) => {
//         setTimeout(res, millseconds);
//     })
// }
// delay(6000).then(d=>{console.log('delay',d)})

console.log('root',ReactDOM.render(<App />, document.getElementById('root')));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
