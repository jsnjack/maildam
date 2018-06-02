const electron = window.require("electron");
const path = window.require("path");
const fs = window.require("fs");


export default function getConfigFile() {
    let userDataPath = (electron.app || electron.remote.app).getPath("userData");
    let filePath = path.join(userDataPath, "config.json");
    try {
        let config = JSON.parse(fs.readFileSync(filePath));
        for (let i=0; i<config.length; i++) {
            config[i].id = i;
        }
        config.push({
            name: "All",
            id: config.length,
            isActive: false,
        });
        return config;
    } catch (error) {
        return [];
    }
}
