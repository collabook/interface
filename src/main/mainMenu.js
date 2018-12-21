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
            mainWindow.webContents.send('newBook')
          }
        },
        {
          label: 'Open',
          accelerator: 'Ctrl+o',
          click: () => { mainWindow.webContents.send('openBook') }
        },
        {
          label: 'Save Book',
          accelerator: 'Ctrl+s',
          click: () => { mainWindow.webContents.send('saveBook') }
        },
        {
          label: 'Quit',
          accelerator: 'Ctrl+q',
          click: () => { app.quit() }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Editor',
          click: () => {
            mainWindow.webContents.send('editorView')
          }
        },
        {
          label: 'Corkboard',
          click: () => {
            mainWindow.webContents.send('corkboardView')
          }
        },
        {
          label: 'Diff',
          click: () => {
            console.log('diff')
          }
        },
        {
          label: 'Toggle Dev Tools',
          accelerator: 'F12',
          role: 'toggledevtools'
        }
      ]
    },
    {
      label: 'VCS',
      submenu: [
        {
          label: 'Init',
          click: () => {
            mainWindow.webContents.send('gitInit')
          }
        },
        {
          label: 'Stage Changes',
          click: () => {
            mainWindow.webContents.send('gitTrack')
          }
        },
        {
          label: 'Commit',
          click: () => {
            mainWindow.webContents.send('gitCommit')
          }
        },
        {
          label: 'Log',
          click: () => {
            mainWindow.webContents.send('gitLog')
          }
        },
        {
          label: 'Create Branch',
          click: () => {
            console.log('branch')
          }
        },
        {
          label: 'Add remote',
          click: () => {
            mainWindow.webContents.send('gitAddRemote')
          }
        },
        {
          label: 'Push',
          click: () => {
            console.log('push')
          }
        },
        {
          label: 'Pull',
          click: () => {
            console.log('pull')
          }
        }
      ]
    },
    {
      label: 'Options',
      submenu: [
        {
          label: 'User',
          click: () => {
            mainWindow.webContents.send('userSettings')
          }
        }
      ]
    }
  ]

  const mainMenu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(mainMenu)
};
