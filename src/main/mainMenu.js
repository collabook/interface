import { app, Menu } from 'electron'
// import { currentContent } from './preview-server.js';
// import fs from 'fs-extra';
// const {dialog} = require('electron')

export default function mainMenu (mainWindow) {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: 'Ctrl+n',
          click: () => {
            // ask for location
            // ask for template
            mainWindow.webContents.send('newBook')
          }
        },
        {
          label: 'Open',
          accelerator: 'Ctrl-o',
          // show dialog to select location of book
          click: () => { mainWindow.webContents.send('openBook') }
        },
        {
          label: 'Save',
          accelerator: 'Ctrl+s',
          click: () => { mainWindow.webContents.send('save') }
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
