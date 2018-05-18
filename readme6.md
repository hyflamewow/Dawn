# Dawn
2018/05/18
## 目標
使用Electron

## 安裝Electron
```
Moon>npm i electron@2.0.1 --save-dev
```
## 修改 Moon
修改angular.json
```
"outputPath": "dist",
```
新增main.js
```js
const { app, BrowserWindow } = require('electron')

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/dist/assets/logo.png`
    })


    win.loadURL(`file://${__dirname}/dist/index.html`)

    // uncomment below to open the DevTools.
    // win.webContents.openDevTools()

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})
```
修改package.json
```json
"name": "moon",
"version": "0.0.0",
"main": "main.js",
"scripts": {
"ng": "ng",
"start": "ng serve --proxy-config proxy.conf.json",
"build": "ng build --prod",
"test": "ng test",
"lint": "ng lint",
"e2e": "ng e2e",
"electron": "ng build --prod && electron ."
```
## 測試
```
Sun>dotnet run
Moon>npm run electron
```
## 佈署
安裝electron-packager
```
Moon>npm i electron-packager -g
```
打包
```
Moon>electron-packager . --platform=win32
```
執行
```
Sun>dotnet run
>Moon\moon-win32-x64\moon.exe
```
## 版控
修改Moon\.gitignore
```
# electron
moon-win32-x64/
```