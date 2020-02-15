const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain} = require('electron')

let win

function createWindow(){
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            nodeIntegration: true
        }
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.webContents.openDevTools()
}

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg)

    event.sender.send('asynchronous-reply', 'async pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg)

    event.returnValue = 'sync pong'
})

app.on('ready', createWindow)

app.on('closed', ()=>{
    win = null
})