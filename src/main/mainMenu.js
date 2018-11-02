import { app, Menu } from 'electron'
// import { currentContent } from './preview-server.js';
// import fs from 'fs-extra';
const {dialog} = require('electron')

export default function mainMenu (mainWindow) {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'Ctrl+n',
          click: () => { mainWindow.webContents.send('newBook') }
        },
        {
          label: 'Save',
          accelerator: 'Ctrl+s',
          click: () => {
            dialog.showSaveDialog({defaultPath: '/home/akhil/NewBook'}, (location) => {
              mainWindow.webContents.send('saveBook', location)
            })
          }
        },
        {
          label: 'Quit',
          accelerator: 'Ctrl+q',
          click: () => { app.quit() }
        }
      ]
    }]

  const mainMenu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(mainMenu)
};
