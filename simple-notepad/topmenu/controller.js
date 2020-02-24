const { dialog, ipcMain } = require("electron");
const fs = require("fs");

var currentPath = null

// 새로 만들기
const refreshText = () => {
    currentPath = null
    win.webContents.send('refresh', null)
}

// 저장
const saveText = () => {
    if(!currentPath) {
        saveAsText()
    }
    else{
        // 본문 데이터 요청
        win.webContents.send("reqFileData", null);

        // 데이터 수신
        ipcMain.on("sendContents", (event, contents) => {
            // 저장
            fs.writeFile(currentPath, contents, err => {
                if (err) {
                    win.webContents.send('alert', `파일 저장에 실패했습니다 : ${err.message}`)
                    return;
                }                
            });
        });
    }
}

// 다른 이름으로 저장
const saveAsText = () => {

    // 파일 저장
    const saveFile = (filePath) => {

        // 본문 데이터 요청
        win.webContents.send("reqFileData", null);

        // 데이터 수신
        ipcMain.on("sendContents", (event, contents) => {
            // 저장
            fs.writeFile(filePath, contents, err => {                
                if (err) {
                    win.webContents.send('alert', `파일 저장에 실패했습니다 : ${err.message}`)
                    return;
                }
                currentPath = filePath
            });
        });
    };

    // 파일 탐색기 오픈
    dialog.showSaveDialog().then(file => {
        if (file.canceled) return;
        // 파일 저장 실행
        saveFile(file.filePath);
        
    });
};

// 열기
const openText = () => {

    // 파일 읽기
    const readFile = (filepath) => {

        // 읽기
        fs.readFile(filepath, "utf-8", (err, data) => {
            if (err) {
                win.webContents.send('alert', `파일 읽기에 실패했습니다 : ${err.message}`)
                return;
            }
            currentPath = filepath
            
            // 본문에 데이터 송신
            win.webContents.send("fileData", data);
        });

    };

    dialog.showOpenDialog().then((files) => {        
        if (files.canceled) return;
        // 파일 읽기 실행
        readFile(files.filePaths[0]);        
    });
};

// module export
module.exports = {
    refreshText,
    saveText,
    saveAsText,
    openText
};