const { dialog, ipcMain } = require("electron");
const fs = require("fs");

var currentPath = null

const refreshText = () => {
    currentPath = null
    win.webContents.send('refresh', null)
}

const saveText = () => {
    if(!currentPath) {
        saveAsText()
    }
    else{
        win.webContents.send("reqFileData", null);

        ipcMain.on("sendContents", (event, contents) => {            
            fs.writeFile(currentPath, contents, err => {
                if (err) {
                    win.webContents.send('alert', `파일 저장에 실패했습니다 : ${err.message}`)
                    return;
                }                
            });
        });
    }
}

const saveAsText = () => {

    const saveFile = filePath => {
        
        win.webContents.send("reqFileData", null);

        ipcMain.on("sendContents", (event, contents) => {
            
            fs.writeFile(filePath, contents, err => {

                if (err) {
                    win.webContents.send('alert', `파일 저장에 실패했습니다 : ${err.message}`)
                    return;
                }

                currentPath = filePath
            });
        });
    };

    dialog.showSaveDialog().then(file => {
        if (file.canceled) return;

        console.log(file);
        saveFile(file.filePath);
        
    });
};

const openText = () => {

    const readFile = (filepath) => {

        fs.readFile(filepath, "utf-8", (err, data) => {
            if (err) {
                win.webContents.send('alert', `파일 읽기에 실패했습니다 : ${err.message}`)
                return;
            }

            currentPath = filepath
            win.webContents.send("fileData", data);
        });

    };

    dialog.showOpenDialog().then((files) => {
        
        if (files.canceled) return;
                
        readFile(files.filePaths[0]);        
    });
};

module.exports = {
    refreshText,
    saveText,
    saveAsText,
    openText
};