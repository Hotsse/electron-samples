const {app, BrowserWindow, Tray} = require('electron')

let win = null
let tray = null

app.on('ready', () => {
    win = new BrowserWindow({
        width: 500,
        height: 450,
        webPreferences:{
            nodeIntegration: true,
            webviewTag: true
        },
        titleBarStyle: 'hiddenInset', // set the title bar style
        frame: false,
        alwaysOnTop: true
    })

    win.loadURL(`file://${__dirname}/views/index.html`)

    tray = new Tray(`${__dirname}/assets/tray_icon.png`)

    tray.on('click', () => {
        win.isVisible() ? win.hide() : win.show()
    })
})

app.on('closed', () => {
    win = null
})