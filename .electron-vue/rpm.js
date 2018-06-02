const spawnSync = require("child_process").spawnSync;

function getVersion() {
    return spawnSync("monova")
        .stdout.toString()
        .replace("\n", "");
}

module.exports = {
    src: "build/maildam-linux-x64",
    dest: "build/installers/",
    arch: "x86_64",
    icon: "build/icons/maildam.png",
    homepage: "https://github.com/jsnjack/maildam",
    version: getVersion()
};
