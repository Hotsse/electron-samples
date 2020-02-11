const {app, BrowserWindow} = require('electron')

let win

var createWindow = ()=>{
    win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true
        }
    })

    win.loadURL(`file://${__dirname}/index.html`)
}

app.on('ready', createWindow)

app.on('closed', ()=>{
    win = null
})