import {app, BrowserWindow} from "electron";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
    global.__static = require("path").join(__dirname, "/static").replace(/\\/g, "\\\\");
}

let mainWindow;
const winURL = process.env.NODE_ENV === "development"
    ? "http://localhost:9080"
    : `file://${__dirname}/index.html`;

const argv = require("minimist")(process.argv);

if (argv.profile) {
    app.setPath("userData", `${app.getPath("userData")}-${argv.profile}`);
}

if (argv.name) {
    app.setName(argv.name);
}

function createWindow() {
    /**
   * Initial window options
   */
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
    });

    mainWindow.loadURL(winURL);

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
