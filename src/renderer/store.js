const electron = window.require("electron");
const path = window.require("path");
const fs = window.require("fs");


export default function getConfigFile() {
    let userDataPath = (electron.app || electron.remote.app).getPath("userData");
    let filePath = path.join(userDataPath, "config.json");
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
        return {};
    }
}
