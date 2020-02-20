const {app, BrowserWindow, Menu, ipcMain} = require('electron')

global.win = null

global.settings = {}
settings.theme = 'default'
settings.param1 = 'value1'

var createWindow = () => {

    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadURL(`file://${__dirname}/views/index.html`)

    // win.webContents.openDevTools()

    option = require('./option/option.js')
}

app.on('ready', createWindow)

app.on('closed', () => {
    win = null
})

// menu
const topmenuTemplate = require('./topmenu/template.js')
const topmenu = Menu.buildFromTemplate(topmenuTemplate)
Menu.setApplicationMenu(topmenu)
