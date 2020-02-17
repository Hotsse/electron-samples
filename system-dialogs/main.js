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
            nodeIntegration:true
        }
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.webContents.openDevTools()
}


ipcMain.on('openFile', (event, path) => {
    const {dialog} = require('electron')
    const fs = require('fs')

    dialog.showOpenDialog().then((files)=>{
        if(files.canceled){
            console.log('No file selected')
        }
        else {
            readFile(files.filePaths[0])
        }

    })

    function readFile(filepath) {
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if(err){
                alert('An error occurred reading the file : ' + err.message)
                return
            }

            event.sender.send('fileData', data)
        })
    }
})

app.on('ready', createWindow)

app.on('closed', ()=>{
    win = null
})