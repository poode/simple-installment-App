const { app, BrowserWindow } = require('electron');
const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV || 'development'}`)
});

async function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true
        }
    });

    await mainWindow.loadURL('http://localhost:3000');

    mainWindow.on('closed', () => {
        app.quit();
        process.exit(0);
    });
}

async function initApp() {
    try {
        require('./app');
        await createWindow();
    } catch (error) {
        console.error('Failed to start application:', error);
        app.quit();
        process.exit(0);
    }
}

app.whenReady().then(initApp);

app.on('window-all-closed', () => {
    app.quit();
    process.exit(0);
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('will-quit', () => process.exit(0))