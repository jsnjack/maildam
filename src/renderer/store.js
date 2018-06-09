const electron = window.require("electron");
const path = window.require("path");
const fs = window.require("fs");

const colorPalette = [
    "#fce94f",
    "#fcaf3e",
    "#73d216",
    "#3465a4",
    "#ad7fa8",
    "#cc0000",
];


export default function getConfigFile() {
    let userDataPath = (electron.app || electron.remote.app).getPath("userData");
    let filePath = path.join(userDataPath, "config.json");
    try {
        let config = JSON.parse(fs.readFileSync(filePath));
        for (let i=0; i<config.length; i++) {
            config[i].id = i;
            config[i].color = colorPalette[i];
        }
        config.push({
            name: "All",
            id: config.length,
            isActive: false,
            color: "white",
        });
        return config;
    } catch (error) {
        return [];
    }
}
