const {app, BrowserWindow, Tray} = require('electron')

let win = null
let tray = null

app.on('ready', () => {

    // window
    win = new BrowserWindow({
        width: 200,
        height: 120,
        webPreferences: {
            nodeIntegration: true
        },
        titleBarStyle: 'hiddenInset',
        backgroundColor: "#111",
        frame:false,
        alwaysOnTop:true,
        resizable: false,
        show: false
    })

    win.loadURL(`file://${__dirname}/views/index.html`)

    // tray
    tray = new Tray(`${__dirname}/assets/tray_icon.png`)
    tray.on('click', () => {
        win.isVisible() ? win.hide() : win.show()
    })
    /*
    tray.on('right-click', () => {
        tray = null
        win = null
    })
    */
})

app.on('closed', () => {
    win = null
    tray = null
})