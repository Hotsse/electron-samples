const {app, BrowserWindow, Tray} = require('electron')
const path = require('path')
const url = require('url')

let win = null
let tray = null

app.on('ready', () => {
  
  win = new BrowserWindow({    
    width: 400,    
    height: 300,
    webPreferences:{
      nodeIntegration: true
    },
    titleBarStyle: 'hiddenInset', // set the title bar style
    backgroundColor: "#111", // set the background color
    frame:false,
    alwaysOnTop:true,
    show: false
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'views', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  tray = new Tray(`${__dirname}/assets/tray_icon2.jpg`)

  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
})

app.on('closed', () => {
  win = null
})