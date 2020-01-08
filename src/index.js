const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow; 
const axios = require('axios'); 
const ipc = electron.ipcRenderer; 

const notifyBtn = document.getElementById('notifyBtn');
const price = document.querySelector('h1'); 
const targetPrice = document.getElementById('targetPrice'); 
let targetPriceVal;

const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}

const getBTC = () => {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {
            const cryptos = res.data.BTC.USD;
            price.innerHTML = `$${cryptos.toLocaleString('en')}`;
            if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD){
                const myNotification = new window.Notification(notification.title, notification);
            }
        })
}
getBTC();
setInterval(getBTC, 10000); 

notifyBtn.addEventListener('click', event => {
    const modalPath = path.join('file://', __dirname, 'add.html');
    /* Frame set to false gets rid of parent's menu options
       webPreferences needed because nodeIntegration set to false by default 
       and will cause require statement on line 1 to throw an error */
    let win = new BrowserWindow({ 
        frame: false, 
        transparent: true,
        alwaysOnTop: true, 
        width: 400, 
        height: 200,
        webPreferences: {
            nodeIntegration: true
        } 
    });
    win.on('close', () => {
        win = null;
    });
    win.loadURL(modalPath);
    win.show(); 
});

ipc.on('targetPriceVal', (event, arg) => {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = `$${targetPriceVal.toLocaleString('en')}`;
});