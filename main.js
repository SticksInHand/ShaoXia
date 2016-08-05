const {app} = require('electron');
const {BrowserWindow} = require('electron');
const {ipcMain} = require('electron');

app.on('ready',()=>{
    var mainWindow = new BrowserWindow({
        // frame:false,
        width:800,
        height:622,
        resizable: false
    });

    mainWindow.loadURL(`file://`+__dirname+`/app/index.html`);

    // mainWindow.webContents.openDevTools();

    ipcMain.on('synchronous-message', (event, arg) => {
        if(arg == 'openChildWindow'){
            let win = new BrowserWindow({
                width:600,
                height:300,
                frame:false
            });
            win.loadURL(`file://`+__dirname+`/app/demo.html`);
            win.on('ready-to-show',function(){
                win.show();
                event.returnValue = 'pong'
            });
        }
        // console.log(arg);  // prints "ping"
        // event.returnValue = 'pong'
    });
    ipcMain.on('sendMessageToIndex',(event,arg) => {
        console.log('xxxx');
        mainWindow.webContents.send('getMessage',arg);
    })


});