const { app, BrowserWindow } = require('electron');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const runMigrations = require('./config/migrate');  // Import the migration function

async function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadURL('http://localhost:3000');  // Load the Express app

    mainWindow.on('closed', () => {
        app.quit();
    });
}

async function initApp() {
    try {
        // Run migrations first
        await runMigrations();
        console.log('Migrations complete.');

        // Start the Express server
        require('./app')

        // Create the Electron window after migrations are done
        setTimeout(() => {
            createWindow();
        }, 1000)

    } catch (error) {
        console.error('Failed to start application:', error);
        app.quit();  // Exit if migrations or server startup fails
    }
}

// Ensure the server starts before loading the Electron window
app.on('ready', initApp);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
