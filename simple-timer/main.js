const {app, BrowserWindow, Tray} = require('electron')

let win = null

app.on('ready', () => {
    win = new BrowserWindow({
        width: 200,
        height: 120,
        webPreferences: {
            nodeIntegration: true
        },
        titleBarStyle: 'hiddenInset', // set the title bar style
        backgroundColor: "#111", // set the background color
        frame:false,
        alwaysOnTop:true,
        resizable: false,
        show: false
    })

    win.loadURL(`file://${__dirname}/views/index.html`)

    tray = new Tray(`${__dirname}/assets/tray_icon.png`)

    tray.on('click', () => {
        win.isVisible() ? win.hide() : win.show()
        // win.show()
    })

    tray.on('right-click', () => {
        // win = null
    })
})

app.on('closed', () => {
    win = null
})