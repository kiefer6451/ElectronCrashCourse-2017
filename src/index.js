const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow; 

const notifyBtn = document.getElementById('notifyBtn');

notifyBtn.addEventListener('click', event => {
    const modalPath = path.join('file://', __dirname, 'add.html');
    // Frame set to false gets rid of parent's menu options
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