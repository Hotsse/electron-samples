let {ipcMain} = require('electron')
let fs = require('fs')
let filename = 'options'

// load user options
const loadUserOptions = () => {

    if(fs.existsSync(filename)){
        let data = fs.readFileSync(filename, 'utf8').split('\n')

        data.forEach((data, index) => {
            let [key, value] = data.split('=')
            if(key == 'theme'){
                settings.theme = value
                win.webContents.send('setTheme', value)
            }
            else{
                settings[key]=value
            }
        })
    }
    else{        
        win.webContents.send('selectTheme', null)
        fs.writeFile(filename, '', (err) => {
            if(err) throw err;
        })
    }
}

ipcMain.on('loadUserOptions', () => {
    loadUserOptions()
})

// save user options
const saveUserOptions = () => {
    let data = ''
    for(key in settings){
        data += `${key}=${settings[key]}\n`
    }
    fs.writeFile(filename, data, (err) => {
        if(err) throw err;
    })
}

ipcMain.on('saveUserOptions', () => {
    saveUserOptions()
})

// set theme
ipcMain.on('setTheme', (event, data) => {
    settings.theme = data
    event.reply('setTheme', data)

    saveUserOptions()
})

