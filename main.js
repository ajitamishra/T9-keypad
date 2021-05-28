const electron =require('electron');
const url= require('url');
const path =require('path')

const {app,BrowserWindow,Menu,ipcMain}=electron;

let mainWindow;



app.on('ready',function(){
    mainWindow= new BrowserWindow({
        width: 400,
        height: 1000,
        maxWidth:400,
        maxWidth:1000,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
        },
      }); 

      mainWindow.loadURL(url.format({
          pathname:path.join(__dirname,'index.html'),
          protocol:'file',
          slashes:true
      }))


      mainWindow.on('closed',function(){
          app.quit()
      })



    
})

